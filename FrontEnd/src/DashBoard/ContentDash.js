import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import MainDash from "./MainDash";
import { Outlet } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from "recharts";

const Decaptive_data = [
  { name: "Sun", Time_Usage: 50 },
  { name: "Mon", Time_Usage: 25 },
  { name: "Tue", Time_Usage: 32 },
  { name: "Wed", Time_Usage: 7 },
  { name: "Thu", Time_Usage: 12 },
  { name: "Fri", Time_Usage: 18 },
  { name: "Sat", Time_Usage: 10 },
];

const Fetch_data = [
  { name: "Sun", Usage: 20 },
  { name: "Mon", Usage: 25 },
  { name: "Tue", Usage: 12 },
  { name: "Wed", Usage: 7 },
  { name: "Thu", Usage: 12 },
  { name: "Fri", Usage: 8 },
  { name: "Sat", Usage: 10 },
];

const ContentDash = () => {
  return (
    <>
      <MainDash />
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={10}
            sm={3}
            component="main"
            sx={{ flexGrow: 1, p: 2, mt: 25 }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Time Usage of Decaptive model
              </Typography>
              <LineChart
                width={500}
                height={300}
                data={Decaptive_data}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Time_Usage"
                  stroke="#1976d2"
                  fill="#1976d2"
                  fillOpacity={0.3}
                />
                <Line type="monotone" dataKey="Time_Usage" stroke="#1976d2" />
              </LineChart>
            </Typography>
          </Grid>

          <Grid
            item
            xs={10}
            sm={3}
            component="main"
            sx={{ flexGrow: 1, p: 2, mt: 25 }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Time Usage of Fetch Data model
              </Typography>
              <LineChart
                width={500}
                height={300}
                data={Fetch_data}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Usage"
                  stroke="#1976d2"
                  fill="#1976d2"
                  fillOpacity={0.3}
                />
                <Line type="monotone" dataKey="Usage" stroke="#1976d2" />
              </LineChart>
            </Typography>
          </Grid>
        </Box>
      </Container>
      <Outlet />
    </>
  );
};

export default ContentDash;
