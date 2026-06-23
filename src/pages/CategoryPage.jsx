import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCart } from '../context/CartContext';

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    // capitalize first letter to match DB ('Men', 'Women', 'Kids')
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', categoryName);
      
    if (data) setProducts(data);
    if (error) console.error("Error fetching products:", error);
    setLoading(false);
  };

  if (loading) {
    return <div className="p-8 text-neonCyan text-center animate-pulse tracking-widest uppercase">Loading Category...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tighter uppercase border-b border-gray-800 pb-4">
        {category} <span className="text-neonCyan">Watches</span>
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500 italic">No products found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-glassBg backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden flex flex-col hover:border-neonCyan/50 transition-colors group">
              <Link to={`/product/${product.id}`} className="block relative h-64 bg-black flex items-center justify-center p-4">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-neonCyan text-xs font-bold tracking-widest uppercase mb-1">{product.brand}</span>
                <Link to={`/product/${product.id}`} className="text-lg font-bold text-white mb-2 hover:underline">
                  {product.name}
                </Link>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800/50">
                  <span className="text-xl font-bold text-white">${Number(product.price).toLocaleString()}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-white text-black font-bold text-xs uppercase px-4 py-2 rounded hover:bg-neonCyan transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
