import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Navbar from './components/Navbar';
import AdminSidebar from './components/AdminSidebar';
import Home from './pages/Home';
import ReportLostItem from './pages/ReportLostItem';
import ReportFoundItem from './pages/ReportFoundItem';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import LostItems from './pages/LostItems';
import FoundItems from './pages/FoundItems';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import AboutHelp from './pages/AboutHelp';
import ClaimedItems from './pages/ClaimedItems';

const App = () => {
  const [role, setRole] = useState(localStorage.getItem('role')); // Use state to manage role

  const handleLogin = (userRole) => {
    setRole(userRole); // Update role state
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setRole(null); // Reset role state on logout
  };

  const AdminLayout = ({ children }) => (
    <>
      <AdminSidebar onLogout={handleLogout} />
      <Container sx={{ ml: '240px', mt: 3 }}>{children}</Container>
    </>
  );

  const DefaultLayout = ({ children }) => (
    <>
      <Navbar onLogout={handleLogout} />
      <Container sx={{ mt: 3 }}>{children}</Container>
    </>
  );

  const LayoutSelector = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname === '/dashboard' && role === 'admin';

    return isAdminRoute ? (
      <AdminLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more admin-specific routes here */}
        </Routes>
      </AdminLayout>
    ) : (
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/report-lost-item" element={<ReportLostItem />} />
          <Route path="/report-found-item" element={<ReportFoundItem />} />
          <Route path="/claimed" element={<ClaimedItems />}/>
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/lost-items" element={<LostItems />} />
          <Route path="/found-items" element={<FoundItems />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about-help" element={<AboutHelp />} />
        </Routes>
      </DefaultLayout>
    );
  };

  return (
    <Router>
      <CssBaseline />
      <LayoutSelector />
    </Router>
  );
};

export default App;
