import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png'; // Assuming logo is in assets folder

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/users/register', { name, email, password, role });
      navigate('/login');
    } catch (err) {
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid 
        container 
        spacing={0} 
        alignItems="center" 
        justifyContent="center" 
        sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #018C79 0%, #00635D 100%)' }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Paper 
            elevation={12} 
            sx={{ 
              borderRadius: 4, 
              overflow: 'hidden', 
              boxShadow: '0 16px 40px rgba(0,0,0,0.2)' 
            }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                p: 4, 
                backgroundColor: 'white' 
              }}
            >
              <img 
                src={Logo} 
                alt="Company Logo" 
                style={{ 
                  width: 120, 
                  height: 120, 
                  marginBottom: 16, 
                  objectFit: 'contain' 
                }} 
              />
              
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#018C79', 
                  mb: 3, 
                  fontWeight: 'bold' 
                }}
              >
                Create Your Account
              </Typography>

              {error && (
                <Typography 
                  color="error" 
                  sx={{ mb: 2, textAlign: 'center' }}
                >
                  {error}
                </Typography>
              )}

              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#018C79',
                          },
                          '&:hover fieldset': {
                            borderColor: '#016A5A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#018C79',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#018C79',
                          },
                          '&:hover fieldset': {
                            borderColor: '#016A5A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#018C79',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#018C79',
                          },
                          '&:hover fieldset': {
                            borderColor: '#016A5A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#018C79',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: '#018C79',
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: '#016A5A',
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;