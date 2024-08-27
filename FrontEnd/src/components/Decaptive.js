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
import ButtonAppBar from "./AppBar";
import img from "../images/banner-right-image.png";
import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";
import { useDispatch, useSelector } from "react-redux";
import { sendTextOrUrl } from "../Store/DataSlice";

const StyledTextField = styled(TextField)({
  "& .MuiOutLinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
});

const Decaptive = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { loading, result, error } = useSelector((state) => state.data);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSend = () => {
    dispatch(sendTextOrUrl({ input: text }));
  };

  return (
    <>
      <ButtonAppBar />
      <CardMedia
        sx={{ position: "absolute", left: 0, top: 0 }}
        component="img"
        image={img1}
        style={{ width: "50vh" }}
        alt="Top Banner"
      />
      <Container>
        <Box
          container
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
                Do you want to discover the truth?
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 18,
                  mb: 3,
                  color: "#00000094",
                }}
              >
                Here you can enter your text or link from Amazon, Welcomesudi,
                Talabat to perform the detection process
              </Typography>
            </Box>
            <CardMedia
              component="img"
              image={img}
              style={{ width: "50vh" }}
              alt="Side Banner"
            />
          </Box>
          <StyledTextField
            id="demo-helper-text-misaligned"
            label="Text or URL"
            sx={{ width: "50%", mb: "20px" }}
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
                  onClick={handleSend}
                />
              ),
            }}
          />
          {loading && <Typography sx={{ mt: 2 }}>Sending...</Typography>}
          {result && (
            <Typography sx={{ mt: 2, color: "green" }}>
              Data fetched successfully: {JSON.stringify(result)}
            </Typography>
          )}
          {error && (
            <Typography sx={{ mt: 2, color: "red" }}>Error: {error}</Typography>
          )}
        </Box>
      </Container>
      <CardMedia
        sx={{ position: "fixed", bottom: 0, right: 0 }}
        component="img"
        image={img3}
        style={{ width: "35vh" }}
        alt="Bottom Banner"
      />
    </>
  );
};

export default Decaptive;
