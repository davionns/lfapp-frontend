import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import api from '../api'; // Assume API calls will be set up later using BASE_URL

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Failed to fetch notifications.');
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Notifications
        </Typography>
        {notifications.length > 0 ? (
          <List>
            {notifications.map((notification) => (
              <ListItem key={notification.id}>
                <ListItemText primary={notification.message} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No notifications found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Notifications;
