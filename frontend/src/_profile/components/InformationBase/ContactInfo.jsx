import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import authState from "../../../common/store/authState";
import { useRecoilValue } from "recoil";

const ContactInfo = () => {
  const classes = useStyles();
  const auth = useRecoilValue(authState);
  return (
    <>
      <Box className={classes.container}>
        <Typography
          sx={{ fontSize: "24px", fontWeight: "600", margin: "50px 0" }}
        >
          Contact Information
        </Typography>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Phone Number</Typography>
          </Grid>
          <Typography sx={infoDetail}>{auth.user.contact}</Typography>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Email</Typography>
          </Grid>
          <Typography sx={infoDetail}>{auth.user.email}</Typography>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Primary Address</Typography>
          </Grid>
          <Typography sx={infoDetail}>This mock address</Typography>
        </Grid>
      </Box>
    </>
  );
};

export default ContactInfo;
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
