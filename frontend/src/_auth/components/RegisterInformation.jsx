import React, { Fragment, useState } from "react";
import { TextField, MenuItem, Button, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { years, months, days, genders } from "../../common/constants/register";
import { useRecoilState } from "recoil";
import registerState from "../../common/store/registerState";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useHistory } from "react-router-dom";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const RegisterInformation = ({ handleNext = () => {} }) => {
  const classes = useStyles();
  const router = useHistory();
  const [userInfo, setUserInfo] = useRecoilState(registerState);
  const [passwordError, setpasswordError] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");
  const [fnError, setfnError] = useState("");
  const [lnError, setlnError] = useState("");
  const [phoneNumError, setphoneNumError] = useState("");
  const [genderError, setgenderError] = useState("");
  const [image, setImage] = useState("");

  const checkInfo = () => {
    if (userInfo.email == "") {
      Swal.fire(
        "Register Error!",
        "Please proceed back to enter email",
        "error"
      );
      router.push("/register");
    }
    if (userInfo.password != userInfo.confirmPassword) {
      setconfirmPasswordError("Password does not match");
    }
    if (userInfo.password == "") {
      setpasswordError("This field is required");
    }
    if (userInfo.confirmPassword == "") {
      setconfirmPasswordError("This field is required");
    }
    if (userInfo.firstname == "") {
      setfnError("This field is required");
    }
    if (userInfo.lastname == "") {
      setlnError("This field is required");
    }
    if (userInfo.phoneNumber == "") {
      setphoneNumError("This field is required");
    }
    if (userInfo.gender == "Select Gender") {
      setgenderError("This field is required");
    }
    if (
      userInfo.email != "" &&
      userInfo.password != "" &&
      userInfo.confirmPassword != "" &&
      userInfo.password === userInfo.confirmPassword &&
      userInfo.firstname != "" &&
      userInfo.lastname != "" &&
      userInfo.phoneNumber != "" &&
      userInfo.gender != "Select Gender"
    ) {
      handleNext();
    }
  };
  const uploadFile = (e) => {
    if (e.target.files.length) {
      const path = URL.createObjectURL(e.target.files[0]);
      setImage(path);
    }
  };
  return (
    <Fragment>
      <Box>
        <Box className={classes.header}>Information</Box>
        <Box className={classes.context}>
          <Box className={classes.genInfo} component="form">
            <Box className={classes.contextHeader}>General Information</Box>
            <Box className={classes.textFieldBox}>
              <TextField
                id="email"
                placeholder="Email"
                variant="outlined"
                sx={{ borderRadius: "10px" }}
                readOnly
                fullWidth
                value={userInfo.email}
              />
            </Box>
            <Box className={classes.textFieldBox}>
              <TextField
                id="password"
                variant="outlined"
                type="password"
                placeholder="Password"
                fullWidth
                error={passwordError.length === 0 ? false : true}
                value={userInfo.password}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, password: e.target.value });
                  setpasswordError("");
                }}
              />
            </Box>
            {passwordError.length != 0 && (
              <Box className={classes.error}>{passwordError}</Box>
            )}
            <Box className={classes.textFieldBox}>
              <TextField
                id="confirmPassword"
                type="password"
                variant="outlined"
                placeholder="Confirm your password"
                fullWidth
                error={confirmPasswordError.length === 0 ? false : true}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, confirmPassword: e.target.value });
                  setconfirmPasswordError("");
                }}
              />
            </Box>
            {confirmPasswordError.length != 0 && (
              <Box className={classes.error}>{confirmPasswordError}</Box>
            )}
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                className={classes.textFieldBox}
                style={{ marginRight: "10px" }}
              >
                <TextField
                  id="firstname"
                  variant="outlined"
                  placeholder="Firstname"
                  fullWidth
                  required
                  error={fnError.length === 0 ? false : true}
                  value={userInfo.firstname}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, firstname: e.target.value });
                    setfnError("");
                  }}
                />
              </Box>

              <Box
                className={classes.textFieldBox}
                style={{ marginLeft: "10px" }}
              >
                <TextField
                  id="lastname"
                  variant="outlined"
                  placeholder="Lastname"
                  value={userInfo.lastname}
                  fullWidth
                  error={lnError.length === 0 ? false : true}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, lastname: e.target.value });
                    setlnError("");
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {fnError.length != 0 ? (
                <Box className={classes.error} style={{ marginRight: "3%" }}>
                  {fnError}
                </Box>
              ) : (
                <Box className={classes.error}></Box>
              )}
              {lnError.length != 0 ? (
                <Box className={classes.error}>{lnError}</Box>
              ) : (
                <Box className={classes.error}></Box>
              )}
            </Box>

            <Box className={classes.textFieldBox}>
              <TextField
                id="phoneNumber"
                variant="outlined"
                placeholder="Phone Number"
                fullWidth
                error={phoneNumError.length === 0 ? false : true}
                value={userInfo.phoneNumber}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, phoneNumber: e.target.value });
                  setphoneNumError("");
                }}
              />
            </Box>
            {phoneNumError.length != 0 && (
              <Box className={classes.error}>{phoneNumError}</Box>
            )}
          </Box>
          <Box className={classes.gender}>
            <Box className={classes.contextHeader}>Gender</Box>
            <Box className={classes.textFieldBox} style={{ width: "35%" }}>
              <TextField
                id="gender"
                variant="outlined"
                sx={{ borderRadius: "10px" }}
                fullWidth
                select
                error={genderError.length === 0 ? false : true}
                value={userInfo.gender}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, gender: e.target.value });
                  setgenderError("");
                }}
              >
                {genders.map((gender) => (
                  <MenuItem key={gender.id} value={gender.value}>
                    {gender.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            {genderError.length != 0 && (
              <Box className={classes.error} sx={{ width: "30%" }}>
                {genderError}
              </Box>
            )}
          </Box>
          <Box className={classes.birthdate}>
            <Box className={classes.contextHeader}>Birthdate</Box>
            <Box className={classes.birthdateSelect}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  value={userInfo.birthdate}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, birthdate: e.toISOString() });
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box>
            <Box className={classes.contextHeader}>Profile Image</Box>
            <Box
              sx={{ display: "flex", alignItems: "end", margin: "50px 0px" }}
            >
              <Avatar
                src={image}
                alt=""
                sx={{ width: "150px", height: "150px", marginRight: "30px" }}
              ></Avatar>
              <label htmlFor={`outlined-button-file-`}>
                <Button
                  component="span"
                  variant="outlined"
                  sx={{ height: "42px", borderWidth: "2px" }}
                >
                  <input
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    id={`outlined-button-file-`}
                    onChange={(e) => {
                      uploadFile(e);
                    }}
                  />
                  Upload
                </Button>
              </label>
            </Box>
          </Box>
        </Box>
        <Box className={classes.button}>
          <Button
            variant="contained"
            style={{
              width: "470px",
              height: "55px",
              textTransform: "capitalize",
            }}
            onClick={checkInfo}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: 600,
    margin: "5% 0%",
  },
  context: {
    padding: "0 12%",
  },
  contextHeader: {
    fontSize: "24px",
    marginTop: "40px",
  },
  textField: {
    marginBottom: "40px",
  },
  textFieldBox: {
    marginTop: "35px",
    backgroundColor: "white",
    borderRadius: "10px",
    width: "100%",
    [`& fieldset`]: {
      borderRadius: "10px",
    },
  },
  birthdateSelect: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "35px",
    backgroundColor: "white",
    borderRadius: "10px",
    width: "35%",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    margin: "70px 0 180px 0",
  },
  error: {
    fontSize: "14px",
    color: "#FD3737",
    textAlign: "right",
    width: "100%",
    marginTop: "6px",
  },
});

export default RegisterInformation;
