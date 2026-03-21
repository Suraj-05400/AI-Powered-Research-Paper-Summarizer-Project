import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../context/store';
import { FiLogOut, FiMenu, FiX, FiUser, FiBell, FiHome, FiFilePlus, FiBarChart2, FiSettings } from 'react-icons/fi';

export const Header = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-900"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">RP</span>
            </div>
            <span className="text-xl font-bold text-primary hidden sm:inline">
              ResearchPro
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <p className="text-sm text-gray-600 hidden sm:inline">
            Welcome, {user?.full_name || user?.email}
          </p>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition"
          >
            <FiLogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FiFilePlus, label: 'Upload Paper', path: '/upload' },
    { icon: FiBarChart2, label: 'Analytics', path: '/analytics' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-0'
      } bg-primary text-white transition-all duration-300 overflow-hidden fixed h-screen left-0 top-0 pt-20 z-40`}
    >
      <nav className="mt-8">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center space-x-3 px-6 py-3 hover:bg-blue-700 transition text-left"
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">ResearchPro</h3>
            <p className="text-gray-400">
              AI-powered research paper analysis and insights extraction.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/features" className="hover:text-white">Features</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ResearchPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Header;
