import React, { useState } from "react";
import {
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
import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";
import MainDash from "./MainDash";
import { Link } from "react-router-dom";

const AccountDash = () => {
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
      selector: (row) => row.fname,
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
      selector: (row) => row.lname,
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
      cell: (row) => (
        <Link
          to="/accounthistorydash"
          style={{ textDecoration: "none", color: "#757575" }}
        >
          {row.email}
        </Link>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      fname: "nour",
      lname: "alassad",
      email: "ascascsa@gmail.com",
    },
    {
      id: 2,
      fname: "asac",
      lname: "alagbgs",
      email: "ascvss@gmail.com",
    },
    {
      id: 3,
      fname: "saac",
      lname: "mymjtyy",
      email: "hthtrhrht@gmail.com",
    },
    {
      id: 4,
      fname: "kareem",
      lname: "qallash",
      email: "kareem@gmail.com",
    },
    {
      id: 5,
      fname: "hytyt",
      lname: "alashytytsad",
      email: "thrhtrhtrh@gmail.com",
    },
    {
      id: 6,
      fname: "jytyt",
      lname: "alanrttnssad",
      email: "rhthrhtr@gmail.com",
    },
    {
      id: 7,
      fname: "myuj",
      lname: "reegg",
      email: "grebvvj@gmail.com",
    },
    {
      id: 8,
      fname: "nrntr",
      lname: "rgbtr",
      email: "brtrrn@gmail.com",
    },
    {
      id: 9,
      fname: "hamdoush",
      lname: "ali",
      email: "dscasa@gmail.com",
    },
    {
      id: 10,
      fname: "dsds",
      lname: "vdsv",
      email: "vdsv@gmail.com",
    },
    {
      id: 11,
      fname: "vdsvsdv",
      lname: "vdsvsd",
      email: "vdsvds@gmail.com",
    },
    {
      id: 12,
      fname: "novdsvsdur",
      lname: "vsdv",
      email: "vdsvs@gmail.com",
    },
    {
      id: 13,
      fname: "vsdsdv",
      lname: "asas",
      email: "vdsvfb@gmail.com",
    },
    {
      id: 14,
      fname: "jytjyu",
      lname: "jytjtyj",
      email: "yjtjjyt@gmail.com",
    },
    {
      id: 15,
      fname: "noyhthur",
      lname: "trhtrht",
      email: "trhtrhr@gmail.com",
    },
    {
      id: 16,
      fname: "htrh",
      lname: "alashtrhsad",
      email: "hrtrhtrht@gmail.com",
    },
  ];

  const [records, setRecords] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchField, setSearchField] = useState("First Name");
  const [searchValue, setSearchValue] = useState("");

  function handleFilter(event) {
    const value = event.target.value;
    setSearchValue(value);
    const newData = data.filter((row) => {
      return row[searchField].toLowerCase().includes(value.toLowerCase());
    });
    setRecords(newData);
  }

  function handleDelete() {
    const newRecords = records.filter((row) => !selectedRows.includes(row));
    setRecords(newRecords);
    setSelectedRows([]);
  }

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
        <Box sx={{ mt: 9.5 }}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mb: 1, mt: 15 }}
          >
            <Typography>User Name History</Typography>
            <FormControl sx={{ mr: 2 }}>
              <Select
                labelId="search-field-label"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              >
                <MenuItem value="fname">First Name</MenuItem>
                <MenuItem value="lname">Last Name</MenuItem>
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