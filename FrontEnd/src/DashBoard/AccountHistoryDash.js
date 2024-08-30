import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  Container,
  FormControl,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";
import MainDash from "./MainDash";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUserHistories,
  deleteUserHistoryAdmin,
} from "../Store/UserHistoryAdmin";
const HistoryDash = () => {
  const dispatch = useDispatch();
  const {
    data: records,
    loading,
    error,
  } = useSelector((state) => state.user_history_admin);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchField, setSearchField] = useState("email");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchAllUserHistories());
  }, [dispatch]);

  const handleFilter = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const filteredRecords = records.filter((row) =>
    row[searchField]?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDelete = () => {
    selectedRows.forEach((row) => {
      dispatch(deleteUserHistoryAdmin(row.id));
    });
    setSelectedRows([]);
  };

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

  const columns = [
    { name: "First Name", selector: "fname", sortable: true },
    { name: "Last Name", selector: "lname", sortable: true },
    { name: "Email", selector: "email", sortable: true },
    { name: "Process", selector: "process", sortable: true },
    { name: "Type", selector: "type", sortable: true },
    { name: "Input", selector: "input", sortable: true },
  ];

  return (
    <>
      <MainDash />
      <CardMedia
        sx={{ position: "absolute", left: 0, top: 0 }}
        component="img"
        image={img1}
        style={{ width: "50vh" }}
        alt="decorative"
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
                  labelId="search-field-label"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                >
                  <MenuItem value="fname">First Name</MenuItem>
                  <MenuItem value="lname">Last Name</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="process">Process</MenuItem>
                  <MenuItem value="type">Type</MenuItem>
                  <MenuItem value="input">Input</MenuItem>
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                sx={{ ml: 2 }}
                disabled={selectedRows.length === 0}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </Box>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <DataTable
              columns={columns}
              data={filteredRecords}
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
        alt="decorative"
      />
    </>
  );
};

export default HistoryDash;
