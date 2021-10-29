import { Box } from "@mui/system";
import React, { Fragment, useState, useEffect } from "react";
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
//data
const RegisterPage = () => {
  //function
  const classes = useStyles();
  const router = useHistory();
  useEffect(() => {
    document.body.style.backgroundColor = "#f3f4f5";
    return () => (document.body.style.backgroundColor = "white");
  }, []);

  const [userInfo, setUserInfo] = useRecoilState(registerState);
  const checkIfPhoneNumIsNull = () => {
    if (userInfo.phoneNumber != "") {
      router.push("/register/info");
    } else {
      alert("Mueng forget phone number i sus");
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
            <CButton
              title="Sign Up"
              width="500px"
              height="55px"
              onClick={checkIfPhoneNumIsNull}
            ></CButton>
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
