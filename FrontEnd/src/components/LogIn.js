import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  CardMedia,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import img1 from "../images/regular-table-top.png";
import img3 from "../images/pro-table-bottom.png";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import WelcomeBar from "../Welcome/WelcomeBar";
import { Key } from "@mui/icons-material";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showKey, setShowKey] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [Person, setPerson] = useState("Admin");

  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState(false);
  const linkTo = Person === "Admin" ? "/admin" : "/user";

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (!Key || key.length < 4) {
      setKeyError(true);
      valid = false;
    } else {
      setKeyError(false);
    }

    if (!valid) {
      return;
    }

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      <WelcomeBar />
      <CardMedia
        sx={{ position: "absolute", left: 0, top: 0 }}
        component="img"
        image={img1}
        style={{ width: "50vh", height: "auto" }}
        alt="dcd"
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={Person}
                onChange={(e) => {
                  setPerson(e.target.value);
                }}
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="Admin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  value="User"
                  control={<Radio />}
                  label="User"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={
                emailError ? "Email is required and must be valid" : ""
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={
                passwordError ? "Password must be at least 6 characters" : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {Person === "Admin" && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="key"
                label="Admin Key"
                type={showKey ? "text" : "password"}
                id="key"
                autoComplete="off"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                error={keyError}
                helperText={keyError ? "Key must be at least 6 characters" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowKey(!showKey)}
                        edge="end"
                      >
                        {showKey ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
            <Link
              to={linkTo}
              // onClick={alert("Sign Up Successfully")}
              style={{ textDecoration: "none" }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Link>
            <Grid container>
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <CardMedia
        sx={{ position: "fixed", bottom: 0, right: 0 }}
        component="img"
        image={img3}
        style={{ width: "35vh", height: "auto" }}
        alt="dcd"
      />
    </>
  );
}
