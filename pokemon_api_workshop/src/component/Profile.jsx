import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DialogEdit from "./DialogEdit.jsx";
import Navbar from "./Navbar.jsx";

const Profile = () => {
  const { authData, signOut } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [ages, setAges] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignOut = () => {
    setSuccess(true);
    setTimeout(() => navigate("/"), 3000);
    signOut();
  };

  const covertAge = (ages) => {
    if (ages < 10) {
      return "baby";
    } else if (ages < 20) {
      return "child";
    } else if (ages < 30) {
      return "teenager";
    } else if (ages < 40) {
      return "adult";
    } else if (ages < 50) {
      return "senior";
    } else {
      return "old";
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/user/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setProfile(response.data);
          setAges(response.data.age);
        } catch (err) {
          if (err.response && err.response.status === 400) {
            // ถ้า token หมดอายุหรือไม่ถูกต้อง
            localStorage.removeItem("token"); // ลบ token
            navigate("/"); // เปลี่ยนเส้นทางไปที่หน้าโฮม
          } else {
            setError(
              err.response ? err.response.data.message : "An error occurred"
            );
          }
        } finally {
          setLoading(false);
        }
      } else {
        setError("No authentication token found ");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleProfileUpdate = (newUsername) => {
    setProfile((prevProfile) => ({ ...prevProfile, username: newUsername }));
  };

  if (loading) {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Navbar profile_navbar={profile} />
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
          <Typography variant="h4" gutterBottom>
            {profile.username ? profile.username : "-"}'s Profile
          </Typography>
          <Typography variant="h6">Email: {profile.email}</Typography>
          <Typography variant="h6">
            Phone: {profile.phone ? profile.phone : "-"}
          </Typography>
          <Typography variant="h6">Ages: {covertAge(ages) ?? "-"}</Typography>
          <Typography variant="h6">
            Height: {profile.height ? profile.height : "-"} cm
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDialogOpen(true)}
            >
              Edit Profile
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSignOut}
              sx={{ mt: 5 }}
            >
              LogOut
            </Button>
          </Box>
        </Box>
        <DialogEdit
          profile={profile}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onProfileUpdate={handleProfileUpdate}
        />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          key={"topcenter"}
        >
          <Alert onClose={() => setSuccess(false)} severity="success">
            Logout successful!
          </Alert>
        </Snackbar>
      </Container>

    </>
  );
};

export default Profile;
