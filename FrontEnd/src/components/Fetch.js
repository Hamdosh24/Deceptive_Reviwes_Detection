import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  styled,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  List,
  CardMedia,
} from "@mui/material";
import ButtonAppBar from "./AppBar";
import SendIcon from "@mui/icons-material/Send";
import img from "../images/banner-right-image.png";

import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";

const StyledTextField = styled(TextField)({
  "& .MuiOutLinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
});
const handleSend = (text) => {
  console.log(text);
};

const Fetch = () => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
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
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 22,
                  mb: 3,
                  color: "#1976d2",
                }}
              >
                Do you want to fetch Data from website ?
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 18,
                  mb: 3,
                  color: "#00000094",
                }}
              >
                Here you can enter your link from Amazon, Welcomesudi, Talabat
                to fetch data
              </Typography>
            </Box>
            <CardMedia
              component="img"
              image={img}
              style={{ width: "50vh" }}
              alt="dcd"
            />
          </Box>
          <StyledTextField
            helperText="Please enter your Url"
            id="demo-helper-text-misaligned"
            label="Url"
            sx={{ width: "50%", mb: "20px" }}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <SendIcon
                  sx={{
                    color: "#1976d2",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleSend(text)}
                />
              ),
            }}
          />
          {/* <List sx={{ width: "100%", mt: 4, bgcolor: "background.paper" }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="User" />
              </ListItemAvatar>
              <ListItemText
                primary="User Name"
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                  >
                    fvev cwdvew vw vdwvewvewv
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="User" />
              </ListItemAvatar>
              <ListItemText
                primary="User Name"
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                  >
                    fvev cwdvew vw vdwvewvewv
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="User" />
              </ListItemAvatar>
              <ListItemText
                primary="User Name"
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                  >
                    fvev cwdvew vw vdwvewvewv
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="User" />
              </ListItemAvatar>
              <ListItemText
                primary="User Name"
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                  >
                    fvev cwdvew vw vdwvewvewv
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List> */}
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

export default Fetch;
