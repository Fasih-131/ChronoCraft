import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Password Strength State
  const [strength, setStrength] = useState({ score: 0, label: '', color: 'bg-gray-700' });
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  // Custom Validations
  const validateEmail = (email) => {
    // Regex: prevents purely numerical strings before the @ symbol
    const emailRegex = /^(?!\d+@)[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const validatePassword = (pwd) => {
    // Regex: Min 6 chars (standard supabase minimum is 6)
    return pwd.length >= 6;
  };

  // Evaluate Password Strength in Real-Time
  useEffect(() => {
    if (!password) {
      setStrength({ score: 0, label: '', color: 'bg-gray-700' });
      return;
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) {
      setStrength({ score, label: 'Weak', color: 'bg-red-500' });
    } else if (score <= 4) {
      setStrength({ score, label: 'Medium', color: 'bg-yellow-500' });
    } else {
      setStrength({ score, label: 'Strong', color: 'bg-green-500' });
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Pre-flight validation
    const trimmedEmail = email.trim();
    if (!validateEmail(trimmedEmail)) {
      setError("Invalid email format. Email cannot consist of only numbers before the @ symbol.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error: signUpError } = await signUp(trimmedEmail, password);

    if (signUpError) {
      console.error("Supabase Signup Error:", signUpError);
      setError(signUpError.message);
      setLoading(false);
    } else {
      alert("Registration successful! You can now log in.");
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center h-full p-4">
      <div className="bg-glassBg backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-neonCyan mb-6 tracking-tighter uppercase text-center">Sign Up</h2>
        
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
            
            {/* Password Strength Meter */}
            {password && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400 uppercase tracking-widest">Strength</span>
                  <span className={`font-bold ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
                </div>
                <div className="h-1 w-full bg-gray-800 rounded overflow-hidden flex gap-1">
                  <div className={`h-full flex-1 ${strength.score >= 1 ? strength.color : 'bg-transparent'} transition-colors duration-300`}></div>
                  <div className={`h-full flex-1 ${strength.score >= 3 ? strength.color : 'bg-transparent'} transition-colors duration-300`}></div>
                  <div className={`h-full flex-1 ${strength.score >= 5 ? strength.color : 'bg-transparent'} transition-colors duration-300`}></div>
                </div>
              </div>
            )}
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-neonCyan text-black font-bold uppercase tracking-widest py-3 rounded mt-4 hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account? <Link to="/login" className="text-neonCyan hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
