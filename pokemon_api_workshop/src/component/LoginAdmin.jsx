import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GridRow } from "@mui/x-data-grid";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin5223");
    }
  }, [navigate]);

  const handleRegister = () => {
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
      setTimeout(() => navigate("/admin5223"), 3000);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ maxWidth: 400, width: "100%", p: 3 }}>
          <CardContent>
            <Grid>
              <LoginIcon fontSize="large" />
              <Typography variant="h5" component="div" gutterBottom>
                Login Admin
              </Typography>
            </Grid>
            <Divider sx={{ mb: 2 }} />
            <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
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
              {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
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
