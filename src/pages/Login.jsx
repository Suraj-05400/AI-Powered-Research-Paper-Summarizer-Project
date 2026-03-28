import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/apiService';
import { useAuthStore } from '../context/store';
import { FiMail, FiLock } from 'react-icons/fi';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setToken } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // --- FIX 1: Handle Social Login Redirects ---
  // When Google/GitHub redirects back to http://localhost:5173/login?token=...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      setToken(token);
      // Optional: If your callback sends user data in URL or you need to fetch it
      // authService.getProfile().then(res => setUser(res.data));
      toast.success('Logged in with Social Account!');
      navigate('/dashboard');
    }
  }, [location, setToken, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- FIX 2: Connect Social Buttons to Backend ---
  const handleSocialLogin = (provider) => {
     const base = import.meta.env.VITE_API_URL ||'https://ai-powered-research-paper-summarizer.onrender.com';
     window.location.href = `${base}/api/auth/${provider}`;
//};
    // This triggers the RedirectResponse in your FastAPI auth.py
  // window.location.href = `http://localhost:8000/api/auth/${provider}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.login(formData.email, formData.password);
      
      // Match the keys exactly with your FastAPI 'Token' schema
      const token = response.data.access_token; 
      const userData = response.data.user;

      if (token) {
        setToken(token);
        setUser(userData);
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      const msg = error.response?.data?.detail || 'Login failed';
      toast.error(typeof msg === 'string' ? msg : "Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">ResearchPro</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <FiMail className="inline mr-2 text-blue-600" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <FiLock className="inline mr-2 text-blue-600" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 text-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-white text-gray-400 font-medium">Or continue with</span>
          </div>
        </div>

        {/* --- Updated Social Buttons --- */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5 mr-2" alt="Google" />
            <span className="text-sm font-semibold text-gray-700">Google</span>
          </button>
          <button 
            onClick={() => handleSocialLogin('github')}
            className="flex items-center justify-center py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5 h-5 mr-2" alt="GitHub" />
            <span className="text-sm font-semibold text-gray-700">GitHub</span>
          </button>
        </div>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:text-blue-800 transition-colors">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
