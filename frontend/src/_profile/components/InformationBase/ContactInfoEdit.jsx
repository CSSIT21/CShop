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
            .filter(
              (el) =>
                el.province ===
                editInfo.customer_address.address_id_from_customer_address
                  .province
            )
            .map((el) => el.district)
        ),
      ].sort()
    );
    setSubDistrict(
      [
        ...new Set(
          fetchedData.data
            .filter(
              (el) =>
                el.district ===
                editInfo.customer_address.address_id_from_customer_address
                  .district
            )
            .map((el) => el.subDistrict)
        ),
      ].sort()
    );
    setPostalCode(
      [
        ...new Set(
          fetchedData.data
            .filter(
              (el) =>
                el.subDistrict ==
                editInfo.customer_address.address_id_from_customer_address
                  .sub_district
            )
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
            .filter(
              (el) =>
                el.province ===
                editInfo.customer_address.address_id_from_customer_address
                  .province
            )
            .map((el) => el.district)
        ),
      ].sort()
    );
    seteditInfo({
      ...editInfo,
      customer_address: {
        ...editInfo.customer_address,
        address_id_from_customer_address: {
          ...editInfo.customer_address.address_id_from_customer_address,
          sub_district: "",
          postal_code: "",
        },
      },
    });
  }, [editInfo.customer_address.address_id_from_customer_address.province]);
  useEffect(() => {
    setSubDistrict(
      [
        ...new Set(
          addressData
            .filter(
              (el) =>
                el.district ===
                editInfo.customer_address.address_id_from_customer_address
                  .district
            )
            .map((el) => el.subDistrict)
        ),
      ].sort()
    );
    seteditInfo({
      ...editInfo,
      customer_address: {
        ...editInfo.customer_address,
        address_id_from_customer_address: {
          ...editInfo.customer_address.address_id_from_customer_address,
          postal_code: "",
        },
      },
    });
  }, [editInfo.customer_address.address_id_from_customer_address.district]);
  useEffect(() => {
    setPostalCode(
      [
        ...new Set(
          addressData
            .filter(
              (el) =>
                el.subDistrict ===
                editInfo.customer_address.address_id_from_customer_address
                  .sub_district
            )
            .map((el) => el.Zipcode)
        ),
      ].sort()
    );
    seteditInfo({
      ...editInfo,
      customer_address: {
        ...editInfo.customer_address,
        address_id_from_customer_address: {
          ...editInfo.customer_address.address_id_from_customer_address,
          postal_code:
            editInfo.customer_address.address_id_from_customer_address
              .postal_code,
        },
      },
    });
  }, [editInfo.customer_address.address_id_from_customer_address.sub_district]);

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
          <TextField
            id="phoneNumber"
            variant="outlined"
            sx={textField}
            value={editInfo.customer_info.phone_number}
            onChange={(e) => {
              seteditInfo({
                ...editInfo,
                customer_info: {
                  ...editInfo.customer_info,
                  phone_number: e.target.value,
                },
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
              value={
                editInfo.customer_address.address_id_from_customer_address
                  .address_line
              }
              multiline
              rows={5}
              sx={addressTextField}
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  customer_address: {
                    ...editInfo.customer_address,
                    address_id_from_customer_address: {
                      ...editInfo.customer_address
                        .address_id_from_customer_address,
                      address_line: e.target.value,
                    },
                  },
                });
              }}
            />
            <TextField
              id="province"
              variant="outlined"
              select
              sx={addressTextField}
              value={
                editInfo.customer_address.address_id_from_customer_address
                  .province
              }
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  customer_address: {
                    ...editInfo.customer_address,
                    address_id_from_customer_address: {
                      ...editInfo.customer_address
                        .address_id_from_customer_address,
                      province: e.target.value,
                    },
                  },
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
              value={
                editInfo.customer_address.address_id_from_customer_address
                  .district
              }
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  customer_address: {
                    ...editInfo.customer_address,
                    address_id_from_customer_address: {
                      ...editInfo.customer_address
                        .address_id_from_customer_address,
                      district: e.target.value,
                    },
                  },
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
              value={
                editInfo.customer_address.address_id_from_customer_address
                  .sub_district
              }
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  customer_address: {
                    ...editInfo.customer_address,
                    address_id_from_customer_address: {
                      ...editInfo.customer_address
                        .address_id_from_customer_address,
                      sub_district: e.target.value,
                    },
                  },
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
              value={
                editInfo.customer_address.address_id_from_customer_address
                  .postal_code
              }
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  customer_address: {
                    ...editInfo.customer_address,
                    address_id_from_customer_address: {
                      ...editInfo.customer_address
                        .address_id_from_customer_address,
                      postal_code: e.target.value,
                    },
                  },
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
