import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (data) setProduct(data);
    if (error) console.error("Error fetching product details:", error);
    setLoading(false);
  };

  if (loading) {
    return <div className="p-8 text-neonCyan text-center animate-pulse tracking-widest uppercase">Loading Product...</div>;
  }

  if (!product) {
    return <div className="p-8 text-center text-gray-500">Product not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Image Gallery (Simplified) */}
      <div className="bg-black border border-gray-800 rounded-2xl p-8 flex items-center justify-center h-[500px]">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="max-w-full max-h-full object-contain drop-shadow-2xl"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Link to={`/category/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-neonCyan text-sm font-bold uppercase tracking-widest">
            {product.category}
          </Link>
          <span className="text-gray-700">/</span>
          <span className="text-neonCyan text-sm font-bold uppercase tracking-widest">{product.brand}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tighter">{product.name}</h1>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">{product.description}</p>
        
        <div className="text-3xl font-bold text-white mb-8 border-b border-gray-800 pb-8">
          ${Number(product.price).toLocaleString()}
        </div>

        {/* Specs Table */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-gray-800/50 pb-2 text-sm">
                  <span className="text-gray-400 capitalize">{key.replace('_', ' ')}</span>
                  <span className="text-white font-medium text-right ml-4">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={() => addToCart(product)}
          className="bg-neonCyan text-black font-extrabold uppercase tracking-widest py-4 rounded hover:bg-white transition-colors mt-auto shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
