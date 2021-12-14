import React, { Fragment } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import CButton from "../../common/components/CButton";
import { Box } from "@mui/system";
import { years, months, days, genders } from "../../common/constants/register";
import { useRecoilState } from "recoil";
import registerState from "../../common/store/registerState";

const RegisterInformation = ({ handleNext = () => {} }) => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useRecoilState(registerState);

  const checkPassword = () => {
    if (userInfo.password != "" && checkPassword != "") {
      if (userInfo.password === userInfo.confirmPassword) {
        handleNext();
      } else {
        alert("Check korn i sus");
      }
    } else {
      alert("Mueng forget password i sus");

      const [passwordError, setpasswordError] = useState("");
      const [confirmPasswordError, setconfirmPasswordError] = useState("");
      const [fnError, setfnError] = useState("");
      const [lnError, setlnError] = useState("");
      const [phoneNumError, setphoneNumError] = useState("");
      const [genderError, setgenderError] = useState("");
      const [dayError, setdayError] = useState("");
      const [monthError, setmonthError] = useState("");
      const [yearError, setyearError] = useState("");
      const checkInfo = () => {
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
        if (userInfo.day == "Select Day") {
          setdayError("This field is required");
        }
        if (userInfo.month == 0) {
          setmonthError("This field is required");
        }
        if (userInfo.year == "Select Year") {
          setyearError("This field is required");
        }
        if (
          userInfo.email != "" &&
          userInfo.password != "" &&
          userInfo.confirmPassword != "" &&
          userInfo.password === userInfo.confirmPassword &&
          userInfo.firstname != "" &&
          userInfo.lastname != "" &&
          userInfo.phoneNumber != "" &&
          userInfo.gender != "Select Gender" &&
          userInfo.day != "Select Day" &&
          userInfo.month != 0 &&
          userInfo.year != "Select Year"
        ) {
          handleNext();
        }
      };
      return (
        <Fragment>
          <Box>
            <Box className={classes.header}>Information</Box>
            <Box className={classes.context}>
              <Box className={classes.genInfo}>
                <Box className={classes.contextHeader}>General Information</Box>
                <Box className={classes.textFieldBox}>
                  <TextField
                    id="phoneNumber"
                    placeholder="Phone Number"
                    variant="outlined"
                    sx={{ borderRadius: "10px" }}
                    readOnly
                    fullWidth
                    value={userInfo.phoneNumber}
                  />
                </Box>
                <Box className={classes.textFieldBox}>
                  <TextField
                    id="password"
                    variant="outlined"
                    type="password"
                    placeholder="Password"
                    fullWidth
                    value={userInfo.password}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, password: e.target.value });
                    }}
                  />
                </Box>

                <Box className={classes.textFieldBox}>
                  <TextField
                    id="confirmPassword"
                    type="password"
                    variant="outlined"
                    placeholder="Confirm your password"
                    fullWidth
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        confirmPassword: e.target.value,
                      });
                    }}
                  />
                </Box>

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
                      value={userInfo.firstname}
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, firstname: e.target.value });
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
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, lastname: e.target.value });
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
                    <Box
                      className={classes.error}
                      style={{ marginRight: "3%" }}
                    >
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
                    id="email"
                    variant="outlined"
                    placeholder="Email"
                    fullWidth
                    value={userInfo.email}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, email: e.target.value });
                    }}
                  />
                </Box>
              </Box>
              <Box className={classes.gender}>
                <Box className={classes.contextHeader}>Gender</Box>
                <Box className={classes.textFieldBox} style={{ width: "30%" }}>
                  <TextField
                    id="gender"
                    variant="outlined"
                    sx={{ borderRadius: "10px" }}
                    fullWidth
                    select
                    value={userInfo.gender}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, gender: e.target.value });
                    }}
                  >
                    {genders.map((gender) => (
                      <MenuItem key={gender.id} value={gender.value}>
                        {gender.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
              <Box className={classes.birthdate}>
                <Box className={classes.contextHeader}>Birthdate</Box>
                <Box className={classes.birthdateSelect}>
                  <Box
                    className={classes.textFieldBox}
                    style={{ width: "30%" }}
                  >
                    <TextField
                      id="day"
                      variant="outlined"
                      sx={{ borderRadius: "10px" }}
                      fullWidth
                      select
                      value={userInfo.day}
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, day: e.target.value });
                      }}
                    >
                      {days.map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Box
                    className={classes.textFieldBox}
                    style={{ width: "30%" }}
                  >
                    <TextField
                      id="month"
                      variant="outlined"
                      sx={{ borderRadius: "10px" }}
                      fullWidth
                      select
                      value={userInfo.month}
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, month: e.target.value });
                      }}
                    >
                      {months.map((month) => (
                        <MenuItem key={month.id} value={month.id}>
                          {month.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Box
                    className={classes.textFieldBox}
                    style={{ width: "30%" }}
                  >
                    <TextField
                      id="year"
                      variant="outlined"
                      sx={{ borderRadius: "10px" }}
                      fullWidth
                      select
                      value={userInfo.year}
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, year: e.target.value });
                      }}
                    >
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.button}>
              <CButton
                title="Next"
                onClick={checkPassword}
                width="470px"
                height="55px"
              />
            </Box>
          </Box>
        </Fragment>
      );
    }

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
        marginBottom: "40px",
      },
      textField: {
        marginBottom: "40px",
      },
      textFieldBox: {
        marginBottom: "35px",
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
      },
      button: {
        display: "flex",
        justifyContent: "center",
        margin: "70px 0 180px 0",
      },
    });
  };
};
export default RegisterInformation;