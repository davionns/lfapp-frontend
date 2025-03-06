import React, { useEffect, useState } from 'react';
import api from '../api';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [reportedItems, setReportedItems] = useState([]);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/users/profile/${userId}`);
        setUser(response.data.user);
        setReportedItems(response.data.reportedItems);
      } catch (err) {
        setError('Failed to fetch user profile.');
      }
    };
    fetchUserProfile();
  }, [userId]);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}

        {user && (
          <>
            {/* Profile Header */}
            <div className="bg-[#018C79] text-white p-6">
              <h1 className="text-3xl font-bold mb-2">User Profile</h1>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{user.name}</h2>
                  <p className="text-white/80">Student ID: {user.student_id}</p>
                </div>
              </div>
            </div>

            {/* Reported Items Section */}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-[#018C79] mb-4 border-b-2 border-[#018C79] pb-2">
                Reported Lost Items
              </h3>

              {reportedItems.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  No items reported yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {reportedItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300 border-l-4 border-[#018C79]"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-lg font-semibold text-[#018C79]">
                            {item.category} - {item.description}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Location: {item.location}
                          </p>
                          <p className="text-sm text-gray-600">
                            Status: {item.status}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Reported on: {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="bg-[#018C79]/10 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#018C79]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;