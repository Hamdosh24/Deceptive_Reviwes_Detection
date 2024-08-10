import { Box, CardMedia, Container, Typography } from "@mui/material";
import React from "react";
import WelcomeBar from "./WelcomeBar";
import image from "../images/banner.png";

const MainLanding = () => {
  return (
    <>
      <WelcomeBar />
      <Container>
        <Box sx={{ mt: 15 }}>
          <Typography>welcome</Typography>
        </Box>
      </Container>
      <CardMedia
        disableGutters
        sx={{ mt: 8 }}
        component="img"
        image={image}
        alt=""
      />
      <Container>welcome</Container>
    </>
  );
};

export default MainLanding;
