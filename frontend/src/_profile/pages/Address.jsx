import { Typography, Button, TextField, MenuItem, Grid } from "@mui/material";
import AddressInfo from "../components/AddressBase/AddressInfo";
import TopProfile from "../components/TopProfile";
import AccordionCommon from "~/common/components/AccordionCommon";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import axios from "axios";
import GridTitle from "../components/AddressBase/GridTitle";
import { useRecoilValue } from "recoil";
import authState from "../../common/store/authState";
import Swal from "sweetalert2";
import LoadingButton from "@mui/lab/LoadingButton";
import config from "~/common/constants";

const AddressPage = () => {
  const classes = useStyles();
  const [address, setAddress] = useState([]);
  const [openAddress, setopenAddress] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);
  const [postalCode, setPostalCode] = useState([]);
  const auth = useRecoilValue(authState);
  const [userAddress, setuserAddress] = useState({
    id: auth.user.id,
    recipient: "",
    phoneNumber: "",
    addressLine: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const addNewAddress = () => {
    console.log(userAddress);
    if (
      userAddress.recipient &&
      userAddress.phoneNumber &&
      userAddress.addressLine &&
      userAddress.province &&
      userAddress.district &&
      userAddress.subDistrict &&
      userAddress.postalCode
    ) {
      setIsLoading(true);
      axios
        .post(config.SERVER_URL + "/profile/address/add", userAddress)
        .then(({ data }) => {
          if (data.success) {
            Swal.fire({
              title: "Success!",
              text: "Your address has been added!",
              icon: "success",
              timer: 3000,
            });
            axios
              .post(config.SERVER_URL + "/profile/address/get", {
                id: auth.user.id,
              })
              .then(({ data }) => {
                setAddress(data.address);
              });
            clearAddress();
          } else {
            Swal.fire({
              title: "Failed!",
              text: "Please check if all information has been filled out!",
              icon: "error",
              confirmButtonText: "OK",
              timer: 4000,
            });
          }
          setIsLoading(false);
        });
    } else {
      Swal.fire({
        title: "Failed!",
        text: "Please check if all information has been filled out!",
        icon: "error",
        confirmButtonText: "OK",
        timer: 4000,
      });
    }
  };
  const clearAddress = () => {
    setuserAddress({
      ...userAddress,
      recipient: "",
      phoneNumber: "",
      addressLine: "",
      province: "",
      district: "",
      subDistrict: "",
      postalCode: "",
    });
  };

  const getData = async () => {
    const fetchedData = await axios.get(
      "https://cshop-mock.mixkoap.com/thailand.json"
    );
    setAddressData(fetchedData.data);
    setProvince([...new Set(fetchedData.data.map((el) => el.province))].sort());
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setDistrict(
      [
        ...new Set(
          addressData
            .filter((el) => el.province === userAddress.province)
            .map((el) => el.district)
        ),
      ].sort()
    );
    setuserAddress({
      ...userAddress,
      district: "",
      subDistrict: "",
      postalCode: "",
    });
  }, [userAddress.province]);

  useEffect(() => {
    setSubDistrict(
      [
        ...new Set(
          addressData
            .filter((el) => el.district === userAddress.district)
            .map((el) => el.subDistrict)
        ),
      ].sort()
    );
    setuserAddress({ ...userAddress, subDistrict: "", postalCode: "" });
  }, [userAddress.district]);

  useEffect(() => {
    setPostalCode(
      [
        ...new Set(
          addressData
            .filter((el) => el.subDistrict === userAddress.subDistrict)
            .map((el) => el.Zipcode)
        ),
      ].sort()
    );
  }, [userAddress.subDistrict]);
  return (
    <>
      <TopProfile />
      <Box className={classes.body}>
        <Box className={classes.container}>
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "600",
              margin: "72px auto",
            }}
          >
            Address Management
          </Typography>
          <AccordionCommon
            title="Add New Address"
            subTitle="Please check the correct address and phone number registration
            for accurate and fast delivery"
            open={openAddress}
            setOpen={setopenAddress}
          >
            <Box sx={{ marginBottom: "24px" }}>
              <Grid container>
                <GridTitle title="Recipient's Name" />
                <Grid item xs={8}>
                  <TextField
                    sx={textField}
                    variant="outlined"
                    value={userAddress.recipient}
                    placeholder="Recipient's Name"
                    onChange={(e) => {
                      setuserAddress({
                        ...userAddress,
                        recipient: e.target.value,
                      });
                    }}
                  ></TextField>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ marginBottom: "24px" }}>
              <Grid container>
                <GridTitle title="Address" />
                <Grid item xs={8}>
                  <TextField
                    sx={textField}
                    variant="outlined"
                    placeholder="Address"
                    multiline
                    rows={5}
                    value={userAddress.addressLine}
                    onChange={(e) => {
                      setuserAddress({
                        ...userAddress,
                        addressLine: e.target.value,
                      });
                    }}
                  ></TextField>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ marginBottom: "24px" }}>
              <Grid container>
                <GridTitle title="Province" />
                <Grid item xs={8}>
                  <TextField
                    sx={textField}
                    variant="outlined"
                    select
                    label="Select Province"
                    value={userAddress.province}
                    onChange={(e) => {
                      setuserAddress({
                        ...userAddress,
                        province: e.target.value,
                      });
                    }}
                  >
                    {province.map((data, idx) => {
                      return (
                        <MenuItem key={idx} value={data}>
                          {data}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ marginBottom: "24px" }}>
              <Grid container>
                <GridTitle title="District" />
                <Grid item xs={8}>
                  <TextField
                    sx={textField}
                    variant="outlined"
                    select
                    label="Select District"
                    value={userAddress.district}
                    onChange={(e) => {
                      setuserAddress({
                        ...userAddress,
                        district: e.target.value,
                      });
                    }}
                  >
                    {district.map((data, idx) => {
                      return (
                        <MenuItem key={idx} value={data}>
                          {data}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ marginBottom: "24px" }}>
              <Grid container>
                <GridTitle title="Sub District" />
                <Grid item xs={8}>
                  <TextField
                    sx={textField}
                    variant="outlined"
                    select
                    label="Select Sub District"
                    value={userAddress.subDistrict}
                    onChange={(e) => {
                      setuserAddress({
                        ...userAddress,
                        subDistrict: e.target.value,
                      });
                    }}
                  >
                    {subDistrict.map((data, idx) => {
                      return (
                        <MenuItem key={idx} value={data}>
                          {data}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ marginBottom: "24px" }}>
              <Grid container>
                <GridTitle title="Postal Code" />
                <Grid item xs={8}>
                  <TextField
                    sx={textField}
                    variant="outlined"
                    select
                    label="Select Postal Code"
                    value={userAddress.postalCode}
                    onChange={(e) => {
                      setuserAddress({
                        ...userAddress,
                        postalCode: e.target.value,
                      });
                    }}
                  >
                    {postalCode.map((data, idx) => {
                      return (
                        <MenuItem key={idx} value={data}>
                          {data}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ marginBottom: "24px" }}>
              <Grid container>
                <GridTitle title="Phone Number" />
                <Grid item xs={8}>
                  <TextField
                    sx={textField}
                    variant="outlined"
                    value={userAddress.phoneNumber}
                    placeholder="Phone Number"
                    onChange={(e) => {
                      setuserAddress({
                        ...userAddress,
                        phoneNumber: e.target.value.slice(0, 10),
                      });
                    }}
                  ></TextField>
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.buttonGroup}>
              {!isLoading ? (
                <Button
                  className={classes.button}
                  variant="contained"
                  sx={{
                    height: "45px",
                    textTransform: "capitalize",
                    fontSize: "16px",
                  }}
                  onClick={addNewAddress}
                >
                  Add
                </Button>
              ) : (
                <LoadingButton
                  loading
                  variant="contained"
                  className={classes.button}
                ></LoadingButton>
              )}
              <Button
                className={classes.button}
                sx={{
                  marginLeft: "24px",
                  height: "45px",
                  textTransform: "capitalize",
                  fontSize: "16px",
                }}
                variant="outlined"
                onClick={clearAddress}
              >
                Cancel
              </Button>
            </Box>
          </AccordionCommon>
          <AddressInfo address={address} setAddress={setAddress} />
        </Box>
      </Box>
    </>
  );
};
const useStyles = makeStyles({
  body: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
    "@media (max-width:780px)": {
      width: "100%",
    },
  },
  buttonGroup: {
    margin: "56px 0",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    width: "100px",
  },
});

export default AddressPage;
const textField = {
  width: "60%",
};
