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
} from "@mui/material";


const AdminTable = (widthsize) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectRows] = useState([]);
  const [openMultiDelete, setOpenMultiDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin_use/admin"
        );
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

    fetchTable();
  }, [navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/admin_use/admin/${deleteId}`);
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
          axios.delete(`http://localhost:5000/admin_use/admin/${id}`)
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
      <div style={{ height: 600, width: "100%", marginTop: "50px" , marginBottom: "50px" }}>
        <Button 
          variant="contained"
          color="secondary"
          onClick={handleOpenMultiDeleteDialog}
          disabled={selectedRows.length === 0}
          style={{ marginBottom: 15 , alignItems: "strat", justifyContent: "start" }}
        >
          Delete Selected
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
      </div>
    </>
  );
};

export default AdminTable;
