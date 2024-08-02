import { Button, CardMedia, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import ButtonAppBar from "./AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const handleAddFeedback = () => {
    if (feedback.trim()) {
      setFeedbackList([...feedbackList, feedback]);
      setFeedback("");
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
        alt="dcd"
      />
      <Container>
        <TextField
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          label="Enter your feedback"
          variant="outlined"
          sx={{ mt: 15, mb: 2, width: "100%" }}
        />
        <Button variant="contained" onClick={handleAddFeedback} sx={{ mb: 2 }}>
          Submit
        </Button>
        <List sx={{ width: "100%", mt: 4, bgcolor: "background.paper" }}>
          {feedbackList.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="User" />
                </ListItemAvatar>
                <ListItemText
                  primary="User Name"
                  secondary={
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Container>
      <CardMedia
        sx={{ position: "fixed", bottom: 0, right: 0, zIndex: -1 }}
        component="img"
        image={img3}
        style={{ width: "35vh", height: "auto" }}
        alt="dcd"
      />
    </>
  );
};

export default Feedback;
