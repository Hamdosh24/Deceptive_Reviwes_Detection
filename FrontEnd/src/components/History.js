import React, { useEffect, useState } from "react";
import {
  Box,
  CardMedia,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import ButtonAppBar from "./AppBar";
import DataTable from "react-data-table-component";
import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";
import { useDispatch, useSelector } from "react-redux";
import { UserHistory } from "../Store/UserHistory";

const History = () => {
  const dispatch = useDispatch();
  const {
    data: records,
    loading,
    error,
  } = useSelector((state) => state.user_history);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    dispatch(UserHistory());
  }, [dispatch]);

  useEffect(() => {
    setFilteredRecords(records || []);
  }, [records]);

  const handleFilter = (event) => {
    const searchText = event.target.value.toLowerCase();
    const newData = records.filter((row) => {
      return (
        row.process.toLowerCase().includes(searchText) ||
        row.type.toLowerCase().includes(searchText) ||
        (row.url && row.url.toLowerCase().includes(searchText)) ||
        row.text.toLowerCase().includes(searchText) ||
        row.createdAt.toLowerCase().includes(searchText)
      );
    });
    setFilteredRecords(newData);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Process",
      selector: (row) => row.process,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Input",
      selector: (row) => {
        if (row.text && row.url) {
          return `${row.text} | ${row.url}`;
        } else if (row.text) {
          return row.text;
        } else if (row.url) {
          return row.url;
        } else {
          return "No Input Available";
        }
      },
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
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
      <ButtonAppBar />
      <CardMedia
        sx={{ position: "absolute", left: 0, top: 0 }}
        component="img"
        image={img1}
        style={{ width: "50vh" }}
        alt="dcd"
      />
      <Container>
        <Box sx={{ mt: 9.5 }}>
          {loading && <Typography>Loading data...</Typography>}
          {error && <Typography color="error">Error: {error}</Typography>}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <TextField
              onChange={handleFilter}
              id="standard-basic"
              label="Search"
              variant="standard"
              disabled={loading}
            />
          </Box>
          <DataTable
            columns={columns}
            data={filteredRecords}
            selectableRows
            fixedHeader
            pagination
            customStyles={customStyles}
          />
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

export default History;
