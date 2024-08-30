import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { HomeOutlined } from "@mui/icons-material";
import Sidebar from "./Account";
import { Navigate } from "react-router-dom";

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
            <Button
              variant="text"
              sx={{ color: "white" }}
              onClick={() => Navigate("/user")}
            >
              <HomeOutlined sx={{ ml: "2px" }} />
              Home
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
