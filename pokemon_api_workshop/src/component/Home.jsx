// src/components/Home.jsx
import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Profile from './Profile';

function Home() {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Our Pokémon App
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>
              Login
            </Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="secondary">
              Register
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
