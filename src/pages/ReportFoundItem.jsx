import React, { useState, useRef } from 'react';
import api from '../api';

const ReportFoundItem = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [finderContact, setFinderContact] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

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
      // Reset form after successful submission
      setCategory('');
      setDescription('');
      setLocation('');
      setFinderContact('');
      setImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setMessage('Failed to report found item. Please try again later.');
    } finally {
      setLoading(false);
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
              py-3 px-4 rounded-lg mb-4 text-center font-medium animate-fade-in
              ${message.includes('successfully') 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'}
            `}>
              {message}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 ml-1">Item Category</label>
              <input
                id="category"
                name="category"
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#018C79] focus:bg-white focus:ring-2 focus:ring-[#018C79] focus:ring-opacity-50 transition duration-300"
                placeholder="e.g., Electronics, Jewelry, Wallet"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 ml-1">Description</label>
              <textarea
                id="description"
                name="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#018C79] focus:bg-white focus:ring-2 focus:ring-[#018C79] focus:ring-opacity-50 transition duration-300"
                placeholder="Describe the item in detail (color, brand, condition, etc.)"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1 ml-1">Found Location</label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#018C79] focus:bg-white focus:ring-2 focus:ring-[#018C79] focus:ring-opacity-50 transition duration-300"
                placeholder="Where did you find this item?"
              />
            </div>

            <div>
              <label htmlFor="finder-contact" className="block text-sm font-medium text-gray-700 mb-1 ml-1">Your Contact Information</label>
              <input
                id="finder-contact"
                name="finder-contact"
                type="text"
                required
                value={finderContact}
                onChange={(e) => setFinderContact(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#018C79] focus:bg-white focus:ring-2 focus:ring-[#018C79] focus:ring-opacity-50 transition duration-300"
                placeholder="Phone number or email address"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Item Image</label>
            <div className={`
              border-2 border-dashed rounded-xl p-4 transition-all duration-300
              ${imagePreview ? 'border-[#018C79] bg-[#f4f7f6]' : 'border-gray-300 hover:border-[#018C79]'}
            `}>
              {!imagePreview ? (
                <div className="text-center py-8">
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    accept="image/*"
                  />
                  <label 
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium text-[#018C79]">Click to upload an image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-64 rounded-lg object-contain shadow-md"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition-colors"
                    aria-label="Remove image"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                  <div className="mt-3 text-center px-2">
                    <p className="text-sm text-gray-600 font-medium truncate">
                      {image?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(image?.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-4 bg-gradient-to-r from-[#018C79] to-teal-600 text-white rounded-lg hover:from-[#016c5d] hover:to-teal-700 transition duration-300 transform hover:scale-[1.02] font-semibold flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Submit Found Item Report
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportFoundItem;