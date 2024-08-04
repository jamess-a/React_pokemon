import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, Box, CircularProgress, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { authData, signOut } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // ดึง token จาก localStorage

      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/user/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfile(response.data);
        } catch (err) {
          setError(err.response ? err.response.data : 'An error occurred');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No authentication token found');
        setLoading(false);
      }
    };

    fetchProfile(); 
  }, []); 

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '10vh' }}>
        <Typography variant="h4" gutterBottom>
          {profile.email}'s Profile
        </Typography>
        <Typography variant="h6">Email: {profile.email}</Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={() => console.log('Edit Profile')}>
            Edit Profile
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleSignOut} sx={{ mt: 5 }}>
            Sign Out
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
