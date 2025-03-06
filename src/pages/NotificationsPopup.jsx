import React, { useState, useEffect } from 'react';
import { IconButton, Badge, Menu, MenuItem, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import api from '../api'; // Import API for making requests

const NotificationsPopup = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get(`/notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await api.put(`/notifications/read/${notificationId}`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.id === notificationId ? { ...n, status: 'read' } : n
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={notifications.filter((n) => n.status === 'unread').length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <Typography variant="body2" color={notification.status === 'unread' ? 'primary' : 'inherit'}>
                {notification.message}
              </Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Typography variant="body2">No notifications</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default NotificationsPopup;
