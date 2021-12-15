import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Success from "../components/Success";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import config from "~/common/constants";

const SellerRegister = ({}) => {
  const classes = useStyles();
  const [state, setstate] = useState(true);
  const [addressData, setAddressData] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);
  const [postalCode, setPostalCode] = useState([]);
  const [sellerInfo, setSellerInfo] = useState({
    shopName: "",
    // shopImage: "",
    phone: "",
    address: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
    bankInfo: {
      name: "",
      firstName: "",
      lastName: "",
      accountNumber: "",
    },
  });
  const banks = ["SCB", "KBANK", "KTB", "BBL", "BAY", "CIMBT", "UOBT"];

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const fetchedData = await axios.get(
      "https://cshop-mock.mixkoap.com/thailand.json"
    );
    setAddressData(fetchedData.data);
    setProvince([...new Set(fetchedData.data.map((el) => el.province))].sort());
  };

  useEffect(() => {
    setDistrict(
      [
        ...new Set(
          addressData
            .filter((el) => el.province === sellerInfo.province)
            .map((el) => el.district)
        ),
      ].sort()
    );
    setSellerInfo({
      ...sellerInfo,
      district: "",
      subDistrict: "",
      postalCode: "",
    });
  }, [sellerInfo.province]);

  useEffect(() => {
    setSubDistrict(
      [
        ...new Set(
          addressData
            .filter((el) => el.district === sellerInfo.district)
            .map((el) => el.subDistrict)
        ),
      ].sort()
    );
    setSellerInfo({ ...sellerInfo, subDistrict: "", postalCode: "" });
  }, [sellerInfo.district]);

  useEffect(() => {
    setPostalCode(
      [
        ...new Set(
          addressData
            .filter((el) => el.subDistrict === sellerInfo.subDistrict)
            .map((el) => el.Zipcode)
        ),
      ].sort()
    );
  }, [sellerInfo.subDistrict]);
  const [shopNameError, setShopNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

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
    if (sellerInfo.shopName == "") {
      setShopNameError("This field is required");
    }
    if (sellerInfo.phone == "") {
      setPhoneError("This field is required");
    }
    if (sellerInfo.address == "") {
      setaddressLineError("This field is required");
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
      sellerInfo.shopName != "" &&
      sellerInfo.phone != "" &&
      sellerInfo.address != "" &&
      sellerInfo.subDistrict != "" &&
      sellerInfo.district != "" &&
      sellerInfo.province != "" &&
      sellerInfo.postalCode != "" &&
      sellerInfo.bankInfo.name != "" &&
      sellerInfo.bankInfo.firstName != "" &&
      sellerInfo.bankInfo.lastName != "" &&
      sellerInfo.bankInfo.accountNumber != ""
    ) {
      createShop();
    }
  };
  const createShop = () => {
    try {
      axios
        .post(`${config.SERVER_URL}/sellershop`, {
          customer_id: 1,
          shop_address_id: 1,
          name: sellerInfo.shopName,
          phoneNumber: sellerInfo.phone,
          province: sellerInfo.province,
          subDistrict: sellerInfo.subDistrict,
          district: sellerInfo.district,
          postalCode: sellerInfo.postalCode,
          addressLine: sellerInfo.address,
          bank: sellerInfo.bankInfo.name,
          firstname: sellerInfo.bankInfo.firstName,
          lastname: sellerInfo.bankInfo.lastName,
          accountNum: sellerInfo.bankInfo.accountNumber,
        })
        .then(({ data }) => {
          setstate(false);
        });
    } catch (e) {
      console.log(e.message);
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
                  setSellerInfo({
                    ...sellerInfo,
                    bankInfo: {
                      ...sellerInfo.bankInfo,
                      accountNumber: e.target.value.slice(0, 10),
                    },
                  });
                  setAccountNumberError("");
                }}
              />
            </Box>
            {accountNumberError.length != 0 && (
              <Box className={classes.error}>{accountNumberError}</Box>
            )}
          </Box>
          <FormGroup sx={{ margin: "50px 0" }}>
            <FormControlLabel
              control={<Checkbox />}
              label="accept terms and conditions"
            />
          </FormGroup>
          <Box className={classes.button}>
            <Button
              variant="contained"
              style={{
                width: "470px",
                height: "55px",
                textTransform: "capitalize",
              }}
              onClick={checkInfo}
            >
              Confirm
            </Button>
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
