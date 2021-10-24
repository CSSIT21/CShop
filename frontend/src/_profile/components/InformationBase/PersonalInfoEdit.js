import { useState } from "react";
import { Grid, Typography, TextField, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import authState from "../../../common/store/authState";
import { useRecoilState } from "recoil";
import {
  years,
  months,
  days,
  genders,
} from "../../../common/constants/register";

const PersonalInfoEdit = () => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useRecoilState(authState);
  const [first_name, setFirst_name] = useState(userInfo.user.first_name);
  const [last_name, setLast_name] = useState(userInfo.user.last_name);
  const [gender, setGender] = useState(userInfo.user.gender);

  return (
    <>
      <Box className={classes.container}>
        <Typography
          sx={{ fontSize: "24px", fontWeight: "600", marginBottom: "50px" }}
        >
          Personal Information
        </Typography>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Name</Typography>
          </Grid>
          <Box
            style={{
              display: "flex",
              width: "60%",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="firstname"
              variant="outlined"
              placeholder="Firstname"
              sx={{ width: "48%" }}
              value={first_name}
              onChange={(e) => {
                setFirst_name(e.target.value);
              }}
            />
            <TextField
              id="lastname"
              variant="outlined"
              placeholder="Lastname"
              sx={{ width: "48%" }}
              value={last_name}
              onChange={(e) => {
                setLast_name(e.target.value);
              }}
            />
          </Box>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Gender</Typography>
          </Grid>
          <TextField
            id="gender"
            variant="outlined"
            select
            sx={{ width: "13.5%" }}
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            {genders.map((gender) => (
              <MenuItem key={gender.id} value={gender.value}>
                {gender.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Birthdate</Typography>
          </Grid>
          <Box className={classes.birthdateSelect}>
            <Box className={classes.textFieldBox} style={dateTextField}>
              <TextField
                id="day"
                variant="outlined"
                sx={textField}
                select
                value={days[0]}
                // onChange={(e) => {
                //   setUserInfo({ ...userInfo, day: e.target.value });
                // }}
              >
                {days.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.textFieldBox} style={dateTextField}>
              <TextField
                id="month"
                variant="outlined"
                sx={textField}
                select
                value={months[0].id}
                // onChange={(e) => {
                //   setUserInfo({ ...userInfo, month: e.target.value });
                // }}
              >
                {months.map((month) => (
                  <MenuItem key={month.id} value={month.id}>
                    {month.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.textFieldBox} style={dateTextField}>
              <TextField
                id="year"
                variant="outlined"
                sx={textField}
                select
                value={years[0]}
                // onChange={(e) => {
                //   setUserInfo({ ...userInfo, year: e.target.value });
                // }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

const useStyles = makeStyles({
  container: {
    fontSize: "24px",
    fontWeight: "500",
  },
  grid: {
    marginBottom: "45px",
  },
  birthdateSelect: {
    display: "flex",
    width: "60%",
  },
});
const infoTitle = {
  fontSize: "24px",
  fontWeight: "500",
  color: "#FD6637",
};
const textField = {
  borderRadius: "10px",
  width: "90%",
};
const dateTextField = {
  width: "25%",
};
export default PersonalInfoEdit;
