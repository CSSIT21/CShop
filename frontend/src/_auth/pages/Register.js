import { Box } from "@mui/system";
import React, { Fragment, useState } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import CButton from "../../common/components/CButton";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import GoogleLogo from "../assets/google-icon.png";
import { useHistory } from "react-router";

//data
const RegisterPage = () => {
  //function
  const classes = useStyles();
  const router = useHistory();

  const [userPhoneNum, setUserPhoneNum] = useState({
    phoneNumber: "",
  });
  const [check, setcheck] = useState(false);

  const handleChange = (event) => {
    setcheck(event.target.checked);
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
              value={userPhoneNum.phoneNumber}
              fullWidth
              onChange={(e) => {
                setUserPhoneNum({
                  ...userPhoneNum,
                  phoneNumber: e.target.value,
                });
              }}
            />
          </Box>
          <Box className={classes.condition}>
            <Radio
              checked={check === true}
              onChange={handleChange}
              value={check}
              sx={{
                color: "#FD6637",
                "&.Mui-checked": {
                  color: "#FD6637",
                },
              }}
            />
            <Box className={classes.text}>
              Accept all{"\u00A0"}
              <span className={classes.textOrange}>CShop Conditions</span>
            </Box>
          </Box>
          <Box className={classes.button}>
            <CButton
              title="Register"
              width="500px"
              height="55px"
              onClick={() => {
                router.push("/register/info");
              }}
            ></CButton>
          </Box>
          <Box className={classes.divider}>
            {/* {[...Array(150)].map((space, idx) => &nbsp;)} */}
            <Divider>OR</Divider>
          </Box>

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
            }}
            startIcon={<Avatar src={GoogleLogo} />}
          >
            Sign Up With Google
          </Button>
          <Box className={classes.condition2}>
            Already have an account?{"\u00A0"}
            <span className={classes.textOrange2}>Sign in</span>
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
    marginBottom: "35px",
  },

  textOrange2: {
    color: "#FD6637",
  },
});
export default RegisterPage;
