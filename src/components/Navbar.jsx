import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-glassBg backdrop-blur-md border-b border-gray-800 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-white tracking-tighter">CHRONO<span className="text-neonCyan">CRAFT</span></span>
        </Link>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              {profile?.role === 'admin' && (
                <Link to="/admin" className="text-sm font-bold text-neonCyan hover:text-white transition-colors uppercase tracking-widest">
                  Admin Panel
                </Link>
              )}
              <span className="text-gray-400 text-sm hidden md:inline">{user.email}</span>
              <button 
                onClick={handleLogout}
                className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest border border-red-900/50 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-widest">
                Login
              </Link>
              <Link to="/signup" className="text-sm font-bold text-black bg-neonCyan hover:bg-white transition-colors uppercase tracking-widest px-4 py-1 rounded">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
