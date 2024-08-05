// src/components/Register.jsx
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [ages, setAges] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [height, setHeight] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        email,
        password,
        username,
        ages,
        phone,
        height,
      });
      localStorage.setItem("token", response.data.token);
      setSuccess(true);
      setTimeout(() => navigate("/pokemon"), 3000);
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError("Registration failed");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ maxWidth: 500, width: '100%', borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center">
              Register
            </Typography>
            <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Phone Number"
                    type="tel"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Ages"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={ages}
                    onChange={(e) => setAges(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Height"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </Grid>
              </Grid>
              {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2, width: '100%' }}
              >
                Register
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Registration successful!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Register;
