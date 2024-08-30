import {
  Alert,
  Button,
  CardMedia,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonAppBar from "./AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";
import { useDispatch, useSelector } from "react-redux";
import { sendFeedback, fetchFeedbacks } from "../Store/SendFeed";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();
  const feedbackState = useSelector((state) => {
    return state.feedback;
  });

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const handleAddFeedback = () => {
    if (feedback.trim()) {
      dispatch(sendFeedback({ feedbackData: { text: feedback } }));
      dispatch(fetchFeedbacks());
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
        alt="Top Banner"
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

        {feedbackState?.loading && <Typography>Sending feedback...</Typography>}
        {feedbackState?.error && (
          <Alert severity="error">Error: {feedbackState?.error}</Alert>
        )}

        <List sx={{ width: "100%", mt: 4, bgcolor: "background.paper" }}>
          {feedbackState?.feedbacks && feedbackState?.feedbacks.length > 0 ? (
            feedbackState?.feedbacks.map((fb) => (
              <React.Fragment key={fb._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${fb?.userId?.firstName} ${fb?.userId?.lastName}`}
                    secondary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {fb.message}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))
          ) : (
            <Typography>No feedbacks available.</Typography>
          )}
        </List>
      </Container>
      <CardMedia
        sx={{ position: "fixed", bottom: 0, right: 0, zIndex: -1 }}
        component="img"
        image={img3}
        style={{ width: "35vh", height: "auto" }}
        alt="Bottom Banner"
      />
    </>
  );
};

export default Feedback;
