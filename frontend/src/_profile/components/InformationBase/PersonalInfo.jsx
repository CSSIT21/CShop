import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import authState from "../../../common/store/authState";
import { useRecoilValue } from "recoil";

const PersonalInfo = () => {
  const classes = useStyles();
  const auth = useRecoilValue(authState);

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
            {auth.user.first_name} {auth.user.last_name}
          </Typography>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Gender</Typography>
          </Grid>
          <Typography sx={infoDetail}>Female</Typography>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Birthdate</Typography>
          </Grid>
          <Typography sx={infoDetail}>DD/MM/YYYY</Typography>
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
