import {
  Box,
  Button,
  CardMedia,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonAppBar from "./AppBar";
import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";
import { updateUser } from "../Store/UserSlice";

const Edit = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Password:", password);

    dispatch(updateUser({ firstName, lastName, password }));

    alert("Save Successfully");
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mt: "15%",
          }}
        >
          <Typography
            sx={{
              fontSize: 25,
              fontWeight: "bold",
              color: "#1976d2",
            }}
          >
            You can
          </Typography>
          <Typography
            sx={{ color: "#00000094", display: "flex", flexDirection: "row" }}
          >
            change your
            <Typography sx={{ fontWeight: "bold", ml: 1 }}>
              first name
            </Typography>
            <Typography sx={{ fontWeight: "bold", ml: 1, mr: 1 }}>
              last name
            </Typography>
            and your
            <Typography sx={{ fontWeight: "bold", ml: 1 }}>password</Typography>
          </Typography>
          <Box sx={{ mt: 5 }}>
            <TextField
              sx={{ mr: 20 }}
              id="firstName"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <TextField
              sx={{ mr: 20 }}
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              style={{ padding: "16px 92px" }}
              variant="contained"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </Box>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Container>
      <CardMedia
        sx={{ position: "fixed", bottom: 0, right: 0 }}
        component="img"
        image={img3}
        style={{ width: "35vh" }}
        alt="dcd"
      />
    </>
  );
};

export default Edit;
