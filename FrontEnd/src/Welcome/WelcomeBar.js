import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const pages = ["Decaptive", "Fetch Data", "About", "Let's Start"];

function WelcomeBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" sx={{ color: "white", background: "#1976d2" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button
              key="Decaptive"
              onClick={() => navigate("/sign-in")}
              sx={{
                my: 2,
                mx: 2,
                display: "block",
                color: "white",
                fontWeight: 300,
                fontSize: 15,
                "&:hover": {
                  color: "black",
                },
              }}
            >
              Decaptive
            </Button>
            <Button
              onClick={() => navigate("/sign-in")}
              key="Fetch Data"
              sx={{
                my: 2,
                mx: 2,
                display: "block",
                color: "white",
                fontWeight: 300,
                fontSize: 15,
                "&:hover": {
                  color: "black",
                },
              }}
            >
              Fetch Data
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              onClick={() => navigate("/")}
              variant="h4"
              noWrap
              component="a"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "Roboto Slab",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                color: "white",
              }}
            >
              ADRD
            </Typography>
            <Typography
              sx={{
                display: { xs: "none", md: "flex" },
                fontSize: "10px",
                color: "white",
              }}
            >
              Arabic Decaptive Review Detection
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) =>
                page === "Let's Start" ? (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/sign-in")}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
          <Typography
            onClick={() => navigate("/sign-in")}
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              fontFamily: "Roboto Slab",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: "white",
            }}
          >
            ADRD
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/sign-in");
              }}
              key="About"
              sx={{
                my: 2,
                mx: 2,
                display: "block",
                color: "white",
                fontWeight: 300,
                fontSize: 15,
                "&:hover": {
                  color: "black",
                },
              }}
            >
              About
            </Button>
            <Button
              key="About"
              onClick={() => {
                handleCloseNavMenu();
                navigate("/sign-in");
              }}
              sx={{
                textDecoration: "none",
                my: 2,
                mx: 2,
                display: "block",
                color: "white",
                fontWeight: 300,
                fontSize: 15,
                "&:hover": {
                  color: "black",
                },
              }}
            >
              Let's Start
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default WelcomeBar;
