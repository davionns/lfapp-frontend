import React, { useState } from 'react';
import api from '../api';

const ReportFoundItem = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [finderContact, setFinderContact] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const formData = new FormData();
    formData.append('category', category);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('finder_contact', finderContact);
    if (image) formData.append('image', image);

    try {
      await api.post('/found-items/report', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Found item reported successfully!');
    } catch (error) {
      setMessage('Failed to report found item.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f7f6] to-[#e0e8e4] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md space-y-8 bg-white shadow-2xl rounded-2xl border border-gray-100 p-10 transform transition-all duration-300 hover:scale-[1.02]">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#018C79] to-teal-600 mb-4">
            Report Found Item
          </h2>
          <p className="text-gray-500 mb-6">Help reunite an item with its owner</p>
          
          {message && (
            <div className={`
              py-2 px-4 rounded-lg mb-4 text-center font-medium
              ${message.includes('successfully') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'}
            `}>
              {message}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className="sr-only">Category</label>
              <input
                id="category"
                name="category"
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#018C79] focus:bg-white focus:ring-2 focus:ring-[#018C79] focus:ring-opacity-50 transition duration-300"
                placeholder="Item Category"
              />
            </div>

            <div>
              <label htmlFor="description" className="sr-only">Description</label>
              <textarea
                id="description"
                name="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#018C79] focus:bg-white focus:ring-2 focus:ring-[#018C79] focus:ring-opacity-50 transition duration-300"
                placeholder="Detailed Description"
              />
            </div>

            <div>
              <label htmlFor="location" className="sr-only">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#018C79] focus:bg-white focus:ring-2 focus:ring-[#018C79] focus:ring-opacity-50 transition duration-300"
                placeholder="Found Location"
              />
            </div>

            <div>
              <label htmlFor="finder-contact" className="sr-only">Finder Contact</label>
              <input
                id="finder-contact"
                name="finder-contact"
                type="text"
                required
                value={finderContact}
                onChange={(e) => setFinderContact(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#018C79] focus:bg-white focus:ring-2 focus:ring-[#018C79] focus:ring-opacity-50 transition duration-300"
                placeholder="Your Contact Information"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <label 
              htmlFor="file-upload" 
              className="w-full cursor-pointer"
            >
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <div 
                className="w-full text-center px-4 py-3 bg-[#018C79] text-white rounded-lg hover:bg-[#016c5d] transition duration-300 flex items-center justify-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>Upload Image</span>
              </div>
            </label>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-[#018C79] to-teal-600 text-white rounded-lg hover:from-[#016c5d] hover:to-teal-700 transition duration-300 transform hover:scale-[1.02] font-semibold"
            >
              Submit Found Item Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportFoundItem;