import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useState } from "react";

const pages = ["Decaptive", "Fetch Data", "About", "Let's Start"];

function WelcomeBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // sx={{ background: "white", color: "#1976d2" }}

  return (
    <AppBar position="fixed" sx={{ color: "white", background: "#1976d2" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* the button befor the logo  */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Link to="/sign-in" style={{ textDecoration: "none" }}>
              <Button
                key="Decaptive"
                // onClick={handleCloseNavMenu}
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
            </Link>
            <Link to="/sign-in" style={{ textDecoration: "none" }}>
              <Button
                key="Fetch Data"
                onClick={handleCloseNavMenu}
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
            </Link>
          </Box>
          {/* the logo for big device  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
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
            </Link>
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
          {/* list icon for small device */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
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
                    <Link
                      to="/sign-in"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
          {/* the logo for small device */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexDirection: "row",
                justifyContent: "center",
                alignItem: "center",
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
          </Link>{" "}
          {/* the list of Button for larg device  */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Link to="/sign-in" style={{ textDecoration: "none" }}>
              <Button
                key="About"
                onClick={handleCloseNavMenu}
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
            </Link>
            <Link to="/sign-in" style={{ textDecoration: "none" }}>
              <Button
                key="About"
                onClick={handleCloseNavMenu}
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
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default WelcomeBar;
