import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CardMedia,
  Container,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserAccounts, deleteUserAccount } from "../Store/AccountAdmin";
import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";
import MainDash from "./MainDash";

const AccountDash = () => {
  const dispatch = useDispatch();

  const {
    data: users,
    loading,
    error,
  } = useSelector((state) => state.user_accounts_admin);

  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchField, setSearchField] = useState("email");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchAllUserAccounts());
  }, [dispatch]);

  useEffect(() => {
    setRecords(users);
  }, [users]);

  function handleFilter(event) {
    const value = event.target.value;
    setSearchValue(value);
    const newData = users.filter((row) => {
      return row[searchField].toLowerCase().includes(value.toLowerCase());
    });
    setRecords(newData);
  }

  function handleDelete() {
    selectedRows.forEach((row) => {
      dispatch(deleteUserAccount(row.id));
    });
    setSelectedRows([]);
  }

  const columns = [
    {
      name: (
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Id
        </Typography>
      ),
      selector: (row) => row.id,
    },
    {
      name: (
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", color: "#1976d2" }}
        >
          First Name
        </Typography>
      ),
      selector: (row) => row.first_name,
    },
    {
      name: (
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Last Name
        </Typography>
      ),
      selector: (row) => row.last_name,
    },
    {
      name: (
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Email
        </Typography>
      ),
      selector: (row) => row.email,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        fontSize: "16px",
        fontFamily: "Arial, sans-serif",
      },
    },
    headCells: {
      style: {
        fontSize: "18px",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        color: "#1976d2",
      },
    },
  };

  return (
    <>
      <MainDash />
      <CardMedia
        sx={{ position: "absolute", left: 0, top: 0 }}
        component="img"
        image={img1}
        style={{ width: "50vh" }}
        alt="dcd"
      />
      <Container>
        <Box sx={{ mt: 8.5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <FormControl sx={{ mr: 2 }}>
                <Select
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                >
                  <MenuItem value="first_name">First Name</MenuItem>
                  <MenuItem value="last_name">Last Name</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                </Select>
              </FormControl>
              <TextField
                onChange={handleFilter}
                value={searchValue}
                id="standard-basic"
                label="Search"
                variant="standard"
              />
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              sx={{ ml: 2, display: "flex", justifyContent: "flex-end" }}
              disabled={selectedRows.length === 0}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <DataTable
              columns={columns}
              data={records}
              selectableRows
              onSelectedRowsChange={({ selectedRows }) => {
                setSelectedRows(selectedRows);
              }}
              fixedHeader
              pagination
              customStyles={customStyles}
            />
          )}
        </Box>
      </Container>
      <CardMedia
        sx={{ position: "fixed", bottom: 0, right: 0, zIndex: -1 }}
        component="img"
        image={img3}
        style={{ width: "35vh", height: "auto" }}
        alt="dcd"
      />
    </>
  );
};

export default AccountDash;
