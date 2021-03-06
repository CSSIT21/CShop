import { Box } from "@mui/system";
import React, { Fragment, useState, useLayoutEffect } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import GoogleLogo from "../assets/google-icon.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../common/constants/index";
import Swal from "sweetalert2";
import { useRecoilState, useResetRecoilState } from "recoil";
import authState from "../../common/store/authState";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import { Typography } from "@mui/material";

const LoginPage = () => {
  const classes = useStyles();
  const router = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [auth, setAuth] = useRecoilState(authState);
  const resetAuth = useResetRecoilState(authState);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setConfirmNewPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const onLogin = async () => {
    if (email === "") {
      setemailError("This field is required");
    }
    if (password === "") {
      setpasswordError("This field is required");
    }
    if (email.trim() != "" && password.trim() != "") {
      setIsLoading(true);
      axios
        .post(
          config.SERVER_URL + "/auth/login",
          {
            username: email,
            password,
          },
          {
            withCredentials: true,
            validateStatus: () => true,
          }
        )
        .then(({ data }) => {
          console.log(data);
          if (data.success) {
            setAuth(({ user, isLoggedIn }) => {
              return { isLoggedIn: true, user: data.user };
            });
            Swal.fire({
              title: "Success",
              text: "Login Successful!",
              icon: "success",
              confirmButtonText: "OK",
              timer: 3000,
            }).then(() => {
              router.push("/home");
            });
          } else {
            setpasswordError("Email or password is incorrect");
            Swal.fire({
              title: "Login Failed!",
              text: data.message,
              icon: "error",
              confirmButtonText: "OK",
              timer: 3000,
            });
            resetAuth();
          }
          setIsLoading(false);
        });
    }
  };
  const handleCancelResetPassword = () => {
    setNewPassword("");
    setConfirmNewPassword("");
    setConfirmEmail("");
    setOpen(false);
  };
  const handleResetPassword = () => {
    if (
      newPassword !== newConfirmPassword ||
      newPassword === "" ||
      newConfirmPassword === "" ||
      confirmEmail === ""
    ) {
      Swal.fire({
        title: "Failed!",
        text: "Please check if your information is correct!",
        icon: "error",
        confirmButtonText: "OK",
        timer: 3000,
      });
      setOpen(false);
    } else {
      setIsLoading(true);
      axios
        .patch(config.SERVER_URL + "/profile/resetpassword", {
          email: confirmEmail,
          password: newPassword,
        })
        .then(({ data }) => {
          if (data.success) {
            Swal.fire({
              title: "Success!",
              text: "Your password has been reset!",
              icon: "success",
              timer: 3000,
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "Email not exist!",
              icon: "error",
              timer: 3000,
            });
          }
          setIsLoading(false);
          setOpen(false);
        });
    }
  };
  useLayoutEffect(() => {
    document.body.classList.add("gray");
    return () => document.body.classList.remove("gray");
  }, []);
  return (
    <Fragment>
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
            {!isLoading ? (
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
            ) : (
              <LoadingButton
                loading
                variant="contained"
                sx={{
                  width: "500px",
                  textTransform: "capitalize",
                  height: "50px",
                  marginTop: "40px",
                }}
              ></LoadingButton>
            )}
          </Box>
          <Box className={classes.text} onClick={() => setOpen(true)}>
            Forgot your password?
          </Box>
          {/* <Box className={classes.divider}>OR</Box>
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
          </Button> */}
          <Box className={classes.condition2}>
            Does not have any account yet?{"\u00A0"}
            <Link to="/register">
              <span className={classes.textOrange2}>Sign Up</span>
            </Link>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px 0px",
          }}
        >
          <Typography
            fontWeight="500"
            fontSize="24px"
            sx={{ marginBottom: "40px" }}
          >
            Reset Password
          </Typography>
          <TextField
            id="confirmPassword"
            placeholder="Email"
            variant="outlined"
            sx={{ borderRadius: "10px", width: "60%", marginBottom: "30px" }}
            fullWidth
            autoComplete="off"
            onChange={(e) => {
              setConfirmEmail(e.target.value);
            }}
          />
          <TextField
            id="newpassword"
            placeholder="Password"
            variant="outlined"
            sx={{ borderRadius: "10px", width: "60%", marginBottom: "30px" }}
            fullWidth
            type={"password"}
            autoComplete="off"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <TextField
            id="newpasswordconfirm"
            placeholder="Confirm Password"
            variant="outlined"
            sx={{ borderRadius: "10px", width: "60%" }}
            type={"password"}
            fullWidth
            autoComplete="off"
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
            }}
          />
          <Box
            sx={{
              display: "flex",
              width: "50%",
              justifyContent: "space-around",
            }}
          >
            <Button
              variant="outlined"
              style={{
                width: "100px",
                height: "50px",
                textTransform: "capitalize",
                marginTop: "40px",
              }}
              onClick={handleCancelResetPassword}
            >
              Cancel
            </Button>
            {!isLoading ? (
              <Button
                variant="contained"
                style={{
                  width: "100px",
                  height: "50px",
                  textTransform: "capitalize",
                  marginTop: "40px",
                }}
                onClick={handleResetPassword}
              >
                Confirm
              </Button>
            ) : (
              <LoadingButton
                loading
                variant="contained"
                sx={{
                  width: "100px",
                  textTransform: "capitalize",
                  height: "50px",
                  marginTop: "40px",
                }}
              ></LoadingButton>
            )}
          </Box>
        </Box>
      </Dialog>
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
    marginBottom: "40px",
    cursor: "pointer",
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
