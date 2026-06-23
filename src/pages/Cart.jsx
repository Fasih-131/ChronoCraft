import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tighter uppercase">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't added any luxury timepieces to your collection yet.</p>
        <Link to="/" className="bg-neonCyan text-black font-bold uppercase tracking-widest px-8 py-3 rounded hover:bg-white transition-colors">
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tighter uppercase border-b border-gray-800 pb-4">
        Shopping <span className="text-neonCyan">Cart</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.map(item => (
            <div key={item.id} className="bg-glassBg backdrop-blur-md border border-gray-800 rounded-xl p-4 flex gap-4 items-center">
              <div className="w-24 h-24 bg-black rounded flex items-center justify-center overflow-hidden shrink-0">
                <img src={item.image_url} alt={item.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex-1">
                <span className="text-neonCyan text-xs font-bold uppercase tracking-widest block">{item.brand}</span>
                <Link to={`/product/${item.id}`} className="text-lg font-bold text-white hover:underline">{item.name}</Link>
                <div className="text-gray-400 font-mono mt-1">${Number(item.price).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-black border border-gray-700 rounded overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-800">-</button>
                  <span className="px-3 py-1 text-white font-mono">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-800">+</button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-400 font-bold text-xs uppercase tracking-widest"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-glassBg backdrop-blur-md border border-gray-800 rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-b border-gray-800 pb-4">Order Summary</h2>
            <div className="flex justify-between mb-4 text-gray-400">
              <span>Subtotal</span>
              <span className="text-white">${getCartTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-400">
              <span>Shipping</span>
              <span className="text-green-400">Complimentary</span>
            </div>
            <div className="flex justify-between font-bold text-xl mt-6 pt-6 border-t border-gray-800">
              <span>Total</span>
              <span className="text-neonCyan">${getCartTotal().toLocaleString()}</span>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-neonCyan text-black font-extrabold uppercase tracking-widest py-4 rounded mt-8 hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,243,255,0.2)]"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
