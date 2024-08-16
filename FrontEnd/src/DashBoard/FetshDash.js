import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  styled,
  Typography,
  CardMedia,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import img from "../images/banner-right-image.png";

import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";
import MainDash from "./MainDash";

const StyledTextField = styled(TextField)({
  "& .MuiOutLinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
});

const isUrl = (string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?(www\\.)?([a-z0-9]+[.])+[a-z]{2,3}(\\/\\S*)?$",
    "i"
  );
  return pattern.test(string);
};

const handleSend = async (text) => {
  if (isUrl(text)) {
    console.log("Sending request to API with URL:", text);
  }
};

const FetshDash = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
    setError("");
  };

  const handleSubmit = () => {
    if (isUrl(text)) {
      handleSend(text);
      setError("");
    } else {
      setError("The Url is not correct");
    }
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: "10%",
            width: "100%",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              image={img}
              style={{ width: "40vh" }}
              alt="dcd"
            />
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 25,
                color: "#1976d2",
                "&:hover": {
                  color: "#ff9e43",
                },
              }}
            >
              Fetsh Data
            </Typography>
          </Box>
          <StyledTextField
            error={!!error}
            helperText={error ? error : "Please enter your Url"}
            id="demo-helper-text-misaligned"
            label="URL"
            sx={{ width: "50%", mb: 20, mt: 5 }}
            onChange={handleChange}
            value={text}
            InputProps={{
              endAdornment: (
                <SendIcon
                  sx={{
                    color: "#1976d2",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={handleSubmit}
                />
              ),
            }}
          />
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

export default FetshDash;

// {/* <List sx={{ width: "100%", mt: 4, bgcolor: "background.paper" }}>
//             <ListItem>
//               <ListItemAvatar>
//                 <Avatar alt="User" />
//               </ListItemAvatar>
//               <ListItemText
//                 primary="User Name"
//                 secondary={
//                   <Typography
//                     sx={{ display: "inline" }}
//                     component="span"
//                     variant="body2"
//                   >
//                     fvev cwdvew vw vdwvewvewv
//                   </Typography>
//                 }
//               />
//             </ListItem>
//             <Divider variant="inset" component="li" />
//             <ListItem>
//               <ListItemAvatar>
//                 <Avatar alt="User" />
//               </ListItemAvatar>
//               <ListItemText
//                 primary="User Name"
//                 secondary={
//                   <Typography
//                     sx={{ display: "inline" }}
//                     component="span"
//                     variant="body2"
//                   >
//                     fvev cwdvew vw vdwvewvewv
//                   </Typography>
//                 }
//               />
//             </ListItem>
//             <Divider variant="inset" component="li" />
//             <ListItem>
//               <ListItemAvatar>
//                 <Avatar alt="User" />
//               </ListItemAvatar>
//               <ListItemText
//                 primary="User Name"
//                 secondary={
//                   <Typography
//                     sx={{ display: "inline" }}
//                     component="span"
//                     variant="body2"
//                   >
//                     fvev cwdvew vw vdwvewvewv
//                   </Typography>
//                 }
//               />
//             </ListItem>
//             <Divider variant="inset" component="li" />
//             <ListItem>
//               <ListItemAvatar>
//                 <Avatar alt="User" />
//               </ListItemAvatar>
//               <ListItemText
//                 primary="User Name"
//                 secondary={
//                   <Typography
//                     sx={{ display: "inline" }}
//                     component="span"
//                     variant="body2"
//                   >
//                     fvev cwdvew vw vdwvewvewv
//                   </Typography>
//                 }
//               />
//             </ListItem>
//             <Divider variant="inset" component="li" />
//           </List> */}
