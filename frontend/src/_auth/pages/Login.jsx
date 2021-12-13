import { Box } from "@mui/system";
import React, { Fragment, useState, useLayoutEffect } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import GoogleLogo from "../assets/google-icon.png";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import config from '../../common/constants/index';
import Swal from 'sweetalert2';
import { useRecoilState } from "recoil";
import authState from "../../common/store/authState";

const LoginPage = () => {
  const classes = useStyles();
  const router = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [auth, setAuth] = useRecoilState(authState);

  const onLogin = async () => {
    if (email === "") {
      setemailError("This field is required");
    }
    if (password === "") {
      setpasswordError("This field is required");
    }
    if (email.trim() != "" && password.trim() != "") {
      axios.post(config.SERVER_URL + '/auth/login', {
        username: email,
        password,
      }, { 
        withCredentials: true,
        validateStatus: () => true
      }).then(({data}) => {
        console.log(data);
        if (data.success) {
          setAuth(({user, isLoggedIn}) => {
            return {isLoggedIn: true, user: data.user};
          });
          Swal.fire({
            title: 'Success',
            text: 'Login Successful!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            router.push("/home");
          });
        } else {
          setpasswordError("Email or password is incorrect");
          Swal.fire({
            title: 'Login Failed!',
            text: data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
          setAuth(({user, isLoggedIn}) => {
            return {isLoggedIn: false, user};
          });
        }
      });
    }
  };

  useLayoutEffect(() => {
    document.body.classList.add("gray");
    return () => document.body.classList.remove("gray");
  }, []);
  return (
    <Fragment>
      {JSON.stringify(auth)}
      <Box className={classes.container}>
        <Box className={classes.bigbox}>
          <Box className={classes.header}>Sign In</Box>
          <Box className={classes.textFieldBox}>
            <TextField
              id="email"
              placeholder="Email"
              variant="outlined"
              sx={{ borderRadius: "10px" }}
              fullWidth
              autoComplete="off"
              error={emailError.length === 0 ? false : true}
              onChange={(e) => {
                setemail(e.target.value);
                setemailError("");
              }}
            />
          </Box>
          {emailError.length != 0 && (
            <Box className={classes.error}>{emailError}</Box>
          )}
          <Box className={classes.textFieldBox}>
            <TextField
              id="password"
              placeholder="Password"
              variant="outlined"
              type="password"
              sx={{ borderRadius: "10px" }}
              fullWidth
              autoComplete="off"
              error={passwordError.length === 0 ? false : true}
              onChange={(e) => {
                setpassword(e.target.value);
                setpasswordError("");
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onLogin();
                }
              }}
            />
          </Box>
          {passwordError.length != 0 && (
            <Box className={classes.error}>{passwordError}</Box>
          )}
          <Box className={classes.button}>
            <Button
              variant="contained"
              style={{
                width: "500px",
                height: "50px",
                textTransform: "capitalize",
                marginTop: "40px",
              }}
              onClick={onLogin}
            >
              Sign In
            </Button>
          </Box>
          <Box className={classes.text}>Forgot your password?</Box>
          <Box className={classes.divider}>OR</Box>
          <Button
            variant="contained"
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              borderBlockColor: "gray",
              color: "black",
              width: "500px",
              marginBottom: "35px",
              padding: "8px",
              textTransform: "capitalize",
            }}
            startIcon={<Avatar src={GoogleLogo} />}
          >
            Sign in With Google
          </Button>
          <Box className={classes.condition2}>
            Does not have any account yet?{"\u00A0"}
            <Link to="/register">
              <span className={classes.textOrange2}>Sign Up</span>
            </Link>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};
const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  bigbox: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    fontSize: "35px",
    fontWeight: 600,
    padding: "7% 0%",
  },
  textFieldBox: {
    backgroundColor: "white",
    borderRadius: "10px",
    [`& fieldset`]: {
      borderRadius: "10px",
    },
    display: "flex",
    justifyContent: "center",
    width: "500px",
    marginTop: "40px",
  },
  button: {
    marginBottom: "20px",
    marginTop: "15px",
  },
  textOrange2: {
    color: "#FD6637",
  },
  text: {
    color: "#A0A3BD",
    display: "flex",
    justifyContent: "flex-end",
    width: "500px",
  },
  condition2: {
    margin: "20px 0",
  },
  divider: {
    color: "#A0A3BD",
    margin: "30px 0px",
  },
  error: {
    marginTop: "5px",
    fontSize: "14px",
    color: "#FD3737",
    textAlign: "right",
    width: "500px",
  },
});

export default LoginPage;
