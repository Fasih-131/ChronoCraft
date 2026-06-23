import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

export default function Checkout() {
  const { state } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const config = state?.config;

  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    country: '',
    zip: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!config) {
    return <Navigate to="/" />;
  }

  const calculateTotal = () => {
    return Object.values(config).reduce((acc, item) => acc + (item?.price ? Number(item.price) : 0), 0);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const orderData = {
      user_id: user.id,
      config: config,
      shipping_details: shipping,
      total_price: calculateTotal(),
      status: 'Pending'
    };

    const { error: dbError } = await supabase.from('orders').insert([orderData]);

    if (dbError) {
      console.error(dbError);
      setError("Failed to place order. Please try again.");
      setLoading(false);
    } else {
      alert("Order placed successfully!");
      navigate('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
      <div className="bg-glassBg backdrop-blur-md border border-gray-800 p-6 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-extrabold text-neonCyan mb-6 uppercase tracking-widest">Order Summary</h2>
        <div className="flex flex-col gap-4 text-sm mb-6">
          {Object.entries(config).map(([key, item]) => item && (
            <div key={key} className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400 capitalize">{key}</span>
              <span className="text-white font-bold">{item.name} (${item.price})</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-gray-700">
          <span className="text-neonCyan">Total:</span>
          <span className="text-white">${calculateTotal()}</span>
        </div>
      </div>

      <div className="bg-glassBg backdrop-blur-md border border-gray-800 p-6 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-extrabold text-neonCyan mb-6 uppercase tracking-widest">Shipping & Checkout</h2>
        
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
            <p className="text-gray-400 text-xs text-center uppercase tracking-widest mb-2">Dummy Payment Details</p>
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
            {loading ? 'Processing...' : `Pay $${calculateTotal()} & Order`}
          </button>
        </form>
      </div>
    </div>
  );
}
