import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin.jsx";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Snackbar,
  TextField,
} from "@mui/material";

const AdminTable = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectRows] = useState([]);
  const [openMultiDelete, setOpenMultiDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialog_add_admin, setOpenDialog_add_admin] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [add_success, setAdd_success] = useState(false);
  const navigate = useNavigate();

  const fetchTable = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin_use/get_admin_user");
      setData(response.data);
      console.log(response.data);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Invalid request");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTable();
  }, [navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/admin_use/delete_admin/${deleteId}`);
      setData(data.filter((item) => item.id !== deleteId));
      setDeleteId(null);
      setOpen(false);
      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRows.map((id) =>
          axios.delete(`http://localhost:5000/admin_use/delete_admin/${id}`)
        )
      );
      setData(data.filter((item) => !selectedRows.includes(item.id)));
      setOpenMultiDelete(false);
      setSuccess(true);
      setSelectedRows([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd_Admin = async () => {
    try {
      await axios.post("http://localhost:5000/admin_use/add_admin", {
        email,
        username,
        password,
        age,
        height,
        phone,
      });
      fetchTable();
      setAdd_success(true);
      handleClose_add();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose_add = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setAge("");
    setHeight("");
    setPhone("");
    setOpenDialog_add_admin(false);
  };

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const handleOpenMultiDeleteDialog = () => {
    setOpenMultiDelete(true);
  };
  const handleCloseMultiDeleteDialog = () => {
    setOpenMultiDelete(false);
  };
  const handleOpenDialog_add_admin = () => {
    setOpenDialog_add_admin(true);
  };
  const handleCloseDialog_add_admin = () => {
    setOpenDialog_add_admin(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "age", headerName: "Age", type: "number", width: 90 },
    { field: "height", headerName: "Height", type: "number", width: 90 },
    { field: "phone", headerName: "Phone", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleOpenDialog(params.id, params.row.username)}
        >
          Delete
        </Button>
      ),
    },
  ];
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <NavbarAdmin />
      <div
        style={{
          height: 600,
          width: "100%",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenMultiDeleteDialog}
          disabled={selectedRows.length === 0}
          style={{
            marginBottom: 15,
            alignItems: "strat",
            justifyContent: "start",
          }}
        >
          Delete Selected
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenDialog_add_admin}
          style={{
            marginLeft: 15,
            marginBottom: 15,
            alignItems: "strat",
            justifyContent: "start",
          }}
        >
          add admin
        </Button>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          selectedRows={selectedRows}
          onRowSelectionModelChange={(newSelection) => {
            setSelectRows(newSelection);
          }}
          sx={{
            "& .MuiDataGrid-root": {
              backgroundColor: "lightskyblue", // Change the background color
            },
            "& .MuiDataGrid-cell": {
              color: "white", // Change the text color
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "darkred", // Change the header background color
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "white", // Change the footer background color
            },
          }}
        />
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete ID:{deleteId} record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openMultiDelete}
          onClose={handleCloseMultiDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Delete All Selected?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete ID: {selectedRows + " "} record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMultiDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteSelected} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDialog_add_admin}
          onClose={handleCloseDialog_add_admin}
          aria-labelledby="add-admin-dialog-title"
          aria-describedby="add-admin-dialog-description"
        >
          <DialogTitle id="add-admin-dialog-title">Add New Admin</DialogTitle>
          <DialogContent>
            <DialogContentText id="add-admin-dialog-description">
              Please fill in the details to add a new admin user.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Height"
              type="number"
              fullWidth
              variant="outlined"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Phone"
              type="number"
              fullWidth
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose_add} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAdd_Admin} color="secondary" autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          key={"topcenter"}
        >
          <Alert onClose={() => setSuccess(false)} severity="success">
            Remove record successful!
          </Alert>
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={add_success}
          autoHideDuration={3000}
          onClose={() => setAdd_success(false)}
          key={"topcenter"}
        >
          <Alert onClose={() => setAdd_success(false)} severity="success">
            Add record successful!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default AdminTable;
