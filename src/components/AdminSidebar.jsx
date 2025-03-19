import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ onLogout }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const SidebarItem = ({ icon: Icon, text, to, onClick }) => (
    <Link 
      to={to || '#'} 
      onClick={onClick}
      className={`
        flex items-center 
        py-2.5 px-4 
        rounded-lg 
        transition-all duration-300 
        hover:bg-gray-100 
        group
        ${isExpanded ? 'justify-start' : 'justify-center'}
      `}
    >
      <div className="flex items-center space-x-4">
        <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
        {isExpanded && (
          <span className="text-gray-700 font-medium group-hover:text-blue-600">
            {text}
          </span>
        )}
      </div>
    </Link>
  );

  return (
    <div 
      className={`
        fixed left-0 top-0 h-screen 
        bg-white 
        shadow-xl 
        border-r 
        border-gray-200 
        transition-all 
        duration-300 
        ${isExpanded ? 'w-64' : 'w-20'}
      `}
    >
      <div className="flex flex-col h-full relative">
        {/* Expand/Collapse Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="
            absolute 
            -right-4 
            top-8 
            bg-white 
            border 
            border-gray-200 
            rounded-full 
            p-1 
            shadow-md 
            z-10 
            hover:bg-gray-100
          "
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </button>

        {/* Logo/Title */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-center">
          {isExpanded ? (
            <h2 className="text-xl font-bold text-gray-800">Admin Portal</h2>
          ) : (
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-grow pt-6 space-y-2">
          <SidebarItem 
            icon={LayoutDashboard} 
            text="Dashboard" 
            to="/dashboard"
          />
                  </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <SidebarItem 
            icon={LogOut} 
            text="Logout" 
            onClick={handleLogout}
          />
        </div>

        {/* Footer */}
        {isExpanded && (
          <div className="text-center pb-4 text-xs text-gray-400">
            © {new Date().getFullYear()} Admin Portal
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;