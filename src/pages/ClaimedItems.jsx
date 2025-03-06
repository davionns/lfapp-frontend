import React, { useEffect, useState } from 'react';

const ClaimedItems = () => {
  const [claimedItems, setClaimedItems] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId'); // Get the logged-in user ID from local storage

  // Check if user is logged in
  if (!userId) {
    return <div>Please log in to see your claimed items.</div>;
  }

  useEffect(() => {
    fetchClaimedItems();
  }, []); // Empty dependency array means this runs on mount only

  const fetchClaimedItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/found-items/claimed-items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId, // Send userId in the headers
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching claimed items.');
      }

      const data = await response.json();
      setClaimedItems(data); // Set the claimed items to state
    } catch (error) {
      setError('Error fetching claimed items. Please try again.');
      console.error('Error fetching claimed items:', error);
    }
  };
  
  const handleUnclaimItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/found-items/unclaim/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // Send userId with the request body
      });

      if (!response.ok) {
        throw new Error('Error unclaiming the item.');
      }

      fetchClaimedItems(); // Refresh the list after unclaiming
      alert('Item unclaimed successfully!');
    } catch (error) {
      alert('Error unclaiming the item. Please try again.');
      console.error('Error unclaiming item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f7f6] to-[#e0e8e4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 p-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#018C79] to-teal-600 mb-8 text-center">
            Your Claimed Items
          </h2>

          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {claimedItems.length === 0 ? (
              <p>You have not claimed any items yet.</p>
            ) : (
              claimedItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.03] hover:shadow-xl">
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
                    <h3 className="text-xl font-bold text-[#018C79] mb-2">{item.category}</h3>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p><span className="font-medium">Location:</span> {item.location}</p>
                      <p><span className="font-medium">Finder Contact:</span> {item.finder_contact}</p>
                    </div>
                    <button
                      onClick={() => handleUnclaimItem(item.id)}
                      className="mt-4 px-4 py-2 bg-gradient-to-r from-[#018C79] to-teal-600 text-white rounded-lg hover:from-[#016c5d] hover:to-teal-700"
                    >
                      Unclaim Item
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimedItems;
