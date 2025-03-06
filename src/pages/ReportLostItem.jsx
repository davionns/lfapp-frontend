import React, { useState } from 'react';
import api from '../api'; // Assuming this handles the Axios API calls

const ReportLostItem = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [rewardValue, setRewardValue] = useState('');
  const [sentimentalValue, setSentimentalValue] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
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
          {message && (
            <p className={`mt-2 text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
          {errorMessage && (
            <p className="mt-2 text-center text-red-600">{errorMessage}</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="category" className="sr-only">Category</label>
              <input
                id="category"
                name="category"
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#018C79] focus:border-[#018C79] focus:z-10 sm:text-sm"
                placeholder="Category"
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#018C79] focus:border-[#018C79] focus:z-10 sm:text-sm"
                placeholder="Description"
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#018C79] focus:border-[#018C79] focus:z-10 sm:text-sm"
                placeholder="Location"
              />
            </div>
            <div>
              <label htmlFor="reward-value" className="sr-only">Reward Value</label>
              <input
                id="reward-value"
                name="reward-value"
                type="text"
                value={rewardValue}
                onChange={(e) => setRewardValue(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#018C79] focus:border-[#018C79] focus:z-10 sm:text-sm"
                placeholder="Reward Value"
              />
            </div>
            <div>
              <label htmlFor="sentimental-value" className="sr-only">Sentimental Value</label>
              <input
                id="sentimental-value"
                name="sentimental-value"
                type="text"
                value={sentimentalValue}
                onChange={(e) => setSentimentalValue(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#018C79] focus:border-[#018C79] focus:z-10 sm:text-sm"
                placeholder="Sentimental Value"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <label htmlFor="file-upload" className="w-full">
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
              <span 
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#018C79] hover:bg-[#016c5d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#018C79] cursor-pointer"
              >
                Upload Image
              </span>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#018C79] hover:bg-[#016c5d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#018C79]"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportLostItem;
