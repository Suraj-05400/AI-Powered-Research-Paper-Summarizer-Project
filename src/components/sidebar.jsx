import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUpload, FiBarChart2, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuthStore } from '../context/store';

const Sidebar = ({ isOpen }) => {
  const { logout } = useAuthStore();

  const menuItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/dashboard' },
    { name: 'Upload Paper', icon: <FiUpload />, path: '/upload' },
    { name: 'Analytics', icon: <FiBarChart2 />, path: '/analytics' },
    { name: 'Settings', icon: <FiSettings />, path: '/settings' },
  ];

  return (
    <div className={`bg-gray-800 text-white w-64 flex-shrink-0 flex flex-col transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-blue-400">Research.ai</h2>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'} // Prevents highlighting Dashboard when in Analytics
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-400'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button 
        onClick={logout}
        className="m-4 flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
      >
        <FiLogOut />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
