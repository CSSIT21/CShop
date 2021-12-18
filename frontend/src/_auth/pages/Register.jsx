import { Box } from "@mui/system";
import React, { Fragment, useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CButton from "../../common/components/CButton";
import Avatar from "@mui/material/Avatar";
import GoogleLogo from "../assets/google-icon.png";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { useRecoilState } from "recoil";
import registerState from "../../common/store/registerState";
import axios from "axios";
import config from "../../common/constants";
import Swal from "sweetalert2/dist/sweetalert2.js";
import LoadingButton from "@mui/lab/LoadingButton";

//data
const RegisterPage = () => {
  //function
  const classes = useStyles();
  const router = useHistory();
  useLayoutEffect(() => {
    document.body.classList.add('gray');
    return () => document.body.classList.remove('gray');
  }, []);

  const [userInfo, setUserInfo] = useRecoilState(registerState);
  const [errorText, seterrorText] = useState("");
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      axios
        .post(config.SERVER_URL + "/auth/checkemail", userInfo, {
          validateStatus: (status) => {
            return true;
          },
        })
        .then(({ data }) => {
          if (!data.success) {
            router.push("/register/info");
          } else {
            Swal.fire({
              title: "Register Failed!",
              text: "Email already exist!",
              icon: "error",
              timer: 2000,
            });
          }
          setIsLoading(false);
        });
    }
  };

  return (
    <Fragment>
      <Box className={classes.container}>
        <Box className={classes.bigbox}>
          <Box className={classes.header}>Sign Up</Box>
          <Box className={classes.textFieldBox}>
            <TextField
              id="phoneNumber"
              placeholder="Phone Number"
              variant="outlined"
              sx={{ borderRadius: "10px" }}
              value={userInfo.phoneNumber}
              fullWidth
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  phoneNumber: e.target.value,
                });
              }}
            />
          </Box>
          <Box className={classes.condition}>
            <Checkbox />
            <Box className={classes.text}>
              Accept all{"\u00A0"}
              <span className={classes.textOrange}>CShop Conditions</span>
            </Box>
          </Box>
          <Box className={classes.button}>
            {!isLoading ? (
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
            ) : (
              <LoadingButton
                loading
                variant="contained"
                sx={{
                  width: "500px",
                  textTransform: "capitalize",
                  height: "55px",
                }}
              ></LoadingButton>
            )}
          </Box>
          <Box className={classes.divider}>OR</Box>
          <Button
            variant="contained"
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              borderBlockColor: "gray",
              color: "black",
              width: "500px",
              margin: "35px",
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
    marginTop: "20px",
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
    margin: "35px",
  },
  condition2: {
    margin: "20px 0",
  },
  textOrange2: {
    color: "#FD6637",
  },
  divider: {
    color: "#A0A3BD",
    margin: "10px 0px",
  },
});
export default RegisterPage;
