import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

import { 
  Bars3Icon, 
  BellIcon, 
  Cog6ToothIcon, 
  UserCircleIcon, 
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
  DocumentPlusIcon 
} from '@heroicons/react/24/solid';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (token && userId) {
      const fetchNotifications = async () => {
        try {
          const response = await api.get(`/notifications/${userId}`);
          setNotifications(response.data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

      fetchNotifications();
    }
  }, [token, userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await api.put(`/notifications/read/${notificationId}`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.id === notificationId ? { ...n, status: 'read' } : n
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const unreadNotificationsCount = notifications.filter((n) => n.status === 'unread').length;

  const isActive = (path) => location.pathname === path 
    ? 'bg-emerald-600 bg-opacity-20 text-emerald-50' 
    : 'hover:bg-emerald-600 hover:bg-opacity-10 text-white/90';

  return (
    <nav className="bg-gradient-to-r from-[#005B4F] via-[#008370] to-[#00A98F] text-white shadow-2xl sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:bg-emerald-700/30 p-2 rounded-md transition-all group"
            >
              <Bars3Icon className="h-6 w-6 group-hover:rotate-90 transition-transform ease-in-out" />
            </button>
            
            <Link 
              to="/" 
              className="flex-shrink-0 font-bold text-xl tracking-wider 
              bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent
              hover:scale-105 transition-transform origin-left"
            >
              Lost & Found
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {token ? (
              <>
                {/* Logged In Navigation */}
                <div className="flex space-x-1 bg-white/10 rounded-xl p-1">
                  <Link 
                    to="/report-lost-item" 
                    className={`px-3 py-2 rounded-lg transition-all flex items-center text-sm font-medium ${isActive('/report-lost-item')}`}
                  >
                    <DocumentPlusIcon className="h-4 w-4 mr-2 opacity-70" />
                    Report Lost
                  </Link>
                  
                  <Link 
                    to="/report-found-item" 
                    className={`px-3 py-2 rounded-lg transition-all flex items-center text-sm font-medium ${isActive('/report-found-item')}`}
                  >
                    <PlusCircleIcon className="h-4 w-4 mr-2 opacity-70" />
                    Report Found
                  </Link>
                </div>
                
                <div className="flex space-x-1 bg-white/10 rounded-xl p-1">
                  <Link 
                    to="/lost-items" 
                    className={`px-3 py-2 rounded-lg transition-all flex items-center text-sm font-medium ${isActive('/lost-items')}`}
                  >
                    <MagnifyingGlassIcon className="h-4 w-4 mr-2 opacity-70" />
                    Lost Items
                  </Link>
                  
                  <Link 
                    to="/found-items" 
                    className={`px-3 py-2 rounded-lg transition-all flex items-center text-sm font-medium ${isActive('/found-items')}`}
                  >
                    <MagnifyingGlassIcon className="h-4 w-4 mr-2 opacity-70" />
                    Found Items
                  </Link>
                </div>

                {/* Notification Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="p-2 hover:bg-white/20 rounded-full relative group transition-all"
                  >
                    {unreadNotificationsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                        {unreadNotificationsCount}
                      </span>
                    )}
                    <BellIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </button>

                  {isNotificationOpen && (
                    <div className="absolute right-0 mt-3 w-80 bg-white text-gray-800 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto animate-dropdownSlide border-2 border-emerald-100">
                      <div className="p-4 bg-emerald-50 text-emerald-900 font-semibold border-b border-emerald-200 rounded-t-xl">
                        Notifications
                      </div>
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            onClick={() => handleMarkAsRead(notification.id)}
                            className={`p-3 hover:bg-emerald-50 cursor-pointer transition-colors border-b last:border-0 ${
                              notification.status === 'unread' 
                                ? 'bg-emerald-100 bg-opacity-50 font-semibold' 
                                : 'bg-white'
                            }`}
                          >
                            {notification.message}
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-gray-500 text-center">No notifications</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Icons */}
                <div className="flex space-x-1 bg-white/10 rounded-full p-1">
                  <Link 
                    to="/settings" 
                    className={`p-2 rounded-full group transition-all ${isActive('/settings')}`}
                  >
                    <Cog6ToothIcon className="h-5 w-5 group-hover:rotate-180 transition-transform" />
                  </Link>
                  
                  <Link 
                    to="/profile" 
                    className={`p-2 rounded-full group transition-all ${isActive('/profile')}`}
                  >
                    <UserCircleIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Link>
                  
                  <Link 
                    to="/about-help" 
                    className={`p-2 rounded-full group transition-all ${isActive('/about-help')}`}
                  >
                    <QuestionMarkCircleIcon className="h-5 w-5 group-hover:animate-pulse" />
                  </Link>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all flex items-center text-sm font-medium group"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Logout
                </button>
              </>
            ) : (
              // Logged Out Navigation
              <div className="flex items-center space-x-2">
                <Link 
                  to="/about-help" 
                  className={`p-2 rounded-full group transition-all ${isActive('/about-help')}`}
                >
                  <QuestionMarkCircleIcon className="h-5 w-5 group-hover:animate-pulse" />
                </Link>
                
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${isActive('/login')}`}
                >
                  Login
                </Link>
                
                <Link 
                  to="/signup" 
                  className="px-4 py-2 bg-white text-[#005B4F] rounded-lg hover:bg-emerald-100 transition-all flex items-center text-sm font-medium"
                >
                  <UserCircleIcon className="h-4 w-4 mr-2" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="fixed top-16 left-0 w-full h-full bg-gradient-to-r from-[#005B4F] via-[#008370] to-[#00A98F] md:hidden animate-slideDown z-40">
              <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
                {token ? (
                  <>
                    {/* Mobile Menu Items */}
                    <div className="space-y-2 px-2">
                      <Link 
                        to="/report-lost-item" 
                        className="block px-4 py-3 rounded-lg hover:bg-white/10 flex items-center text-sm font-medium"
                      >
                        <DocumentPlusIcon className="h-5 w-5 mr-3 opacity-70" />
                        Report Lost Item
                      </Link>
                      
                      <Link 
                        to="/report-found-item" 
                        className="block px-4 py-3 rounded-lg hover:bg-white/10 flex items-center text-sm font-medium"
                      >
                        <PlusCircleIcon className="h-5 w-5 mr-3 opacity-70" />
                        Report Found Item
                      </Link>
                      
                      <Link 
                        to="/lost-items" 
                        className="block px-4 py-3 rounded-lg hover:bg-white/10 flex items-center text-sm font-medium"
                      >
                        <MagnifyingGlassIcon className="h-5 w-5 mr-3 opacity-70" />
                        View Lost Items
                      </Link>
                      
                      <Link 
                        to="/found-items" 
                        className="block px-4 py-3 rounded-lg hover:bg-white/10 flex items-center text-sm font-medium"
                      >
                        <MagnifyingGlassIcon className="h-5 w-5 mr-3 opacity-70" />
                        View Found Items
                      </Link>
                    </div>

                    <div className="border-t border-white/20 my-4"></div>
                    
                    <div className="space-y-2 px-2">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-3 rounded-lg hover:bg-white/10 flex items-center text-sm font-medium"
                      >
                        <UserCircleIcon className="h-5 w-5 mr-3" />
                        Profile
                      </Link>
                      
                      <Link 
                        to="/settings" 
                        className="block px-4 py-3 rounded-lg hover:bg-white/10 flex items-center text-sm font-medium"
                      >
                        <Cog6ToothIcon className="h-5 w-5 mr-3" />
                        Settings
                      </Link>
                      
                      <Link 
                        to="/about-help" 
                        className="block px-4 py-3 rounded-lg hover:bg-white/10 flex items-center text-sm font-medium"
                      >
                        <QuestionMarkCircleIcon className="h-5 w-5 mr-3" />
                        Help
                      </Link>
                    </div>
                    
                    <div className="px-2 mt-4">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-center px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center text-sm font-medium"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 px-2">
                    <Link 
                      to="/login" 
                      className="block px-4 py-3 rounded-lg hover:bg-white/10 flex items-center text-sm font-medium"
                    >
                      <UserCircleIcon className="h-5 w-5 mr-3" />
                      Login
                    </Link>
                    
                    <Link 
                      to="/signup" 
                      className="block px-4 py-3 bg-white text-[#005B4F] rounded-lg hover:bg-emerald-100 flex items-center text-sm font-medium"
                    >
                      <UserCircleIcon className="h-5 w-5 mr-3" />
                      Sign Up
                    </Link>
                    
                    <Link 
                      to="/about-help" 
                      className="block px-4 py-3 rounded-lg hover:bg-white/10 flex items-center text-sm font-medium"
                    >
                      <QuestionMarkCircleIcon className="h-5 w-5 mr-3" />
                      Help
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;