import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";

const PersonalInfo = ({ userInfo }) => {
  const classes = useStyles();
  const birthdate = userInfo.day + "/" + userInfo.month + "/" + userInfo.year;
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
          <Typography sx={infoDetail}>
            {userInfo.first_name} {userInfo.last_name}
          </Typography>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Gender</Typography>
          </Grid>
          <Typography sx={infoDetail}>{userInfo.gender} </Typography>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Birthdate</Typography>
          </Grid>
          <Typography sx={infoDetail}>{birthdate}</Typography>
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
});
const infoTitle = {
  fontSize: "24px",
  fontWeight: "500",
  color: "#FD6637",
};
const infoDetail = {
  fontSize: "24px",
  fontWeight: "400",
};
export default PersonalInfo;
