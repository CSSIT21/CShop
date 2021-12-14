import { Box } from "@mui/system";
import React, { Fragment, useState, useLayoutEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  TextField,
  Button,
  Avatar,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import GoogleLogo from "../assets/google-icon.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import registerState from "../../common/store/registerState";
//data
const RegisterPage = () => {
  //function
  const classes = useStyles();
  const router = useHistory();
  useLayoutEffect(() => {
    document.body.classList.add("gray");
    return () => document.body.classList.remove("gray");
  }, []);

  const [userInfo, setUserInfo] = useRecoilState(registerState);
  const [errorText, seterrorText] = useState("");
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const checkIfEmailIsValid = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = re.test(userInfo.email);
    if (userInfo.email === "") {
      seterrorText("This field is required");
    } else if (!valid) {
      seterrorText("Email is invalid");
    } else if (!checked) {
      setOpen(true);
    } else {
      router.push("/register/info");
    }
  };
  return (
    <Fragment>
      <Box className={classes.container}>
        <Box className={classes.bigbox}>
          <Box className={classes.header}>Sign Up</Box>
          <Box className={classes.textFieldBox}>
            <TextField
              id="email"
              placeholder="Email"
              variant="outlined"
              sx={{ borderRadius: "10px" }}
              value={userInfo.email}
              fullWidth
              error={errorText.length === 0 ? false : true}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                });
                seterrorText("");
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  checkIfEmailIsValid();
                }
              }}
            />
          </Box>
          {errorText.length != 0 && (
            <Box className={classes.error}>{errorText}</Box>
          )}
          <Box className={classes.condition}>
            <Checkbox checked={checked} onChange={handleCheck} />
            <Snackbar
              open={open}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              className={classes.alertCondition}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                color="primary"
                icon={false}
                sx={{ width: "100%" }}
              >
                Please accept CShop Condition
              </Alert>
            </Snackbar>
            <Box className={classes.text}>
              Accept all{"\u00A0"}
              <span className={classes.textOrange}>CShop Conditions</span>
            </Box>
          </Box>
          <Box className={classes.button}>
            <Button
              variant="contained"
              style={{
                width: "500px",
                height: "55px",
                textTransform: "capitalize",
              }}
              onClick={checkIfEmailIsValid}
            >
              Sign Up
            </Button>
          </Box>
          <Box className={classes.divider}>OR</Box>
          <Button
            variant="contained"
            style={{
              backgroundColor: "white",
              borderBlockColor: "gray",
              color: "black",
              width: "500px",
              margin: "30px",
              padding: "8px",
              textTransform: "capitalize",
            }}
            startIcon={<Avatar src={GoogleLogo} />}
          >
            Sign Up With Google
          </Button>
          <Box className={classes.condition2}>
            Already have an account?{"\u00A0"}
            <Link to="/login">
              <span className={classes.textOrange2}>Sign in</span>
            </Link>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};
//css
const useStyles = makeStyles({
  container: {
    backgroundColor: "#f3f4f5",
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
  },
  condition: {
    marginTop: "15px",
    display: "flex",
    width: "500px",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  text: {
    display: "flex",
    alignItems: "center",
  },
  textOrange: {
    color: "#FD6637",
  },
  button: {
    margin: "30px",
  },
  condition2: {
    margin: "20px 0",
  },
  textOrange2: {
    color: "#FD6637",
  },
  divider: {
    color: "#A0A3BD",
  },
  error: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#FD3737",
    textAlign: "right",
    width: "500px",
  },
});
export default RegisterPage;
