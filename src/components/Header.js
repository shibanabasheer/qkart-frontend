import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const historyHeader = useHistory();
  const handleBackToExplore = () => {
    historyHeader.push("/")
  }

  const handleRegister = () => {
    historyHeader.push("/register")
  }

  const handleLogin = () => {
    historyHeader.push("/login")
  }

  const handleLogout = () => {
    // historyHeader.push("/")
    localStorage.clear();
    window.location.reload();
  }



const isUserLoggedIn = localStorage.getItem("username");

  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {hasHiddenAuthButtons === "default" ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={handleBackToExplore}
        >
          Back to explore
        </Button>
      ) : (
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          {isUserLoggedIn ? (
            // Header for logged-in user
            <>
              <Avatar src="/public/avatar.png" alt={localStorage.getItem("username")}/>
              <p className="username-text">{localStorage.getItem("username")}</p>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            // Header for logged-out user
            <>
              <Button onClick={handleLogin}>Login</Button>
              <Button variant="contained" onClick={handleRegister}>Register</Button>
            </>
          )}
        </Stack>
      )}
    </Box>
  );
 };

export default Header;
