import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";

const ContactInfo = ({ userInfo }) => {
  const classes = useStyles();
  const address =
    userInfo.customer_address[0].address_id_from_customer_address.address_line +
    ", " +
    userInfo.customer_address[0].address_id_from_customer_address.sub_district +
    ", " +
    userInfo.customer_address[0].address_id_from_customer_address.district +
    ", " +
    userInfo.customer_address[0].address_id_from_customer_address.province +
    " " +
    userInfo.customer_address[0].address_id_from_customer_address.postal_code;
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
          <Typography sx={infoDetail}>
            {userInfo.customer_info.phone_number}
          </Typography>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Email</Typography>
          </Grid>
          <Typography sx={infoDetail}>{userInfo.email}</Typography>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Primary Address</Typography>
          </Grid>
          <Typography sx={infoDetail}>{address}</Typography>
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
