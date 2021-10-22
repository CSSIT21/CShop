import React, { Fragment, useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import CButton from "../../common/components/CButton";
const genders = [
  { id: 0, value: "Select gender" },
  { id: 1, value: "Male" },
  { id: 2, value: "Female" },
  { id: 3, value: "Others" },
];
const years = [
  "Select year",
  ...[...Array(150)].map((year, idx) => new Date().getFullYear() - 149 + idx),
];
const months = [
  {
    id: 0,
    label: "Select month",
  },
  ...[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((label, id) => ({ id: id + 1, label })),
];
const days = ["Select day", ...[...Array(31)].map((day, idx) => 1 + idx)];
const RegisterInformation = () => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({
    phoneNumber: "099-257-3398",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    email: "",
    gender: genders[0].value,
    year: years[0],
    month: months[0].id,
    day: days[0],
  });

  return (
    <Fragment>
      <div>
        <div className={classes.header}>Information</div>
        <div className={classes.context}>
          <div className={classes.genInfo}>
            <div className={classes.contextHeader}>General Information</div>
            <div className={classes.textFieldBox}>
              <TextField
                id="phoneNumber"
                placeholder="Phone Number"
                variant="outlined"
                sx={{ borderRadius: "10px" }}
                disabled
                fullWidth
                value={userInfo.phoneNumber}
              />
            </div>
            <div className={classes.textFieldBox}>
              <TextField
                id="password"
                variant="outlined"
                placeholder="Password"
                fullWidth
                onChange={(e) => {
                  setUserInfo({ ...userInfo, password: e.target.value });
                }}
              />
            </div>

            <div className={classes.textFieldBox}>
              <TextField
                id="confirmPassword"
                variant="outlined"
                placeholder="Confirm your password"
                fullWidth
                onChange={(e) => {
                  setUserInfo({ ...userInfo, confirmPassword: e.target.value });
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                className={classes.textFieldBox}
                style={{ marginRight: "10px" }}
              >
                <TextField
                  id="firstname"
                  variant="outlined"
                  placeholder="Firstname"
                  fullWidth
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, firstname: e.target.value });
                  }}
                />
              </div>
              <div
                className={classes.textFieldBox}
                style={{ marginLeft: "10px" }}
              >
                <TextField
                  id="lastname"
                  variant="outlined"
                  placeholder="Lastname"
                  fullWidth
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, lastname: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className={classes.textFieldBox}>
              <TextField
                id="email"
                variant="outlined"
                placeholder="Email"
                fullWidth
                onChange={(e) => {
                  setUserInfo({ ...userInfo, email: e.target.value });
                }}
              />
            </div>
          </div>
          <div className={classes.gender}>
            <div className={classes.contextHeader}>Gender</div>
            <div className={classes.textFieldBox} style={{ width: "30%" }}>
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
                    {gender.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className={classes.birthdate}>
            <div className={classes.contextHeader}>Birthdate</div>
            <div className={classes.birthdateSelect}>
              <div className={classes.textFieldBox} style={{ width: "30%" }}>
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
              </div>
              <div className={classes.textFieldBox} style={{ width: "30%" }}>
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
              </div>
              <div className={classes.textFieldBox} style={{ width: "30%" }}>
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
              </div>
            </div>
          </div>
        </div>
        <CButton title="Check info" onClick={() => console.log(userInfo)} />
      </div>
    </Fragment>
  );
};

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: 600,
    margin: "6% 0%",
  },
  context: {
    padding: "0 12%",
  },
  genInfo: {
    display: "flex",
    flexDirection: "column",
  },
  contextHeader: {
    fontSize: "24px",
    marginBottom: "40px",
  },

  textField: {
    marginBottom: "40px",
  },
  textFieldBox: {
    marginBottom: "40px",
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
});

export default RegisterInformation;
