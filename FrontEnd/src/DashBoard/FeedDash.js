import { Alert, Button, CardMedia, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";
import MainDash from "./MainDash";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbacks, deleteFeedback } from "../Store/FeedAdmin";

const FeedDash = () => {
  const dispatch = useDispatch();
  const feedbackState = useSelector((state) => state.feedAdmin);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const handleFilter = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleDelete = (id) => {
    dispatch(deleteFeedback(id));
  };

  const filteredFeedbacks = feedbackState.feedbacks.filter(
    (feedback) => feedback.primary
  );

  return (
    <>
      <MainDash />
      <CardMedia
        sx={{ position: "absolute", left: 0, top: 0 }}
        component="img"
        image={img1}
        style={{ width: "50vh" }}
        alt="Top Banner"
      />
      <Container>
        <TextField
          onChange={handleFilter}
          value={searchValue}
          label="Search"
          variant="outlined"
          sx={{ mt: 15, mb: 2, width: "100%" }}
        />

        {feedbackState.loading && <Typography>Loading feedbacks...</Typography>}
        {feedbackState.error && (
          <Alert severity="error">Error: {feedbackState.error}</Alert>
        )}

        <List sx={{ width: "100%", mt: 4, bgcolor: "background.paper" }}>
          {filteredFeedbacks.map((item, index) => (
            <React.Fragment key={item._id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="person avatar" src={item.person} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.primary}
                  secondary={
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.secondary}
                    </Typography>
                  }
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(item._id)}
                  sx={{ ml: 2 }}
                >
                  Delete
                </Button>
              </ListItem>
              {index < filteredFeedbacks.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
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

export default FeedDash;

// const columns = [
//   {
//     name: (
//       <Typography
//         variant="h6"
//         style={{ fontWeight: "bold", color: "#1976d2" }}
//       >
//         First Name
//       </Typography>
//     ),
//     selector: (row) => row.fname,
//   },
//   {
//     name: (
//       <Typography
//         variant="h6"
//         style={{ fontWeight: "bold", color: "#1976d2" }}
//       >
//         Last Name
//       </Typography>
//     ),
//     selector: (row) => row.lname,
//   },
//   {
//     name: (
//       <Typography
//         variant="h6"
//         style={{ fontWeight: "bold", color: "#1976d2" }}
//       >
//         Email
//       </Typography>
//     ),
//     selector: (row) => row.email,
//   },
//   {
//     name: (
//       <Typography
//         variant="h6"
//         style={{ fontWeight: "bold", color: "#1976d2" }}
//       >
//         FeedBack
//       </Typography>
//     ),
//     selector: (row) => row.feedback,
//   },
// ];

// const data = [
//   {
//     id: 1,
//     fname: "nour",
//     lname: "alassad",
//     email: "ascascsa@gmail.com",
//     feedback: "fvdvdfvdvdf",
//   },
//   {
//     id: 2,
//     fname: "asac",
//     lname: "alagbgs",
//     email: "ascvss@gmail.com",
//     feedback: "vfdvdfvfdvdf",
//   },
//   {
//     id: 3,
//     fname: "saac",
//     lname: "mymjtyy",
//     email: "hthtrhrht@gmail.com",
//     feedback: "vfdvdfvdvdfvfd",
//   },
//   {
//     id: 4,
//     fname: "kareem",
//     lname: "qallash",
//     email: "kareem@gmail.com",
//     feedback: "fdvfdvv",
//   },
//   {
//     id: 5,
//     fname: "hytyt",
//     lname: "alashytytsad",
//     email: "thrhtrhtrh@gmail.com",
//     feedback: "vfdvdfvdfvfd",
//   },
//   {
//     id: 6,
//     fname: "jytyt",
//     lname: "alanrttnssad",
//     email: "rhthrhtr@gmail.com",
//     feedback: "vfdvfdfdv",
//   },
//   {
//     id: 7,
//     fname: "myuj",
//     lname: "reegg",
//     email: "grebvvj@gmail.com",
//     feedback: "vfvfdvfdvdf",
//   },
//   {
//     id: 8,
//     fname: "nrntr",
//     lname: "rgbtr",
//     email: "brtrrn@gmail.com",
//     feedback: "nhnhmy",
//   },
//   {
//     id: 9,
//     fname: "hamdoush",
//     lname: "ali",
//     email: "dscasa@gmail.com",
//     feedback: "rgrtgrn",
//   },
//   {
//     id: 10,
//     fname: "dsds",
//     lname: "vdsv",
//     email: "vdsv@gmail.com",
//     feedback: "sdfsdfsfdsfntrwntwsdsdsdfffdf",
//   },
//   {
//     id: 11,
//     fname: "vdsvsdv",
//     lname: "vdsvsd",
//     email: "vdsvds@gmail.com",
//     feedback: "nrwtwtnrnstr",
//   },
//   {
//     id: 12,
//     fname: "novdsvsdur",
//     lname: "vsdv",
//     email: "vdsvs@gmail.com",
//     feedback: "ntwnrnswtnrns",
//   },
//   {
//     id: 13,
//     fname: "vsdsdv",
//     lname: "asas",
//     email: "vdsvfb@gmail.com",
//     feedback: "sntrtnyrgfg",
//   },
//   {
//     id: 14,
//     fname: "jytjyu",
//     lname: "jytjtyj",
//     email: "yjtjjyt@gmail.com",
//     feedback: "grhbtrbtrbrbfdbf",
//   },
//   {
//     id: 15,
//     fname: "noyhthur",
//     lname: "trhtrht",
//     email: "trhtrhr@gmail.com",
//     feedback: "muykyu87i7yjk",
//   },
//   {
//     id: 16,
//     fname: "htrh",
//     lname: "alashtrhsad",
//     email: "hrtrhtrht@gmail.com",
//     feedback: "reervbrfbtrbtr",
//   },
// ];
