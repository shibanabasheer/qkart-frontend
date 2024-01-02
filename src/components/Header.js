import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = ({ children, hasHiddenAuthButtons }) => {
   //use useHistory for navigation
  const history= useHistory();
 
  // ---------no need to use extra functions here, we can do that on onChange itself-------------------
  // const handleBackToExplore = () => {
  //   historyHeader.push("/")
  // }

  // const handleRegister = () => {
  //   historyHeader.push("/register")
  // }

  // const handleLogin = () => {
  //   historyHeader.push("/login")
  // }

 //get username form local storage
 var username = localStorage.getItem("username");
 // console.log(username);

 // Logout btn handler
 let handleLogout = () => {
     //Redirect to same page - /products
     history.push("/");
     //Refresh the page
     history.go();
     //Remove all items
     localStorage.clear();
   };



 //we can check this thing using hasHiddenAuthButtons passed in Header component
const isUserLoggedIn = localStorage.getItem("username");

  //1. for register and login pages show "back to explore box", use hasHiddenAuthButtons to check if you are on regisetr/login page, true means you are on login/regiser
  //2. for logged out view (ie. Header view for Products page ), show register and login box in header, see images
  //3. for logged in view (ie. Header view for Products page), show user icon, username form local storage and logout option

  return (
    <Box className="header">
      <Box className="header-title">
        <Link to="/">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Link>
      </Box>
      
      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
            Back to explore         
        </Button>
        // agar ham login/register page pe nai hai to ya fir main page(product) pe hoge ya currently logged in hoge
      ) : !username ? (
        // not currently loggin so, need to show product page here with search bar and login/Register buttons
        <>
        <Box width="30vw">{children && children}</Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            className="header-title"
            variant="text"
            onClick={() => {
              history.push("/login");
            }}
          >
            {/* <Link to="/login">LOGIN</Link> : this will fail the test cases  but its fine to use that*/}
            Login
          </Button>
          <Button
            className="header-title"
            variant="contained"
            onClick={() => {
              history.push("/register");
            }}
          >
            Register
          </Button>
        </Stack>
        </>
      ) : (
        // currently logged-in so show logout button and other things
        <>
        <Box width="30vw">{children && children}</Box>
        <Stack direction="row" spacing={1} alignItems="center">
           {/* <img src="avatar.png" alt={username}>Text</img> */}
           <Avatar alt={username} src="./" />
           <p>{username}</p>
           <Button
            className="header-title"
            variant="text"
            onClick={() => {
              handleLogout()
            }}
          >
            Logout
          </Button>
        </Stack>
        </>
      )}
    </Box>
  );
};

export default Header;
