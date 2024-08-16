import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Alert,
  styled,
  Typography,
  CardMedia,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
    console.log(" _2_ Sending your request to API(URL):", text);
  } else {
    console.log("_1_ Sending your request to API (text):", text);
  }
};

const DecaptiveDash = () => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
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
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Box sx={{ width: "50%" }}>
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
            </Box> */}
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
              Decaptive
            </Typography>
          </Box>
          <StyledTextField
            id="demo-helper-text-misaligned"
            helperText="Enter text or url"
            label="Text or Url"
            sx={{ width: "50%", mb: 20, mt: 5 }}
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

export default DecaptiveDash;

//  {/* the sentance is non fake */}
//    <Box
//    sx={{
//      display: "flex",
//      justifyContent: "center",
//      alignItems: "center",
//      width: "50%",
//      mt: "10px",
//    }}
//  >
//    <Alert
//      sx={{ textAlign: "right" }}
//      iconMapping={{
//        success: <CheckCircleOutlineIcon fontSize="inherit" />,
//      }}
//    >
//      The sun is very nice bbjvdskdn nvkdnsvdskv nnsdjvsjdv n ndnsovids
//      njdsvbsjvbbjs cdbsjbvi vsbvidvi hcds vsvsvsdvv
//    </Alert>
//  </Box>
//  {/* the sentance is Fake  */}
// {/* <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               width: "50%",
//               mt: "10px",
//             }}
//           >
//             <Alert
//               // variant="outlined"
//               severity="error"
//               sx={{
//                 textAlign: "right",
//                 borderTopRightRadius: "4px",
//                 borderBottomRightRadius: "4px",
//                 borderTopLeftRadius: 0,
//                 borderBottomLeftRadius: 0,
//               }}
//             >
//               The sun is very nice bbjvdskdn nvkdnsvdskv nnsdjvsjdv n ndnsovids
//               njdsvbsjvbbjs cdbsjbvi vsbvidvi hcds vsvsvsdvv
//             </Alert>
//           </Box> */}
