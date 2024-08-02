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
import ButtonAppBar from "./AppBar";  
import { CardMedia } from "@mui/material";  
import img1 from "../images/regular-table-top.png";  
import img3 from "../images/pro-table-bottom.png";  
import InputAdornment from "@mui/material/InputAdornment";  
import IconButton from "@mui/material/IconButton";  
import Visibility from "@mui/icons-material/Visibility";  
import VisibilityOff from "@mui/icons-material/VisibilityOff";  
import React from "react";

export default function SignUp() {  
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const [showPassword, setShowPassword] = useState(false);  
  const [emailError, setEmailError] = useState(false);  
  const [passwordError, setPasswordError] = useState(false);  

  const handleSubmit = (event) => {  
    event.preventDefault();  
    const data = new FormData(event.currentTarget);  
    
    setEmailError(!/\S+@\S+\.\S+/.test(email));
    setPasswordError(password.length < 6);  

    if (!emailError && !passwordError) {  
      console.log({  
        FirstName: data.get("firstName"),  
        LastName: data.get("lastName"),  
        Email: data.get("email"),  
        Password: data.get("password"),  
      });  
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
      <Container component="main" maxWidth="xs">  
        <CssBaseline />  
        <Box  
          sx={{  
            mt: 18,  
            display: "flex",  
            flexDirection: "column",  
            alignItems: "center",  
          }}  
        >  
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>  
            <LockOutlinedIcon />  
          </Avatar>  
          <Typography component="h1" variant="h5">  
            Sign up  
          </Typography>  
          <Box  
            component="form"  
            noValidate  
            onSubmit={handleSubmit}  
            sx={{ mt: 3 }}  
          >  
            <Grid container spacing={2}>  
              <Grid item xs={12} sm={6}>  
                <TextField  
                  autoComplete="given-name"  
                  name="firstName"  
                  required  
                  fullWidth  
                  id="firstName"  
                  label="First Name"  
                  autoFocus  
                />  
              </Grid>  
              <Grid item xs={12} sm={6}>  
                <TextField  
                  required  
                  fullWidth  
                  id="lastName"  
                  label="Last Name"  
                  name="lastName"  
                  autoComplete="family-name"  
                />  
              </Grid>  
              <Grid item xs={12}>  
                <TextField  
                  required  
                  fullWidth  
                  id="email"  
                  label="Email Address"  
                  name="email"  
                  autoComplete="email"  
                  onChange={(e) => setEmail(e.target.value)}  
                  error={emailError}  
                  helperText={emailError ? "Email is required and must be valid" : ""}  
                />  
              </Grid>  
              <Grid item xs={12}>  
                <TextField  
                  required  
                  fullWidth  
                  name="password"  
                  label="Password"  
                  type={showPassword ? "text" : "password"}  
                  id="password"  
                  autoComplete="new-password"  
                  onChange={(e) => setPassword(e.target.value)}  
                  error={passwordError}  
                  helperText={passwordError ? "Password must be at least 6 characters" : ""}  
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
              </Grid>  
            </Grid>  
            <Button  
              type="submit"  
              fullWidth  
              variant="contained"  
              sx={{ mt: 3, mb: 2 }}  
            >  
              Sign Up  
            </Button>  
            <Grid container justifyContent="flex-end">  
              <Grid item>  
                <Link to="/sign-in" variant="body2">  
                  Already have an account? Sign in  
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
        style={{ width: "35vh" }}  
        alt="dcd"  
      />  
    </>  
  );  
}