import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Grid, Typography, TextField, MenuItem } from "@mui/material";
import axios from "axios";

const ContactInfoEdit = ({
  editInfo,
  confirmPassword,
  seteditInfo = () => {},
  setConfirmPassword = () => {},
}) => {
  const classes = useStyles();

  const [addressData, setAddressData] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);
  const [postalCode, setPostalCode] = useState([]);
  const getData = async () => {
    const fetchedData = await axios.get(
      "https://cshop-mock.mixkoap.com/thailand.json"
    );
    setAddressData(fetchedData.data);
    setProvince([...new Set(fetchedData.data.map((el) => el.province))].sort());
    setDistrict(
      [
        ...new Set(
          fetchedData.data
            .filter((el) => el.province === editInfo.province)
            .map((el) => el.district)
        ),
      ].sort()
    );
    setSubDistrict(
      [
        ...new Set(
          fetchedData.data
            .filter((el) => el.district === editInfo.district)
            .map((el) => el.subDistrict)
        ),
      ].sort()
    );
    setPostalCode(
      [
        ...new Set(
          fetchedData.data
            .filter((el) => el.subDistrict == editInfo.subDistrict)
            .map((el) => "" + el.Zipcode)
        ),
      ].sort()
    );
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setDistrict(
      [
        ...new Set(
          addressData
            .filter((el) => el.province === editInfo.province)
            .map((el) => el.district)
        ),
      ].sort()
    );
    seteditInfo({ ...editInfo, district: "" });
  }, [editInfo.province]);
  useEffect(() => {
    setSubDistrict(
      [
        ...new Set(
          addressData
            .filter((el) => el.district === editInfo.district)
            .map((el) => el.subDistrict)
        ),
      ].sort()
    );
    seteditInfo({ ...editInfo, subDistrict: "" });
  }, [editInfo.district]);
  useEffect(() => {
    setPostalCode(
      [
        ...new Set(
          addressData
            .filter((el) => el.subDistrict === editInfo.subDistrict)
            .map((el) => el.Zipcode)
        ),
      ].sort()
    );
    seteditInfo({ ...editInfo });
  }, [editInfo.subDistrict]);

  return (
    <>
      <Box className={classes.container}>
        <Typography
          sx={{ fontSize: "24px", fontWeight: "600", margin: "50px 0" }}
        >
          Contact Personal
        </Typography>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Phone Number</Typography>
          </Grid>
          <TextField
            id="phoneNumber"
            variant="outlined"
            sx={textField}
            value={editInfo.phoneNumber}
            onChange={(e) => {
              seteditInfo({
                ...editInfo,
                phoneNumber: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Email</Typography>
          </Grid>
          <TextField
            id="email"
            variant="outlined"
            sx={textField}
            value={editInfo.email}
            onChange={(e) => {
              seteditInfo({
                ...editInfo,
                email: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Confirm Password</Typography>
          </Grid>
          <TextField
            id="confirmPassword"
            variant="outlined"
            sx={textField}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Primary Address</Typography>
          </Grid>
          <Box className={classes.address}>
            <TextField
              id="addressLine"
              variant="outlined"
              placeholder="Address"
              value={editInfo.addressLine}
              multiline
              rows={5}
              sx={addressTextField}
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  addressLine: e.target.value,
                });
              }}
            />
            <TextField
              id="province"
              variant="outlined"
              select
              sx={addressTextField}
              value={editInfo.province}
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  province: e.target.value,
                });
              }}
            >
              {province.map((data, idx) => (
                <MenuItem key={idx} value={data}>
                  {data}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="district"
              variant="outlined"
              select
              sx={addressTextField}
              value={editInfo.district}
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  district: e.target.value,
                });
              }}
            >
              {district.map((data, idx) => (
                <MenuItem key={idx} value={data}>
                  {data}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="subDistrict"
              variant="outlined"
              select
              sx={addressTextField}
              value={editInfo.subDistrict}
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  subDistrict: e.target.value,
                });
              }}
            >
              {subDistrict.map((data, idx) => (
                <MenuItem key={idx} value={data}>
                  {data}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="postalCode"
              variant="outlined"
              sx={addressTextField}
              select
              value={editInfo.postalCode}
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  postalCode: e.target.value,
                });
              }}
            >
              {postalCode.map((data, idx) => (
                <MenuItem key={idx} value={data}>
                  {data}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default ContactInfoEdit;

const useStyles = makeStyles({
  container: {
    fontSize: "24px",
    fontWeight: "500",
  },
  grid: {
    marginBottom: "35px",
  },
  address: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
  },
});

const infoTitle = {
  fontSize: "24px",
  fontWeight: "500",
  color: "#FD6637",
};
const textField = {
  width: "35%",
};
const addressTextField = {
  width: "58.25%",
  marginBottom: "25px",
};
