import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import React from "react";
import WelcomeBar from "./WelcomeBar";
import image from "../images/banner.png";
import image1 from "../images/landing.jpeg";
import { useNavigate } from "react-router-dom";

const MainLanding = () => {
  const navigate = useNavigate();

  return (
    <>
      <WelcomeBar />
      <CardMedia
        disableGutters
        sx={{ mt: 8, height: 200 }}
        component="img"
        image={image}
        alt=""
      />

      <Box sx={{ background: "#81808033" }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
            }}
          >
            <Typography
              paragraph
              sx={{
                mt: 10,
                fontWeight: "bold",
                fontSize: "45px",
                color: "black",
              }}
            >
              Arabic Decaptive Review Detection
            </Typography>
            <Typography paragraph sx={{ width: "50%", fontSize: "20px" }}>
              Welcome to our website, where we specialize in detecting fake
              comments using artificial intelligence!
            </Typography>
            <Typography paragraph sx={{ fontSize: "20px", margin: "auto" }}>
              In today’s digital age, where information reigns supreme, it has
              become essential to verify the authenticity of comments and
              reviews we encounter whether on social media platforms or
              e-commerce sites.
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 10,
                mb: 10,
                fontSize: 15,
                borderRadius: 25,
                paddingX: 10,
                textDecoration: "none",
              }}
              onClick={() => navigate("/sign-in")}
            >
              Try it
            </Button>
          </Box>
        </Container>
      </Box>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          disableGutters
          component="img"
          image={image1}
          alt=""
          sx={{ width: "100%", height: 400 }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
      </Box>
      <Box sx={{ background: "#81808033" }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              textAlign: "center",
            }}
          >
            <CardMedia
              disableGutters
              component="img"
              alt=""
              sx={{ mt: 20, width: 250, height: 250 }}
            />
            <Typography sx={{ width: "60%" }}>
              The counterfeit comment detection service utilizes advanced text
              analysis techniques to identify misleading or false content,
              helping users make informed decisions and understand the true
              sources of information.
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              textAlign: "center",
            }}
          >
            <Typography sx={{ width: "60%" }}>
              The comment fetching service from websites allows users to
              retrieve and analyze customer opinions and feedback from various
              web pages, helping to understand reactions and improve products
              and services.
            </Typography>
            <CardMedia
              disableGutters
              component="img"
              alt=""
              sx={{ width: 250, height: 250 }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MainLanding;
