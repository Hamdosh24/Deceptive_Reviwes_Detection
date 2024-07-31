import React, { useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import ButtonAppBar from "./AppBar";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";

const History = () => {
  const columns = [
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
          your input
        </Typography>
      ),
      selector: (row) => row.input,
    },
  ];

  const data = [
    {
      id: 1,
      process: "Decaptive",
      type: "text",
      input: "is the sun beautifull",
    },
    {
      id: 2,
      process: "fetch data",
      type: "url",
      input: "https://www.youtube.com/watch?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 3,
      process: "Decaptive",
      type: "text",
      input: "I Like my university",
    },
    {
      id: 4,
      process: "fetch data",
      type: "url",
      input: "https://www.youtube.com/?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 5,
      process: "Decaptive",
      type: "text",
      input: "I hate my university",
    },
    {
      id: 6,
      process: "Decaptive",
      type: "url",
      input: "https://www.youtube.com/watch?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 7,
      process: "Decaptive",
      type: "text",
      input: "I Like my university",
    },
    {
      id: 8,
      process: "Decaptive",
      type: "url",
      input:
        "httsvdvsvps://www.ysvsvsdvsvsdvdsvsoutube.com/?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 9,
      process: "Decaptive",
      type: "text",
      input: "I hatesv vsdvvsgngh jmhjyjuhnt  my university",
    },
    {
      id: 10,
      process: "fetch data",
      type: "url",
      input: "https:svsdvsvd//www.youvdsvsvtube.com/watch?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 11,
      process: "Decaptive",
      type: "text",
      input: "I Like my university",
    },
    {
      id: 12,
      process: "fetch data",
      type: "url",
      input:
        "https svds s://vdsvsdvdsv dsv svdvsvsdvsdvdsvswww.youtube.com/?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 13,
      process: "Decaptive",
      type: "text",
      input: "I havvsdvs sdvdsv svdsv sv cvfbg n v hgmnte my university",
    },
    {
      id: 14,
      process: "Decaptive",
      type: "text",
      input: "I Like my u dsdvds svds scvsd sniversity",
    },
    {
      id: 15,
      process: "fetch data",
      type: "url",
      input: "sf vsdsvsvsse.com/?v=3oHUtG0cjfY&t=151s",
    },
    {
      id: 16,
      process: "Decaptive",
      type: "text",
      input: "I havdsvdsdste myvdsv svd svdsv univvdsersity",
    },
  ];

  const [records, setRecords] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);

  function handleFilter(event) {
    const newData = data.filter((row) => {
      return row.input.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  function handleDelete() {
    const newRecords = records.filter((row) => !selectedRows.includes(row));
    setRecords(newRecords);
    setSelectedRows([]); // إعادة تعيين الصفوف المحددة بعد الحذف
  }

  const customStyles = {
    rows: {
      style: {
        fontSize: "16px", // حجم الخط
        fontFamily: "Arial, sans-serif", // نوع الخط
      },
    },
    headCells: {
      style: {
        fontSize: "18px", // حجم الخط لعنوان الأعمدة
        fontFamily: "Arial, sans-serif", // نوع الخط لعنوان الأعمدة
        fontWeight: "bold", // جعل الخط عريض
        color: "#1976d2", // لون الخط
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
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <TextField
              onChange={handleFilter}
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

export default History;
