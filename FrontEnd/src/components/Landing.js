import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import ButtonAppBar from "./AppBar";
import img2 from "../images/img2.png";
import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";

const LandingPage = () => {
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
      <Container >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "10%",
            width: "100%",
          }}
        >
          <Grid item sx={{ width: "50%" }}>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "35px", color: "#1976d2" }}
            >
              Welcome in Our Website !!
            </Typography>
            <Typography sx={{ color: "#7b7070", mt: "30px" }}>
              "Welcome to our website! Here, we utilize artificial intelligence
              to help you detect deceptive speech and distinguish it from
              genuine comments. We also offer an amazing service that allows you
              to fetch reviews from various websites and display them in a
              straightforward manner by simply entering the link of the product
              or post you want to explore. Join us and enjoy a unique experience
              that enhances your ability to make informed decisions!"
            </Typography>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                left: "0",
                alignItems: "center",
                mt: "10%",
                width: "100%",
              }}
            >
              <Link to="/main">
                <Button variant="contained" sx={{ mr: "50px" }}>
                  Decaptive
                </Button>
              </Link>
              <Link to="/fetch">
                <Button variant="outlined">Fetch Data</Button>
              </Link>
            </Grid>
          </Grid>
          <Grid>
            <CardMedia
              component="img"
              image={img2}
              style={{ width: "650px", height: "100%" }}
              alt="dcd"
            />
          </Grid>
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

export default LandingPage;
