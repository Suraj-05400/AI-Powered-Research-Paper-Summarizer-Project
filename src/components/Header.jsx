import React from 'react';
import { FiMenu, FiUser, FiLogOut, FiBell } from 'react-icons/fi';
import { useAuthStore } from '../context/store';
import { useNavigate } from 'react-router-dom';

export const Header = ({ sidebarOpen, toggleSidebar }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 md:px-8 z-30">
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <FiMenu size={24} />
        </button>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hidden md:block">
          ResearchPro AI
        </span>
      </div>

      <div className="flex items-center space-x-3 md:space-x-6">
        <button className="text-gray-400 hover:text-white transition-colors relative">
          <FiBell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-gray-800 mx-2"></div>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{user?.full_name || 'Researcher'}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">MCA Batch 2026</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center border-2 border-gray-700">
            <FiUser className="text-white" size={20} />
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            title="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;