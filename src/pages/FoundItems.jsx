import React, { useEffect, useState } from 'react';
import api from '../api';

const FoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'claimed'

  useEffect(() => {
    // Fetch categories for filter
    const fetchCategories = async () => {
      try {
        const response = await api.get('/found-items/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    // Fetch items based on current view mode
    if (viewMode === 'all') {
      fetchFoundItems();
    } else {
      fetchClaimedItems();
    }
    
    fetchCategories();
  }, [viewMode]); // Re-fetch when view mode changes

  const fetchFoundItems = async (params = {}) => {
    try {
      // Include userId in params to show claimed items
      const userId = localStorage.getItem('userId');
      const searchParams = { 
        ...params,
        userId 
      };
      
      const response = await api.get('/found-items/search', { params: searchParams });
      setFoundItems(response.data);
    } catch (error) {
      console.error('Error fetching found items:', error);
    }
  };

  const fetchClaimedItems = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Please log in to view claimed items');
        setViewMode('all');
        return;
      }

      // Use the showClaimedItems endpoint
      const response = await api.get('/found-items/claimed', {
        headers: { 'user-id': userId }
      });
      
      setFoundItems(response.data);
    } catch (error) {
      console.error('Error fetching claimed items:', error);
    }
  };

  const handleSearch = () => {
    if (viewMode === 'all') {
      fetchFoundItems({ keyword, category, date });
    } else {
      // When in claimed view, we don't apply the filters (or you can implement filtering for claimed items)
      fetchClaimedItems();
    }
  };
  const fetchClaimedItemsByUser = async () => {
    try {
        const userId = localStorage.getItem('userId'); // Get logged-in user's ID
        if (!userId) {
            alert('Please log in to view your claimed items');
            return;
        }

        const response = await api.get(`/found-items/claimed-items/${userId}`);
        setFoundItems(response.data);
    } catch (error) {
        console.error('Error fetching claimed items:', error);
    }
};


  const handleClaimItem = async (itemId) => {
    try {
      const userId = localStorage.getItem('userId'); // Get user ID from local storage
      if (!userId) {
        alert('Please log in to claim items');
        return;
      }
      
      await api.post(`/found-items/claim/${itemId}`, { userId });
      alert('Item claimed successfully!');
      
      // Refresh current view
      if (viewMode === 'all') {
        fetchFoundItems({ keyword, category, date });
      } else {
        fetchClaimedItems();
      }
    } catch (error) {
      console.error('Error claiming item:', error);
      alert('Failed to claim the item. Please try again.');
    }
  };

  const handleUnclaimItem = async (itemId) => {
    try {
      const userId = localStorage.getItem('userId'); // Get user ID from local storage
      if (!userId) {
        alert('Please log in to unclaim items');
        return;
      }
      
      await api.post(`/found-items/unclaim/${itemId}`, { userId });
      alert('Item unclaimed successfully!');
      
      // Refresh current view
      if (viewMode === 'all') {
        fetchFoundItems({ keyword, category, date });
      } else {
        fetchClaimedItems();
      }
    } catch (error) {
      console.error('Error unclaiming item:', error);
      alert('Failed to unclaim the item. Please try again.');
    }
  };

  // Get current user ID for comparisons
  const getCurrentUserId = () => {
    return localStorage.getItem('userId');
  };

  // Toggle between all items and claimed items
  const toggleViewMode = () => {
    if (viewMode === 'all') {
        setViewMode('claimed');
        fetchClaimedItemsByUser(); // Fetch only items claimed by the user
    } else {
        setViewMode('all');
        fetchFoundItems();
    }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f7f6] to-[#e0e8e4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 p-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#018C79] to-teal-600 mb-8 text-center">
            {viewMode === 'all' ? 'Search Found Items' : 'My Claimed Items'}
          </h2>

          {/* Toggle Button for View Mode */}
          <div className="flex justify-center mb-6">
            <button
              onClick={toggleViewMode}
              className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition duration-300 font-medium"
            >
              {viewMode === 'all' ? 'View My Claimed Items' : 'Back to All Items'}
            </button>
          </div>

          {/* Search and Filter Controls - Only show in 'all' mode */}
          {viewMode === 'all' && (
            <div className="mb-12 bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
                    Search by Keyword
                  </label>
                  <input
                    id="keyword"
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#018C79] focus:border-transparent"
                    placeholder="Enter keyword"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#018C79] focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date Found
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#018C79] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSearch}
                  className="px-8 py-3 bg-gradient-to-r from-[#018C79] to-teal-600 text-white rounded-lg hover:from-[#016c5d] hover:to-teal-700 transition duration-300 transform hover:scale-[1.02] font-semibold"
                >
                  Search
                </button>
              </div>
            </div>
          )}

          {/* Display Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {foundItems.map((item) => {
              const currentUserId = getCurrentUserId();
              const isClaimedByCurrentUser = item.claimed_by && item.claimed_by.toString() === currentUserId;
              
              return (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.03] hover:shadow-xl"
                >
                  {item.image && (
                    <div className="h-48 w-full overflow-hidden">
                      <img 
                        src={`data:image/jpeg;base64,${item.image}`} 
                        alt={item.description} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#018C79] mb-2">
                      {item.category}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {item.description}
                    </p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>
                        <span className="font-medium">Location:</span> {item.location}
                      </p>
                      <p>
                        <span className="font-medium">Finder Contact:</span> {item.finder_contact}
                      </p>
                      
                      {/* Show claimed status if applicable */}
                      {item.claimed_by && viewMode === 'all' && (
                        <p className="mt-2 font-medium text-amber-600">
                          {isClaimedByCurrentUser
                            ? "You have claimed this item" 
                            : `Claimed by User #${item.claimed_by}`}
                        </p>
                      )}

                      {/* In claimed view, highlight that it's your claim */}
                      {viewMode === 'claimed' && (
                        <p className="mt-2 font-medium text-amber-600">
                          You claimed this item
                        </p>
                      )}
                    </div>
                    
                    {/* Conditional button based on claim status and view mode */}
                    {viewMode === 'all' ? (
                      item.claimed_by ? (
                        isClaimedByCurrentUser ? (
                          <button
                            onClick={() => handleUnclaimItem(item.id)}
                            className="mt-4 w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition duration-300"
                          >
                            Unclaim Item
                          </button>
                        ) : (
                          <button
                            disabled
                            className="mt-4 w-full px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                          >
                            Already Claimed
                          </button>
                        )
                      ) : (
                        <button
                          onClick={() => handleClaimItem(item.id)}
                          className="mt-4 w-full px-4 py-2 bg-[#018C79] text-white rounded-lg hover:bg-[#016c5d] transition duration-300"
                        >
                          Claim Item
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => handleUnclaimItem(item.id)}
                        className="mt-4 w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition duration-300"
                      >
                        Unclaim Item
                      </button>
                    )}

                    {/* Contact button for claimed items */}
                    {((viewMode === 'claimed') || (viewMode === 'all' && isClaimedByCurrentUser)) && (
  <a
    href={`tel:${item.finder_contact}`}
    className="mt-2 block w-full text-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
  >
    Contact Finder
  </a>
)}

                  </div>
                </div>
              );
            })}
          </div>

          {foundItems.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              {viewMode === 'all' 
                ? 'No items found. Try adjusting your search criteria.'
                : 'You have not claimed any items yet.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoundItems;