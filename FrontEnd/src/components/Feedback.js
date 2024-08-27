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
import { useDispatch, useSelector } from "react-redux";
import { sendFeedback } from "../Store/SendFeed";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();
  const feedbackState = useSelector((state) => state.feedback);

  const handleAddFeedback = () => {
    if (feedback.trim()) {
      dispatch(sendFeedback({ feedback }));
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

        {/* عرض حالة التحميل أو الخطأ */}
        {feedbackState.loading && <Typography>Sending feedback...</Typography>}
        {feedbackState.error && (
          <Typography color="error">Error: {feedbackState.error}</Typography>
        )}

        {/* عرض قائمة الملاحظات */}
        <List sx={{ width: "100%", mt: 4, bgcolor: "background.paper" }}>
          {feedbackState.result && (
            <React.Fragment>
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
                      {feedbackState.result.feedback}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          )}
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
