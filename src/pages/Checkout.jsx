import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { supabase } from '../supabaseClient';

export default function Checkout() {
  const { user } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    country: '',
    zip: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!cart || cart.length === 0) {
    return <Navigate to="/cart" />;
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const orderData = {
      user_id: user.id,
      config: cart, // Store the array of cart items in the JSONB config column
      shipping_details: shipping,
      total_price: getCartTotal(),
      status: 'Pending'
    };

    const { error: dbError } = await supabase.from('orders').insert([orderData]);

    if (dbError) {
      console.error(dbError);
      setError("Failed to place order. Please try again.");
      setLoading(false);
    } else {
      clearCart();
      alert("Order placed successfully! Thank you for shopping with ChronoCraft.");
      navigate('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
      <div className="bg-glassBg backdrop-blur-md border border-gray-800 p-6 rounded-2xl shadow-2xl h-fit">
        <h2 className="text-2xl font-extrabold text-neonCyan mb-6 uppercase tracking-widest">Order Summary</h2>
        <div className="flex flex-col gap-4 text-sm mb-6 max-h-[400px] overflow-y-auto pr-2">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b border-gray-800 pb-3">
              <div className="flex flex-col">
                <span className="text-white font-bold">{item.name}</span>
                <span className="text-gray-500 text-xs uppercase tracking-widest">{item.brand} x {item.quantity}</span>
              </div>
              <span className="text-white font-mono">${(Number(item.price) * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-gray-700">
          <span className="text-neonCyan">Total:</span>
          <span className="text-white">${getCartTotal().toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-glassBg backdrop-blur-md border border-gray-800 p-6 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-extrabold text-neonCyan mb-6 uppercase tracking-widest">Secure Checkout</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleCheckout} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1 uppercase tracking-widest">Full Name</label>
            <input 
              required
              value={shipping.fullName}
              onChange={e => setShipping({...shipping, fullName: e.target.value})}
              className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-neonCyan" 
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1 uppercase tracking-widest">Address</label>
            <input 
              required
              value={shipping.address}
              onChange={e => setShipping({...shipping, address: e.target.value})}
              className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-neonCyan" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1 uppercase tracking-widest">City</label>
              <input 
                required
                value={shipping.city}
                onChange={e => setShipping({...shipping, city: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-neonCyan" 
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1 uppercase tracking-widest">Zip Code</label>
              <input 
                required
                value={shipping.zip}
                onChange={e => setShipping({...shipping, zip: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-neonCyan" 
              />
            </div>
          </div>
          
          <div className="mt-4 p-4 border border-gray-700 bg-black/30 rounded">
            <p className="text-gray-400 text-xs text-center uppercase tracking-widest mb-2">Dummy Payment Gateway Active</p>
            <input disabled value="**** **** **** 4242" className="w-full bg-black/50 border border-gray-700 rounded p-2 text-gray-500 cursor-not-allowed mb-2" />
            <div className="grid grid-cols-2 gap-2">
              <input disabled value="12/25" className="w-full bg-black/50 border border-gray-700 rounded p-2 text-gray-500 cursor-not-allowed" />
              <input disabled value="123" className="w-full bg-black/50 border border-gray-700 rounded p-2 text-gray-500 cursor-not-allowed" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-neonCyan text-black font-bold uppercase tracking-widest py-3 rounded mt-4 hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Pay $${getCartTotal().toLocaleString()} & Confirm`}
          </button>
        </form>
      </div>
    </div>
  );
}
