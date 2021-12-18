import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Avatar, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Success from "../components/Success";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRecoilState } from "recoil";
import authState from "../../common/store/authState";
import Checkbox from "@mui/material/Checkbox";
import config from "~/common/constants";
import { getUrl } from "~/common/utils";
import Snackbar from "@mui/material/Snackbar";
import LoadingButton from "@mui/lab/LoadingButton";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SellerRegister = ({}) => {
  const classes = useStyles();
  const [auth, setAuth] = useRecoilState(authState);
  const [accept, setaccept] = useState(false);
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [state, setstate] = useState(true);
  const [addressData, setAddressData] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);
  const [postalCode, setPostalCode] = useState([]);
  const [reserveimage, setreserveimage] = useState();
  const [sellerInfo, setSellerInfo] = useState({
    shopName: "",
    shopImage: {
      title: "",
      path: "",
      thumbnail: "",
    },
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
  const banks = ["SCB", "KBANK", "KTB", "TMB"];

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
  const uploadFile = async (e) => {
    if (e.target.files.length) {
      const path = URL.createObjectURL(e.target.files[0]);
      setSellerInfo({
        ...sellerInfo,
        shopImage: {
          path: path,
          title: e.target.files[0].name,
          file: e.target.files[0],
        },
      });
    }
  };
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
    if (accept) {
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
    } else {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  };
  const createShop = async () => {
    try {
      setloading(true);
      let url = {
        success: true,
        original_link:
          "https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-store.png",
      };
      if (sellerInfo.shopImage.file) {
        url = await getUrl(sellerInfo.shopImage.file);
      }
      if (url.success) {
        axios
          .post(`${config.SERVER_URL}/sellershop`, {
            customer_id: auth.user.id,
            shop_name: sellerInfo.shopName,
            phone_number: sellerInfo.phone,
            province: sellerInfo.province,
            sub_district: sellerInfo.subDistrict,
            district: sellerInfo.district,
            postal_code: sellerInfo.postalCode.toString(),
            address_line: sellerInfo.address,
            bank: sellerInfo.bankInfo.name,
            firstname: sellerInfo.bankInfo.firstName,
            lastname: sellerInfo.bankInfo.lastName,
            account_number: sellerInfo.bankInfo.accountNumber.toString(),
            title: sellerInfo.shopImage.title,
            path: url.original_link,
            thumbnail: url.original_link,
          })
          .then(() => {
            axios
              .get(`${config.SERVER_URL}/profile/me`, {
                withCredentials: true,
                validateStatus: () => true,
              })
              .then(({ data }) => {
                if (data.success) {
                  setAuth(({ isLoggedIn }) => ({
                    isLoggedIn,
                    user: data.user,
                  }));
                  setloading(false);
                  setstate(false);
                }
              });
          });
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  return 
    <>
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
                  alignItems: "center",
                }}
                className={classes.textFieldBox}
              >
                <Avatar
                  src={sellerInfo.shopImage.path}
                  alt="avatar"
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
                control={
                  <Checkbox
                    checked={accept}
                    onClick={() => setaccept(!accept)}
                  />
                }
                label="accept terms and conditions"
              />
            </FormGroup>
            <Box className={classes.button}>
              <LoadingButton
                loading={loading}
                variant="contained"
                style={{
                  width: "470px",
                  height: "55px",
                  textTransform: "capitalize",
                }}
                onClick={checkInfo}
              >
                Confirm
              </LoadingButton>
            </Box>
          </Box>
        ) : (
          <Success />
        )}
      </Box>
      <Snackbar
        open={open}
        color="#FD6637"
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert severity="warning" sx={{ width: "100%" }}>
          Please accept our term and condition!
        </Alert>
      </Snackbar>
    </>
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
