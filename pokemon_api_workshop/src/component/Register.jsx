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
  Icon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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

    if (!email || !password || !username || !ages || !phone || !height) {
      setError("Please fill in all fields");
      return;
    }
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
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 10 , mt: 10 }}>
        New! User
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          mb: 2,
          alignItems: "start",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/login")}
        >
          Back
        </Button>
      </Box>
      <Card
        sx={{ maxWidth: 500, width: "100%", borderRadius: 2, boxShadow: 3 }}
      >
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
                  required={true}
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
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={username}
                  required={true}
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
                  required={true}
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
                  required={true}
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
                  required={true}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, width: "100%" }}
            >
              Register
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
