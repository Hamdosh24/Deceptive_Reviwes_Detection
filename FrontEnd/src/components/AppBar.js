import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { HomeOutlined } from "@mui/icons-material";
import Sidebar from "./Account";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box>
            <Sidebar />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Box>
            <Link to="/">
              <Button variant="text" sx={{ color: "white" }}>
                <HomeOutlined sx={{ ml: "2px" }} />
                Home
              </Button>
            </Link>
          </Box>
          <Box>
            <Link to="/sign-in">
              <Button variant="text" sx={{ color: "white" }}>
                <AccountCircleIcon sx={{ ml: "2px" }} />
                Login
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
