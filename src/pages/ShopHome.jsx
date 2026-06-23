import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCart } from '../context/CartContext';

export default function ShopHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (data) setProducts(data);
    if (error) console.error("Error fetching products:", error);
    setLoading(false);
  };

  if (loading) {
    return <div className="p-8 text-neonCyan text-center animate-pulse tracking-widest uppercase">Loading Inventory...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden mb-12 bg-black/50 border border-gray-800 p-12 text-center shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neonCyan/10 to-transparent pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter uppercase">
          Master Time with <span className="text-neonCyan">ChronoCraft</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
          Discover our curated collection of luxury Swiss timepieces. Uncompromising quality, precision engineering, and timeless design.
        </p>
        <Link to="/custom" className="inline-block bg-transparent border border-neonCyan text-neonCyan font-bold uppercase tracking-widest px-8 py-3 rounded hover:bg-neonCyan hover:text-black transition-colors">
          Open Custom Builder
        </Link>
      </div>

      {/* Featured Products */}
      <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-gray-800 pb-2">Featured Collection</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-glassBg backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden flex flex-col hover:border-neonCyan/50 transition-colors group">
            <Link to={`/product/${product.id}`} className="block relative h-64 bg-black flex items-center justify-center p-4">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur text-xs font-bold px-2 py-1 rounded text-gray-300 uppercase">
                {product.category}
              </div>
            </Link>
            <div className="p-5 flex flex-col flex-1">
              <span className="text-neonCyan text-xs font-bold tracking-widest uppercase mb-1">{product.brand}</span>
              <Link to={`/product/${product.id}`} className="text-lg font-bold text-white mb-2 hover:underline">
                {product.name}
              </Link>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-white">${Number(product.price).toLocaleString()}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-white text-black font-bold text-xs uppercase px-4 py-2 rounded hover:bg-neonCyan transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
