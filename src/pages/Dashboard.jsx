import React, { useEffect, useState } from 'react';
import { 
  LayoutGrid, 
  Users, 
  X, 
  Check 
} from 'lucide-react';
import api from '../api';

const AdminPanel = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [reportedItems, setReportedItems] = useState([]);
  const [foundItemsCount, setFoundItemsCount] = useState(0);
  const [lostItemsCount, setLostItemsCount] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchReportedItems();
    fetchStatistics();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchReportedItems = async () => {
    try {
      const response = await api.get('/lost-items/admin');
      setReportedItems(response.data);
    } catch (error) {
      console.error('Error fetching reported items:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await api.get('/lost-items/statistics');
      setFoundItemsCount(response.data.foundItemsCount);
      setLostItemsCount(response.data.lostItemsCount);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleApproveUser = async (userId) => {
    try {
      await api.put(`/users/approve/${userId}`);
      alert('User approved successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      alert('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleApproveItem = async (itemId) => {
    try {
      await api.put(`/lost-items/approve/${itemId}`);
      alert('Item approved successfully!');
      fetchReportedItems();
    } catch (error) {
      console.error('Error approving item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await api.delete(`/lost-items/${itemId}`);
      alert('Item deleted successfully!');
      fetchReportedItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleMarkAsFound = async (itemId) => {
    try {
      await api.put(`/lost-items/mark-as-found/${itemId}`);
      alert('Item marked as found!');
      fetchReportedItems();
      fetchStatistics();
    } catch (error) {
      console.error('Error marking item as found:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Lost Items</h3>
          <p className="text-2xl font-bold text-gray-700">{lostItemsCount}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Found Items</h3>
          <p className="text-2xl font-bold text-gray-700">{foundItemsCount}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${tabIndex === 0 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setTabIndex(0)}
        >
          User Management
        </button>
        <button
          className={`px-4 py-2 ${tabIndex === 1 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setTabIndex(1)}
        >
          Reported Items
        </button>
      </div>

      {/* User Management Table */}
      {tabIndex === 0 && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Student ID</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.student_id}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => handleApproveUser(user.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reported Items Table */}
      {tabIndex === 1 && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportedItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.description}</td>
                  <td className="px-4 py-3">{item.location}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => handleApproveItem(item.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Delete
                    </button>
                    <button 
                      onClick={() => handleMarkAsFound(item.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Mark as Found
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;