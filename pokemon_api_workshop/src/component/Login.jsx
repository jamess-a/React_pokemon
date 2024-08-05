import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/pokemon");
    }
  }, [navigate]);

  const handleRegister = async (event) => {
    navigate("/register");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setSuccess(true);
      setTimeout(() => navigate("/pokemon"), 3000);
    } catch (err) {
      setError("Invalid credentials");
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
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, marginLeft: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        key={"topcenter"}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Login successful!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;
