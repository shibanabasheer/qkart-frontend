import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const historyLogin = useHistory();

  

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */

  const [getLoginUsername, setLoginUsername] = useState("");
  const handleLoginUsernameChange = (e) => {
    setLoginUsername(e.target.value);
  }

  const [getLoginPassword, setLoginPassword] = useState("");
  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  }

  const [getValidation, setValidation] =useState(false);


  const login = async (formData) => {
    formData.username = getLoginUsername;
    formData.password = getLoginPassword;
    // console.log(getLoginUsername,'seperate',getLoginPassword)

    if (validateInput(formData)) {
      const data = {
        username: formData.username,
        password: formData.password,
      };

      try {
        //setValidation(true);
        const fetchData = await axios.post(`${config.endpoint}/auth/login`, data)
          persistLogin(fetchData.data.token, fetchData.data.username, fetchData.data.balance);
          enqueueSnackbar("Logged in Successfully", {variant: "success"});
          setValidation(false);
          historyLogin.push("/")

      }
      
      catch (error) {
        const {data} = error.response;
        // console.log(data);
        setValidation(false);
        if(error.response.status === 400) {
          enqueueSnackbar(data.message, { variant: "error" });
        }
        else{
          enqueueSnackbar(
            "something went wrong. Check the backend.", {variant: "warning"}
          );
        }
      }
      
    }
    
    
  };
  // 
    // const isloggedin = localStorage.getItem("username");
    // if(isloggedin){
    //   historyLogin.push("/")
     
    // }
  
  
  
  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {

    const { username, password } = data;
    if(!username || !password) {
      enqueueSnackbar("Username and password are required.", { variant: "warning" });
      return false;
    }

    return true;
    };
    // const validateUser = data.username;
    // const validatePassword = data.password;

    // if(validateUser.length === 0 && validatePassword.length === 0) {
    //   enqueueSnackbar("Enter your credentials to Login to QKart", {variant: "info"})
    // }
    // else if(validateUser.length === 0){
    //   enqueueSnackbar("Username is required!", {variant:"warning"})
    //   return false;
    // }else if(validatePassword.length === 0){
    //   enqueueSnackbar("password is required!", {variant:"warning"})
    //   return false;
    // }else{
    //   setValidation(true);
    //   return true;
    // }
    
  

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
  };

 

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons= "default" />
      <Box className="content">
        <Stack spacing={2} className="form">
          {/* <h2 className="title">Login</h2> */}
          <Typography variant="h5" className="title">Login</Typography>
          <TextField
            id="username"
            label="username"
            title="username"
            name="username"
            color="success"
            onChange={handleLoginUsernameChange}
            value={getLoginUsername}
          />
          <TextField
            id="password"
            label="password"
            // title="password"
            name="password"
            type="password"
            color="success"
            onChange={handleLoginPasswordChange}
            value={getLoginPassword}
          />
          {getValidation && (
            <Box sx={{display: "flex", justifyCondent: "center"}}>
            <CircularProgress color="success" />
          </Box>
          )}
          <Button variant="contained" onClick={login}>
            LOGIN TO QKART
          </Button>
          {/* <p className="secondary-action">
            Don't have an account?
            <Link to="/Register" className="link">Register</Link>
          </p> */}
          <Typography variant="body2" className="secondary-action">
            Don't have an account?{" "}
            <Link to="/register" className="link">
              Register now
            </Link>
          </Typography>

          
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
