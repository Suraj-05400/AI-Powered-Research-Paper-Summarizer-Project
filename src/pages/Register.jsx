import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/apiService';
import { useAuthStore } from '../context/store';
import { FiMail, FiLock, FiUser, FiGithub, FiPhone } from 'react-icons/fi'; // Added FiPhone
import { FcGoogle } from 'react-icons/fc';

export const Register = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '', // Added this to match backend requirement
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleGoogleAuth() {
    window.location.href = "http://localhost:8000/api/auth/google";
  }

  const handleGithubAuth = () => {
    window.location.href = "http://localhost:8000/api/auth/github";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Fixed typo: was confirm_Password
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setIsLoading(true);
    try {
      const response = await authService.register(
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.fullName,
        formData.phoneNumber // Passing the 5th argument now
      );
      
      const token = response.data?.access_token || response.data?.token;
      if (token) {
        setToken(token);
        setUser(response.data.user);
        toast.success('Registration successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || "Registration failed";
      console.error("Backend Error Detail:", error.response?.data);
      toast.error(typeof errorMessage === 'object' ? "Check input format" : errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            className="w-full p-3 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            required
          />
          <input
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full p-3 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <div className="flex gap-2">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-1/2 p-3 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm"
              className="w-1/2 p-3 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
          >
            {isLoading ? 'Processing...' : 'Register'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-600"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-gray-800 text-gray-400">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={handleGoogleAuth} className="flex items-center justify-center py-2 bg-white rounded-lg hover:bg-gray-100 transition">
            <FcGoogle className="text-xl mr-2" /> Google
          </button>
          <button onClick={handleGithubAuth} className="flex items-center justify-center py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
            <FiGithub className="text-xl mr-2" /> GitHub
          </button>
        </div>

        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;