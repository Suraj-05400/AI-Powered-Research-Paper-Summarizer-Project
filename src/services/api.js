import axios from 'axios';
import { useAuthStore } from '../context/store.js'; // Import your store

const API_BASE_URL = import.meta.env.VITE_API_URL ||'https://ai-powered-research-paper-summarizer.onrender.com'||'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL.replace(/\/$/, "")}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests using Zustand State
apiClient.interceptors.request.use((config) => {
  // Access the state directly without a hook
  const token = useAuthStore.getState().token; 
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear store on unauthorized
    //useAuthStore.getState().setToken(null);
    //useAuthStore.getState().setUser(null);
      useAuthStore.getState().logout(); 
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    //window.location.href = '/login';
    }
    return Promise.reject(error); 
  }
);

export default apiClient;
