import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { years, months, days, genders } from "../../common/constants/register";
import { useRecoilState } from "recoil";
import registerState from "../../common/store/registerState";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useHistory } from "react-router-dom";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const SellerRegister = ({}) => {
  const classes = useStyles();
  const router = useHistory();
  const [userInfo, setUserInfo] = useRecoilState(registerState);
  const [passwordError, setpasswordError] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");
  const [fnError, setfnError] = useState("");
  const [lnError, setlnError] = useState("");
  const [phoneNumError, setphoneNumError] = useState("");
  const [genderError, setgenderError] = useState("");

  const [addressLineError, setaddressLineError] = useState("");
  const [provinceError, setprovinceError] = useState("");
  const [districtError, setdistrictError] = useState("");
  const [subDistrictError, setsubDistrictError] = useState("");
  const [postalCodeError, setpostalCodeError] = useState("");

  const [nameError, setNameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");
  const checkInfo = () => {
    if (userInfo.email == "") {
      Swal.fire({
        title: "Register Error!",
        text: "Please proceed back to enter email",
        icon: "error",
        confirmButtonText: "OK",
      });
      router.push("/register");
    }
    if (sellerInfo.subDistrict == "") {
      setsubDistrictError("This field is required");
    }
    if (sellerInfo.district == "") {
      setdistrictError("This field is required");
    }
    if (sellerInfo.province == "") {
      setprovinceError("This field is required");
    }
    if (sellerInfo.postalCode == "") {
      setpostalCodeError("This field is required");
    }
    if (sellerInfo.bankInfo.name == "") {
      setNameError("This field is required");
    }
    if (sellerInfo.bankInfo.firstName == "") {
      setFirstNameError("This field is required");
    }
    if (sellerInfo.bankInfo.lastName == "") {
      setLastnameError("This field is required");
    }
    if (sellerInfo.bankInfo.accountNumber == "") {
      setAccountNumberError("This field is required");
    }
    if (
      userInfo.email != "" &&
      userInfo.password != "" &&
      userInfo.confirmPassword != "" &&
      userInfo.password === userInfo.confirmPassword &&
      userInfo.firstname != "" &&
      userInfo.lastname != "" &&
      userInfo.phoneNumber != "" &&
      userInfo.gender != "Select Gender" &&
      userInfo.url != ""
    ) {
      handleNext();
    } else {
      Swal.fire({
        title: "Failed!",
        text: "Please check if all of your information have been filled",
        icon: "error",
        timer: 2000,
      });
    }
  };
  const uploadFile = async (e) => {
    if (e.target.files.length) {
      const path = URL.createObjectURL(e.target.files[0]);
      setUserInfo({
        ...userInfo,
        url: path,
        title: e.target.files[0].name.slice(0, 50),
        file: e.target.files[0],
      });
    }
  };
  return (
    <Box sx={{ width: "70%", margin: "0 auto" }}>
      <Box className={classes.header}>Become Partner with us</Box>
      {state ? (
        <Box className={classes.context}>
          <Box className={classes.genInfo} component="form">
            <Box className={classes.contextHeader}>Shop Information</Box>

            <Box className={classes.textFieldBox}>
              <TextField
                id="shopname"
                variant="outlined"
                type="text"
                placeholder="Shop's Name"
                fullWidth
                error={shopNameError.length === 0 ? false : true}
                value={sellerInfo.shopName}
                onChange={(e) => {
                  setSellerInfo({ ...sellerInfo, shopName: e.target.value });
                  setShopNameError("");
                }}
              />
            </Box>
            {shopNameError.length != 0 && (
              <Box className={classes.error}>{shopNameError}</Box>
            )}
            <Box className={classes.textFieldBox}>
              <TextField
                id="phone"
                type="tel"
                variant="outlined"
                placeholder="Phone"
                fullWidth
                value={sellerInfo.phone}
                error={phoneError.length === 0 ? false : true}
                onChange={(e) => {
                  setSellerInfo({
                    ...sellerInfo,
                    phone: e.target.value.slice(0, 10),
                  });
                  setPhoneError("");
                }}
              />
            </Box>
            {phoneError.length != 0 && (
              <Box className={classes.error}>{phoneError}</Box>
            )}
            <Box
              sx={{
                display: "flex",
                width: "60%",
                justifyContent: "space-between",
              }}
              className={classes.textFieldBox}
            >
              <TextField type="file" sx={{ width: "80%" }} />
              <Button
                variant="contained"
                style={{
                  textTransform: "capitalize",
                }}
              >
                Upload
              </Button>
            </Box>

            <Box>
              <Box className={classes.contextHeader}>Address</Box>
              <Box
                className={classes.textFieldBox}
                sx={{ marginBottom: "35px" }}
              >
                <TextField
                  id="addressLine"
                  variant="outlined"
                  placeholder="Address"
                  fullWidth
                  multiline
                  rows={5}
                  error={addressLineError.length === 0 ? false : true}
                  value={sellerInfo.addressLine}
                  onChange={(e) => {
                    setSellerInfo({
                      ...sellerInfo,
                      address: e.target.value,
                    });
                    setaddressLineError("");
                  }}
                />
                {addressLineError.length != 0 && (
                  <Box className={classes.error}>{addressLineError}</Box>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid className={classes.textFieldBox} item xs={6}>
                  <TextField
                    id="province"
                    variant="outlined"
                    sx={{ borderRadius: "10px" }}
                    fullWidth
                    select
                    label="Select Province"
                    error={provinceError.length === 0 ? false : true}
                    value={sellerInfo.province}
                    onChange={(e) => {
                      setSellerInfo({
                        ...sellerInfo,
                        province: e.target.value,
                      });
                      setprovinceError("");
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
                  {provinceError.length != 0 && (
                    <Box className={classes.error}>{provinceError}</Box>
                  )}
                </Grid>
                <Grid className={classes.textFieldBox} item xs={6}>
                  <TextField
                    id="district"
                    variant="outlined"
                    sx={{ borderRadius: "10px" }}
                    fullWidth
                    select
                    label="Select District"
                    error={districtError.length === 0 ? false : true}
                    value={sellerInfo.district}
                    onChange={(e) => {
                      setSellerInfo({
                        ...sellerInfo,
                        district: e.target.value,
                      });
                      setdistrictError("");
                    }}
                  >
                    {district.map((data, idx) => (
                      <MenuItem key={idx} value={data}>
                        {data}
                      </MenuItem>
                    ))}
                  </TextField>
                  {districtError.length != 0 && (
                    <Box className={classes.error}>{districtError}</Box>
                  )}
                </Grid>
                <Grid className={classes.textFieldBox} item xs={6}>
                  <TextField
                    id="subDistrict"
                    variant="outlined"
                    sx={{ borderRadius: "10px" }}
                    fullWidth
                    select
                    label="Select Sub District"
                    error={subDistrictError.length === 0 ? false : true}
                    value={sellerInfo.subDistrict}
                    onChange={(e) => {
                      setSellerInfo({
                        ...sellerInfo,
                        subDistrict: e.target.value,
                      });
                      setsubDistrictError("");
                    }}
                  >
                    {subDistrict.map((data, idx) => (
                      <MenuItem key={idx} value={data}>
                        {data}
                      </MenuItem>
                    ))}
                  </TextField>
                  {subDistrictError.length != 0 && (
                    <Box className={classes.error}>{subDistrictError}</Box>
                  )}
                </Grid>
                <Grid className={classes.textFieldBox} item xs={6}>
                  <TextField
                    id="postalCode"
                    variant="outlined"
                    sx={{ borderRadius: "10px" }}
                    fullWidth
                    select
                    label="Select Postal Code"
                    error={postalCodeError.length === 0 ? false : true}
                    value={sellerInfo.postalCode}
                    onChange={(e) => {
                      setSellerInfo({
                        ...sellerInfo,
                        postalCode: e.target.value,
                      });
                      setpostalCodeError("");
                    }}
                  >
                    {postalCode.map((data, idx) => (
                      <MenuItem key={idx} value={data}>
                        {data}
                      </MenuItem>
                    ))}
                  </TextField>
                  {postalCodeError.length != 0 && (
                    <Box className={classes.error}>{postalCodeError}</Box>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Box
              className={classes.contextHeader}
              sx={{ marginBottom: "35px" }}
            >
              Bank Account
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} className={classes.textFieldBox}>
                <TextField
                  id="Bank"
                  variant="outlined"
                  sx={{ borderRadius: "10px" }}
                  fullWidth
                  select
                  label="Select Bank"
                  error={nameError.length === 0 ? false : true}
                  value={sellerInfo.bankInfo.name}
                  onChange={(e) => {
                    setSellerInfo({
                      ...sellerInfo,
                      bankInfo: {
                        ...sellerInfo.bankInfo,
                        name: e.target.value,
                      },
                    });
                    setNameError("");
                  }}
                >
                  {banks.map((bank, idx) => (
                    <MenuItem key={idx} value={bank}>
                      {bank}
                    </MenuItem>
                  ))}
                </TextField>
                {nameError.length != 0 && (
                  <Box className={classes.error}>{nameError}</Box>
                )}
              </Grid>
              <Grid item xs={6} className={classes.textFieldBox}></Grid>
              <Grid item xs={6} className={classes.textFieldBox}>
                <TextField
                  id="firstName"
                  variant="outlined"
                  placeholder="FirstName"
                  fullWidth
                  required
                  error={nameError.length === 0 ? false : true}
                  value={sellerInfo.bankInfo.firstName}
                  onChange={(e) => {
                    setSellerInfo({
                      ...sellerInfo,
                      bankInfo: {
                        ...sellerInfo.bankInfo,
                        firstName: e.target.value,
                      },
                    });
                    setFirstNameError("");
                  }}
                />
                {firstNameError.length != 0 && (
                  <Box className={classes.error}>{firstNameError}</Box>
                )}
              </Grid>

              <Grid item xs={6} className={classes.textFieldBox}>
                <TextField
                  sx={{ margin: "0 0 0 10px" }}
                  id="lastname"
                  variant="outlined"
                  placeholder="Lastname"
                  value={sellerInfo.bankInfo.lastname}
                  fullWidth
                  error={lastnameError.length === 0 ? false : true}
                  onChange={(e) => {
                    setSellerInfo({
                      ...sellerInfo,
                      bankInfo: {
                        ...sellerInfo.bankInfo,
                        lastName: e.target.value,
                      },
                    });
                    setLastnameError("");
                  }}
                />
                {lastnameError.length != 0 && (
                  <Box className={classes.error}>{lastnameError}</Box>
                )}
              </Grid>
            </Grid>

            <Box className={classes.textFieldBox}>
              <TextField
                id="accountNumber"
                variant="outlined"
                placeholder="Account Number"
                value={sellerInfo.bankInfo.accountNumber}
                fullWidth
                error={accountNumberError.length === 0 ? false : true}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    phoneNumber: e.target.value.slice(0, 10),
                  });
                  setphoneNumError("");
                }}
              />
            </Box>
            {accountNumberError.length != 0 && (
              <Box className={classes.error}>{accountNumberError}</Box>
            )}
          </Box>
          <Box className={classes.birthdate}>
            <Box className={classes.contextHeader}>Birthdate</Box>
            <Box className={classes.birthdateSelect}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  value={userInfo.birthdate}
                  sx={{ width: "100%" }}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, birthdate: e.toISOString() });
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box>
            <Box className={classes.contextHeader}>Profile Image</Box>
            <Box
              sx={{ display: "flex", alignItems: "end", margin: "50px 0px" }}
            >
              <Avatar
                src={userInfo.url}
                alt=""
                sx={{ width: "150px", height: "150px", marginRight: "30px" }}
              ></Avatar>
              <label htmlFor={`outlined-button-file-`}>
                <Button
                  component="span"
                  variant="outlined"
                  sx={{ height: "42px", borderWidth: "2px" }}
                >
                  <input
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    id={`outlined-button-file-`}
                    onChange={(e) => {
                      uploadFile(e);
                    }}
                  />
                  Upload file
                </Button>
              </label>
            </Box>
          </Box>
        </Box>
      ) : (
        <Success />
      )}
    </Box>
  );
};

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: 600,
    margin: "5% 0%",
  },
  context: {
    padding: "0 12%",
  },
  contextHeader: {
    fontSize: "24px",
    marginTop: "40px",
  },
  textField: {
    marginBottom: "40px",
  },
  textFieldBox: {
    marginTop: "35px",
    backgroundColor: "white",
    borderRadius: "10px",
    width: "100%",
    [`& fieldset`]: {
      borderRadius: "10px",
    },
  },
  birthdateSelect: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "35px",
    backgroundColor: "white",
    borderRadius: "10px",
    width: "266px",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    margin: "70px 0 180px 0",
  },
  error: {
    fontSize: "14px",
    color: "#FD3737",
    textAlign: "right",
    width: "100%",
    marginTop: "6px",
  },
});

export default SellerRegister;
