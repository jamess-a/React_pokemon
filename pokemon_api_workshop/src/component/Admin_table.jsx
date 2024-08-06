import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminTable = (widthsize) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "age", headerName: "Age", type: "number", width: 90 },
    { field: "height", headerName: "Height", type: "number", width: 90 },
    { field: "phone", headerName: "Phone", width: 130 },
  ];

  const rows = [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ height: 400, width: widthsize }}>
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
    </div>
  );
};

export default AdminTable;
