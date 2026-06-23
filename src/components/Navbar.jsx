import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import AiSearch from './AiSearch';

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const cartCount = getCartCount();

  return (
    <nav className="bg-glassBg backdrop-blur-md border-b border-gray-800 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        
        {/* Logo & Main Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-white tracking-tighter">CHRONO<span className="text-neonCyan">CRAFT</span></span>
          </Link>
          
          <div className="hidden md:flex gap-6 items-center text-sm font-bold uppercase tracking-widest text-gray-400">
            <Link to="/category/men" className="hover:text-white transition-colors">Men</Link>
            <Link to="/category/women" className="hover:text-white transition-colors">Women</Link>
            <Link to="/category/kids" className="hover:text-white transition-colors">Kids</Link>
            <Link to="/custom" className="text-neonCyan hover:text-white transition-colors border-l border-gray-800 pl-6">Custom Shop</Link>
          </div>
        </div>

        {/* AI Search */}
        <div className="flex-1 max-w-sm hidden lg:block">
          <AiSearch />
        </div>

        {/* Right Nav (Auth & Cart) */}
        <div className="flex gap-4 items-center">
          
          {/* Cart Icon */}
          <Link to="/cart" className="relative text-white hover:text-neonCyan transition-colors flex items-center justify-center p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-neonCyan text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              {profile?.role === 'admin' && (
                <Link to="/admin" className="text-xs font-bold text-neonCyan hover:text-white transition-colors uppercase tracking-widest border border-neonCyan/50 px-2 py-1 rounded">
                  Admin
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest hidden sm:block"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-xs font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-widest">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
