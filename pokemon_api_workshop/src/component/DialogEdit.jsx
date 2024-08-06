import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const DialogEdit = ({ profile, open, onClose, onProfileUpdate }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [error, setError] = useState("");

  const handleClickOpen = () => {
    setInternalOpen(true);
  };

  const handleClose = () => {

    setInternalOpen(false);
    onClose(); // call onClose when the Dialog is closed
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/user/edit/${profile.id}`,
        {
          newuser: username,
        }
      );
      onProfileUpdate(username);
      setSuccess(true);
      setTimeout(() => handleClose(), 4000);
     // close the dialog on successful submission
    } catch (err) {
      console.error("edit profile error:", err.response?.data || err.message);
      setError("Edit profile failed");
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit, // directly use handleSubmit
        }}
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component="span">
              Username: {profile.username}
            </Typography>
            <br />
            <Typography component="span">Email: {profile.email}</Typography>
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="newuser"
            label="New Username"
            type="text"
            fullWidth
            variant="standard"
            value={username} // bind value to state
            onChange={(e) => setUsername(e.target.value)} // update state on change
          />
        </DialogContent>
        {error && <Typography style={{ color: "red" }}>{error}</Typography>}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
        >
          <Alert onClose={() => setSuccess(false)} severity="success">
            Edit successful!
          </Alert>
        </Snackbar>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogEdit;
