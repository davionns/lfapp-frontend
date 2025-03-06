import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Lost & Found Tracker
        </Typography>
        <Typography variant="body1" paragraph>
          This application helps you report lost and found items easily. If you have lost or found an item, please use the appropriate pages to report it.
        </Typography>
        <Typography variant="body1">
          Log in as a student or admin to get started!
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
