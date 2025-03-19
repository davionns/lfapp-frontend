import React, { useState, useRef } from 'react';
import api from '../api'; // Assuming this handles the Axios API calls

const ReportLostItem = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [rewardValue, setRewardValue] = useState('');
  const [sentimentalValue, setSentimentalValue] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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

  // Validate form fields
  const validateForm = () => {
    if (!category || !description || !location) {
      return 'Please fill in all required fields.';
    }
    if (rewardValue && isNaN(rewardValue)) {
      return 'Reward Value must be a number.';
    }
    if (sentimentalValue && isNaN(sentimentalValue)) {
      return 'Sentimental Value must be a number.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMessage('');
    setLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setLoading(false);
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setErrorMessage('User ID is missing. Please log in again.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('reward_value', rewardValue);
    formData.append('sentimental_value', sentimentalValue);
    if (image) formData.append('image', image);

    try {
      await api.post('/lost-items/report', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Lost item reported successfully!');
      // Reset form after successful submission
      setCategory('');
      setDescription('');
      setLocation('');
      setRewardValue('');
      setSentimentalValue('');
      setImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setErrorMessage('Failed to report lost item. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-[#018C79]">
            Report Lost Item
          </h2>
          <p className="mt-2 text-center text-gray-500">
            Please provide details about your lost item
          </p>
          {message && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-center text-green-600 font-medium">{message}</p>
            </div>
          )}
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-center text-red-600 font-medium">{errorMessage}</p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <input
                id="category"
                name="category"
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#018C79] focus:border-[#018C79] focus:z-10 sm:text-sm"
                placeholder="e.g., Electronics, Jewelry, Documents"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                id="description"
                name="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#018C79] focus:border-[#018C79] focus:z-10 sm:text-sm"
                placeholder="Describe your item in detail (color, size, brand, etc.)"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#018C79] focus:border-[#018C79] focus:z-10 sm:text-sm"
                placeholder="Where did you last see your item?"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="reward-value" className="block text-sm font-medium text-gray-700 mb-1">Reward Value</label>
                <input
                  id="reward-value"
                  name="reward-value"
                  type="text"
                  value={rewardValue}
                  onChange={(e) => setRewardValue(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#018C79] focus:border-[#018C79] focus:z-10 sm:text-sm"
                  placeholder="RWF Amount"
                />
              </div>
              <div>
                <label htmlFor="sentimental-value" className="block text-sm font-medium text-gray-700 mb-1">Sentimental Value</label>
                <input
                  id="sentimental-value"
                  name="sentimental-value"
                  type="text"
                  value={sentimentalValue}
                  onChange={(e) => setSentimentalValue(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#018C79] focus:border-[#018C79] focus:z-10 sm:text-sm"
                  placeholder="1-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Item Image</label>
            <div className={`border-2 border-dashed rounded-lg p-4 ${imagePreview ? 'border-[#018C79]' : 'border-gray-300'} hover:border-[#018C79] transition-colors duration-200`}>
              {!imagePreview ? (
                <div className="text-center">
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    accept="image/*"
                  />
                  <label 
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer py-6"
                  >
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">Click to upload an image</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="mx-auto max-h-48 rounded-md object-contain"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                  <p className="mt-2 text-sm text-center text-gray-500">
                    {image?.name} ({(image?.size / 1024).toFixed(1)} KB)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#018C79] hover:bg-[#016c5d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#018C79] transition-colors duration-200"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Report'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportLostItem;