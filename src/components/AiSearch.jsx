import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { performSemanticSearch } from '../utils/aiSearch';

export default function AiSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  // Load all products into memory for local AI search
  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await supabase.from('products').select('*');
      if (data) setAllProducts(data);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (query.trim().length > 2) {
      const searchResults = performSemanticSearch(query, allProducts);
      setResults(searchResults.slice(0, 5)); // Top 5 results
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setResults([]);
    }
  }, [query, allProducts]);

  const handleSelect = (id) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/product/${id}`);
  };

  return (
    <div className="relative w-full max-w-sm ml-4 hidden lg:block">
      <div className="relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask AI: e.g., 'affordable diver watch'"
          className="w-full bg-black/50 border border-gray-700 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-neonCyan transition-colors"
        />
        <svg className="absolute right-3 top-2.5 w-4 h-4 text-neonCyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-glassBg backdrop-blur-xl border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50">
          {results.length > 0 ? (
            <div className="flex flex-col">
              <div className="bg-black/50 px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800">
                AI Top Matches
              </div>
              {results.map(product => (
                <button 
                  key={product.id}
                  onClick={() => handleSelect(product.id)}
                  className="flex items-center gap-3 p-3 text-left hover:bg-white/10 transition-colors border-b border-gray-800/50 last:border-0"
                >
                  <img src={product.image_url} alt={product.name} className="w-10 h-10 object-cover bg-black rounded" />
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">{product.name}</span>
                    <span className="text-neonCyan text-xs uppercase tracking-widest">{product.brand}</span>
                  </div>
                  <span className="ml-auto text-gray-400 font-mono text-xs">${Number(product.price).toLocaleString()}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-gray-400 italic">No semantic matches found.</div>
          )}
        </div>
      )}
    </div>
  );
}
