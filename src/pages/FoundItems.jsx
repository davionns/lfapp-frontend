import React, { useEffect, useState } from 'react';
import api from '../api';

const FoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);

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

    // Fetch all found items initially
    fetchFoundItems();
    fetchCategories();
  }, []);

  const fetchFoundItems = async (params = {}) => {
    try {
      const response = await api.get('/found-items/search', { params });
      setFoundItems(response.data);
    } catch (error) {
      console.error('Error fetching found items:', error);
    }
  };

  const handleSearch = () => {
    fetchFoundItems({ keyword, category, date });
  };

  const handleClaimItem = async (itemId) => {
    try {
      const userId = localStorage.getItem('userId'); // Get user ID from local storage
      await api.post(`/found-items/claim/${itemId}`, { userId });
      alert('Item claimed successfully!');
      fetchFoundItems(); // Refresh the list after claiming
    } catch (error) {
      console.error('Error claiming item:', error);
      alert('Failed to claim the item. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f7f6] to-[#e0e8e4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 p-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#018C79] to-teal-600 mb-8 text-center">
            Search Found Items
          </h2>

          {/* Search and Filter Controls */}
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

          {/* Display Found Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {foundItems.map((item) => (
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
                  </div>
                  <button
                    onClick={() => handleClaimItem(item.id)}
                    className="mt-4 w-full px-4 py-2 bg-[#018C79] text-white rounded-lg hover:bg-[#016c5d] transition duration-300"
                  >
                    Claim Item
                  </button>
                </div>
              </div>
            ))}
          </div>

          {foundItems.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No items found. Try adjusting your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoundItems;