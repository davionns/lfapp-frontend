import React, { useEffect, useState } from 'react';
import api from '../api';

const Settings = () => {
  const [settings, setSettings] = useState({
    notify_found_match: true,
    notify_claimed: true,
    publicize_lost_items: true,
  });
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await api.get(`/user-settings/${userId}`);
        setSettings(response.data);
      } catch (err) {
        console.error('Error fetching user settings:', err);
        setError('Failed to load settings. Please try again.');
      }
    };
    
    fetchUserSettings();
  }, [userId]);

  const handleToggle = (setting) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  const handleSave = async () => {
    try {
      await api.put(`/user-settings/${userId}`, settings);
      alert('Settings updated successfully!');
    } catch (err) {
      console.error('Error updating settings:', err);
      setError('Failed to update settings. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden p-8">
        {/* Header */}
        <div className="bg-[#018C79] text-white p-6 -mx-8 -mt-8 mb-6 rounded-t-2xl flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.757.426 1.757 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.757-2.924 1.757-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.757-.426-1.757-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}

        {/* Settings Toggles */}
        <div className="space-y-4">
          {/* Notify Found Match Toggle */}
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <label className="text-gray-700 flex-grow pr-4">
              Notify me when a found item matches my lost item
            </label>
            <div className="relative">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={settings.notify_found_match}
                onChange={() => handleToggle('notify_found_match')}
                id="notify_found_match"
              />
              <label 
                htmlFor="notify_found_match"
                className={`
                  cursor-pointer w-14 h-7 rounded-full transition-all duration-300 ease-in-out
                  ${settings.notify_found_match ? 'bg-[#018C79]' : 'bg-gray-300'}
                  relative inline-block
                `}
              >
                <span 
                  className={`
                    absolute top-1 left-1 w-5 h-5 bg-white rounded-full 
                    transform transition-transform duration-300 ease-in-out
                    ${settings.notify_found_match ? 'translate-x-7' : 'translate-x-0'}
                  `}
                />
              </label>
            </div>
          </div>

          {/* Notify Claimed Toggle */}
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <label className="text-gray-700 flex-grow pr-4">
              Notify me when my item is claimed
            </label>
            <div className="relative">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={settings.notify_claimed}
                onChange={() => handleToggle('notify_claimed')}
                id="notify_claimed"
              />
              <label 
                htmlFor="notify_claimed"
                className={`
                  cursor-pointer w-14 h-7 rounded-full transition-all duration-300 ease-in-out
                  ${settings.notify_claimed ? 'bg-[#018C79]' : 'bg-gray-300'}
                  relative inline-block
                `}
              >
                <span 
                  className={`
                    absolute top-1 left-1 w-5 h-5 bg-white rounded-full 
                    transform transition-transform duration-300 ease-in-out
                    ${settings.notify_claimed ? 'translate-x-7' : 'translate-x-0'}
                  `}
                />
              </label>
            </div>
          </div>

          {/* Publicize Lost Items Toggle */}
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <label className="text-gray-700 flex-grow pr-4">
              Allow my lost items to be publicized
            </label>
            <div className="relative">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={settings.publicize_lost_items}
                onChange={() => handleToggle('publicize_lost_items')}
                id="publicize_lost_items"
              />
              <label 
                htmlFor="publicize_lost_items"
                className={`
                  cursor-pointer w-14 h-7 rounded-full transition-all duration-300 ease-in-out
                  ${settings.publicize_lost_items ? 'bg-[#018C79]' : 'bg-gray-300'}
                  relative inline-block
                `}
              >
                <span 
                  className={`
                    absolute top-1 left-1 w-5 h-5 bg-white rounded-full 
                    transform transition-transform duration-300 ease-in-out
                    ${settings.publicize_lost_items ? 'translate-x-7' : 'translate-x-0'}
                  `}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button 
            onClick={handleSave}
            className="
              w-full py-3 rounded-lg font-semibold text-white
              bg-[#018C79] hover:bg-[#016B5A]
              transform hover:-translate-y-1 hover:scale-101
              transition-all duration-300 ease-in-out
              shadow-lg hover:shadow-xl
              flex items-center justify-center
              group
            "
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 mr-2 group-hover:animate-pulse" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;