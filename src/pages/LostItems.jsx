import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box,
  Chip,
  Paper
} from '@mui/material';
import { Search, LocationOn, LocalOffer } from '@mui/icons-material';
import api from '../api';

const LostItems = () => {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await api.get('/lost-items/search');
        setLostItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lost items:', error);
        setLoading(false);
      }
    };

    fetchLostItems();
  }, []);

  const primaryColor = '#018C79';

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          pb: 2,
          borderBottom: `2px solid ${primaryColor}`,
        }}
      >
        <Search sx={{ color: primaryColor, mr: 2, fontSize: 40 }} />
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 600, 
            color: primaryColor,
            backgroundImage: `linear-gradient(45deg, ${primaryColor}, #00695C)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Lost & Found Items
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Typography variant="h6" color="textSecondary">
            Loading lost items...
          </Typography>
        </Box>
      ) : lostItems.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Typography variant="h6" color="textSecondary">
            No lost items found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {lostItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card 
                elevation={6}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: `0 8px 20px rgba(1, 140, 121, 0.3)`
                  }
                }}
              >
                {item.image && (
                  <CardMedia
                    component="img"
                    height="220"
                    image={`data:image/jpeg;base64,${item.image}`}
                    alt={item.description}
                    sx={{
                      objectFit: 'cover',
                      filter: 'brightness(0.9)',
                      transition: 'filter 0.3s ease',
                      '&:hover': {
                        filter: 'brightness(1.1)'
                      }
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label={item.category} 
                      size="small" 
                      sx={{ 
                        backgroundColor: primaryColor, 
                        color: 'white',
                        fontWeight: 600
                      }} 
                    />
                    {item.reward_value && (
                      <Chip 
                        icon={<LocalOffer />} 
                        label={`Reward: rwf${item.reward_value}`} 
                        size="small" 
                        color="secondary"
                      />
                    )}
                  </Box>
                  
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {item.description}
                  </Typography>
                  
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 1, 
                      backgroundColor: 'rgba(1, 140, 121, 0.05)', 
                      borderColor: primaryColor 
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <LocationOn 
                        sx={{ 
                          color: primaryColor, 
                          fontSize: 18, 
                          mr: 1 
                        }} 
                      />
                      <Typography variant="body2" color="textSecondary">
                        {item.location}
                      </Typography>
                    </Box>
                    
                    {item.sentimental_value && (
                      <Typography 
                        variant="body2" 
                        color="textSecondary" 
                        sx={{ fontStyle: 'italic' }}
                      >
                        Sentimental Value: {item.sentimental_value}
                      </Typography>
                    )}
                  </Paper>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default LostItems;