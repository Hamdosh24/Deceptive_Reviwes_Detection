import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
// import InfoIcon from "@mui/icons-material/Info";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "#1976d2",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const userName = "Nour Alassad"; 

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          {...stringAvatar(userName)}
          sx={{
            bgcolor: "#1976d2",
            margin: 2,
            fontSize: 20,
            width: 60,
            height: 60,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>{userName}</Typography>
          <Link to="/edit">
            <Button startIcon={<EditIcon />} size="small" sx={{ marginTop: 1 }}>
              <Box>Edit</Box>
            </Button>
          </Link>
        </Box>
      </Box>
      <Divider />
      <List>
        {/* ////////////////////////////////////////////////////////////////////////// */}

        <Link to="/history" style={{ textDecoration: "none" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HistoryIcon sx={{ color: "#1976d2" }} />
              </ListItemIcon>
              <ListItemText
                primary="History"
                sx={{ color: "black", textDecoration: "none" }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        {/* ////////////////////////////////////////////////////////////////////////// */}

        {/* <Link to="/about" style={{ textDecoration: "none" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon
                  sx={{
                    color: "#1976d2",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="About"
                sx={{ color: "black", textDecoration: "none" }}
              />
            </ListItemButton>
          </ListItem>
        </Link> */}
        {/* ////////////////////////////////////////////////////////////////////////// */}

        <Link to="/feedback" style={{ textDecoration: "none" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FeedbackIcon
                  sx={{
                    color: "#1976d2",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="FeedBack"
                sx={{ color: "black", textDecoration: "none" }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        {/* ////////////////////////////////////////////////////////////////////////// */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon
                sx={{
                  color: "#1976d2",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ color: "white", fontSize: "30px" }} />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
