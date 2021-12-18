import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";

const PersonalInfo = ({ userInfo }) => {
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
          <Typography sx={infoDetail}>
            {userInfo.customer_info.firstname} {userInfo.customer_info.lastname}
          </Typography>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Gender</Typography>
          </Grid>
          <Typography sx={infoDetail}>
            {userInfo.customer_info.gender === "PreferNotToSay"
              ? "Prefer not to say"
              : userInfo.customer_info.gender}
          </Typography>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Birthdate</Typography>
          </Grid>
          <Typography sx={infoDetail}>
            {userInfo.customer_info.birthdate.split("T")[0]}
          </Typography>
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
