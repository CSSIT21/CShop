import { Grid, Typography, TextField, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { genders } from "../../../common/constants/register";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const PersonalInfoEdit = ({ editInfo, seteditInfo = () => {} }) => {
  const classes = useStyles();
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
              value={editInfo.customer_info.firstname}
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  customer_info: {
                    ...editInfo.customer_info,
                    firstname: e.target.value,
                  },
                });
              }}
            />
            <TextField
              id="lastname"
              variant="outlined"
              placeholder="Lastname"
              sx={{ width: "48%" }}
              value={editInfo.customer_info.lastname}
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  customer_info: {
                    ...editInfo.customer_info,
                    lastname: e.target.value,
                  },
                });
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
            sx={{ width: "20%" }}
            value={editInfo.customer_info.gender}
            onChange={(e) => {
              seteditInfo({
                ...editInfo,
                customer_info: {
                  ...editInfo.customer_info,
                  gender: e.target.value,
                },
              });
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
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                value={editInfo.customer_info.birthdate}
                renderInput={(params) => <TextField {...params} />}
                onChange={(e) => {
                  seteditInfo({
                    ...editInfo,
                    customer_info: {
                      ...editInfo.customer_info,
                      birthdate: e.toISOString(),
                    },
                  });
                }}
              />
            </LocalizationProvider>
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
