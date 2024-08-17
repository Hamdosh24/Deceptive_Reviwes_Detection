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

const HistoryDash = () => {
  const columns = [
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
    },
    {
      name: (
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Process
        </Typography>
      ),
      selector: (row) => row.process,
    },
    {
      name: (
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Type
        </Typography>
      ),
      selector: (row) => row.type,
    },
    {
      name: (
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", color: "#1976d2" }}
        >
          input
        </Typography>
      ),
      selector: (row) => row.input,
    },
  ];

  const data = [
    {
      id: 1,
      fname: "ahmad",
      lname: "sdadsd",
      email: "sacassa@gmail.com",
      process: "Decaptive",
      type: "text",
      input: "is the sun beautifull",
    },
    {
      id: 2,
      fname: "asa",
      lname: "frgre",
      email: "freferfer@gmail.com",
      process: "fetch data",
      type: "url",
      input: "https://www.youtube.com/watch?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 3,
      fname: "frefre",
      lname: "gregw",
      email: "efrwfw@gmail.com",
      process: "Decaptive",
      type: "text",
      input: "I Like my university",
    },
    {
      id: 4,
      fname: "fehwfewsf",
      lname: "ythtyh",
      email: "hytnyt@gmail.com",
      process: "fetch data",
      type: "url",
      input: "https://www.youtube.com/?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 5,
      fname: "thtyhjnytj",
      lname: "trhth",
      email: "ythnty@gmail.com",
      process: "Decaptive",
      type: "text",
      input: "I hate my university",
    },
    {
      id: 6,
      fname: "myumjy",
      lname: "jtyt",
      email: "hrthtr@gmail.com",
      process: "Decaptive",
      type: "url",
      input: "https://www.youtube.com/watch?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 7,
      fname: "thrhth",
      lname: "htrht",
      email: "htrhtr@gmail.com",
      process: "Decaptive",
      type: "text",
      input: "I Like my university",
    },
    {
      id: 8,
      fname: "hrt",
      lname: "verv",
      email: "wfew@gmail.com",
      process: "Decaptive",
      type: "url",
      input:
        "httsvdvsvps://www.ysvsvsdvsvsdvdsvsoutube.com/?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 9,
      fname: "csacsa",
      lname: "dsv dsvds",
      email: "vdsvdsv@gmail.com",
      process: "Decaptive",
      type: "text",
      input: "I hatesv vsdvvsgngh jmhjyjuhnt  my university",
    },
    {
      id: 10,
      fname: "vdsvsvd",
      lname: "svdsvtfr",
      email: "sacassa@gmail.com",
      process: "fetch data",
      type: "url",
      input: "https:svsdvsvd//www.youvdsvsvtube.com/watch?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 11,
      fname: "egregtrh",
      lname: "gregre",
      email: "sacassa@gmail.com",
      process: "Decaptive",
      type: "text",
      input: "I Like my university",
    },
    {
      id: 12,
      fname: "jnytjyt",
      lname: "jytyhn",
      email: "hnythhr@gmail.com",
      process: "fetch data",
      type: "url",
      input:
        "https svds s://vdsvsdvdsv dsv svdvsvsdvsdvdsvswww.youtube.com/?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 13,
      fname: "tnytn",
      lname: "nytny",
      email: "nytny@gmail.com",
      process: "Decaptive",
      type: "text",
      input: "I havvsdvs sdvdsv svdsv sv cvfbg n v hgmnte my university",
    },
    {
      id: 14,
      fname: "nytn",
      lname: "nytnyt",
      email: "ntnytn@gmail.com",
      process: "Decaptive",
      type: "text",
      input: "I Like my u dsdvds svds scvsd sniversity",
    },
    {
      id: 15,
      fname: "trnytnytt",
      lname: "vrever",
      email: "nytn@gmail.com",
      process: "fetch data",
      type: "url",
      input: "sf vsdsvsvsse.com/?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 16,
      fname: "sacasc",
      lname: "cwefcw",
      email: "vrwgver@gmail.com",
      process: "Decaptive",
      type: "text",
      input: "I havdsvdsdste myvdsv svd svdsv univvdsersity",
    },
  ];

  const [records, setRecords] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchField, setSearchField] = useState("email");
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

export default HistoryDash;