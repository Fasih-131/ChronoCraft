import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center h-full p-4">
      <div className="bg-glassBg backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-neonCyan mb-6 tracking-tighter uppercase text-center">Login</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1 uppercase tracking-widest">Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-neonCyan transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1 uppercase tracking-widest">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-neonCyan transition-colors"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-neonCyan text-black font-bold uppercase tracking-widest py-3 rounded mt-2 hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Don't have an account? <Link to="/signup" className="text-neonCyan hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
