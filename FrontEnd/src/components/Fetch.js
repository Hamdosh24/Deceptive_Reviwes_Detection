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
import { useDispatch, useSelector } from "react-redux";
import ButtonAppBar from "./AppBar";
import img from "../images/banner-right-image.png";
import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";
import { sendData } from "../Store/DataSlice";

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

const Fetch = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const {
    loading,
    result,
    error: apiError,
  } = useSelector((state) => state.data);

  const handleChange = (event) => {
    setText(event.target.value);
    setError("");
  };

  const handleSubmit = () => {
    if (isUrl(text)) {
      dispatch(sendData(text));
      setError("");
    } else {
      setError("The URL is not correct");
    }
  };

  const renderContent = (data) => {
    if (Array.isArray(data)) {
      return data.map((item, index) => (
        <Typography key={index} sx={{ mt: 1 }}>
          {JSON.stringify(item)}
        </Typography>
      ));
    } else if (typeof data === "object" && data !== null) {
      return Object.keys(data).map((key) => (
        <Typography key={key} sx={{ mt: 1 }}>
          <strong>{key}:</strong> {JSON.stringify(data[key])}
        </Typography>
      ));
    } else {
      return <Typography sx={{ mt: 1 }}>{JSON.stringify(data)}</Typography>;
    }
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
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: "14%",
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
                Do you want to fetch Data from a website?
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
              alt="Banner"
            />
          </Box>

          <StyledTextField
            error={!!error || !!apiError}
            helperText={error || apiError || "Please enter your URL"}
            id="demo-helper-text-misaligned"
            label="URL"
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
                  onClick={handleSubmit}
                />
              ),
            }}
          />
          {loading && <Typography sx={{ mt: 2 }}>Sending...</Typography>}
          {result && (
            <Box sx={{ mt: 2, width: "100%" }}>{renderContent(result)}</Box>
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

export default Fetch;
