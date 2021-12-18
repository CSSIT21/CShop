import React, { useState } from "react";
import Box from "@mui/material/Box";
import SellerSearch from "./components/SellerSearch";
import Button from "@mui/material/Button";
import { Avatar, Typography, Modal, Input } from "@mui/material";
import authState from "../../common/store/authState";
import { useRecoilValue } from "recoil";
import PageHeader from "./components/PageHeader";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";

const discountTypes = [
  {
    value: "Shop",
    label: "Shop",
  },
  {
    value: "Event",
    label: "Event",
  },
  {
    value: "App",
    label: "App",
  },
  {
    value: "Category",
    label: "Category",
  },
];

const discountClasses = [
  {
    value: "ReducePrice",
    label: "ReducePrice",
  },
  {
    value: "FreeShipping",
    label: "FreeShipping",
  },
];

const SellerCreateCoupon = (props) => {
  const classes = useStyles(props);
  const Pagename = "Create Coupon";

  const [code, setCode] = useState("");
  const [descpt, setDescpt] = useState("");
  const [minprice, setMinprice] = useState("");
  const [reduceprice, setReduceprice] = useState("");
  const [picPath, setPicpath] = useState("");
  const [picThumnail, setPicthumnai] = useState("");
  const [picTitle, setPictitle] = useState("");
  const [discountType, setdiscountType] = useState("Shop");
  const [discountClass, setdiscountClass] = useState("");
  const [startdate, setStartdate] = useState("");
  const [endate, setEndate] = useState("");

  const codeErrorText = "LIMIT 6 character ex.ABC123";
  const [codeError, setCodeError] = useState("LIMIT 6 character ex.ABC123");
  const [descptError, setDescptError] = useState("");
  const [minpriceError, setMinpriceError] = useState("");
  const [reducepriceError, setReducepriceError] = useState("");
  const [picPathError, setPicpathError] = useState("");
  const [picThumnailError, setPicthumnaiError] = useState("");
  const [picTitleError, setPictitlErrore] = useState("");
  const [discountTypeError, setdiscountTypeError] = useState("");
  const [discountClassError, setdiscountClassError] = useState("");
  const [startdateError, setStartdateError] = useState("");
  const [endateError, setEndateError] = useState("");

  const checkValidation = () => {
    if (code == "") {
      setCodeError("Invalid you need to provide 6 character");
    }
    if (descpt == "") {
      setDescptError("This field is required");
    }
    if (minprice == "") {
      setMinpriceError("This field is required");
    }
    if (reduceprice == "") {
      setReducepriceError("This field is required");
    }
    if (picPath == "") {
      setPicpathError("This field is required");
    }
    if (picThumnail == "") {
      setPicthumnaiError("This field is required");
    }
    if (picTitle == "") {
      setPictitlErrore("This field is required");
    }
    if (discountClass == "") {
      setdiscountClassError("This field is required");
    }
    if (startdate == "") {
      setStartdateError("This field is required");
    }
    if (endate == "") {
      setEndateError("This field is required");
    }
  };

  const handleSubmit = () => {
    // console.log(
    //   `${discountType},${discountClass},${code},${startdate},${endate}`
    // );
    // window.location.reload(false);
    checkValidation();
    console.log(minprice, reduceprice);
    // window.alert("minecraft");
  };

  return (
    <>
      <Box>
        <Box sx={{ mt: "4rem" }} />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <PageHeader Pagename={Pagename} />
        </Box>

        <Box className={classes.center}>
          <FormControl>
            <Box sx={{ m: 6 }} Validate autoComplete="off" component="form">
              <TextField
                required
                error={codeError.length === codeErrorText.length ? false : true}
                value={code}
                helperText={codeError}
                inputProps={{
                  maxLength: 6,
                }}
                id="standard-required"
                label="CODE"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                variant="outlined"
                fullWidth
                sx={{ width: "100%", mb: 1 }}
              />
              <TextField
                onChange={(e) => {
                  setDescpt(e.target.value);
                }}
                id="standard-multiline-static"
                label="Description"
                error={descptError.length == 0 ? false : true}
                value={descpt}
                helperText={descptError}
                multiline
                fullWidth
                maxRows={4}
                variant="outlined"
                sx={{ width: "100%", mb: 3 }}
              />{" "}
              <TextField
                error={minpriceError.length === 0 ? false : true}
                value={minprice}
                helperText={minpriceError}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                type="number"
                onChange={(e) => {
                  setMinprice(e.target.value);
                }}
                required
                id="standard-required"
                label="Min price"
                variant="outlined"
                fullWidth
                //   helperText="Some important text"
                sx={{ width: "50%", mb: 1 }}
              />
              <TextField
                error={reducepriceError.length === 0 ? false : true}
                value={reduceprice}
                helperText={reducepriceError}
                type="number"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 12,
                }}
                onChange={(e) => {
                  setReduceprice(e.target.value);
                }}
                required
                id="standard-required"
                label="Reduce price"
                variant="outlined"
                fullWidth
                //   helperText="Some important text"
                sx={{ width: "50%", mb: 3 }}
              />
              <TextField
                onChange={(e) => {
                  setdiscountClass(e.target.value);
                }}
                error={discountClassError.length === 0 ? false : true}
                value={discountClass}
                helperText={discountClassError}
                // helperText="Please select your discount class"
                required
                id="standard-select-currency"
                select
                label="Class"
                onChange={(e) => {
                  setdiscountClass(e.target.value);
                }}
                variant="outlined"
                fullWidth
                sx={{ width: "50%", mb: 3 }}
              >
                {discountClasses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                onChange={(e) => {
                  setdiscountType(e.target.value);
                }}
                disabled
                id="standard-select-currency"
                select
                label="Discount types"
                value="Shop"
                onChange={(e) => {
                  setdiscountType(e.target.value);
                }}
                variant="outlined"
                fullWidth
                sx={{ width: "50%", mb: 3 }}
              >
                {discountTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Box>
                <TextField
                  error={picTitleError.length === 0 ? false : true}
                  value={picTitle}
                  helperText={picTitleError}
                  // helperText="Type your discount title ex.NatureMade C"
                  onChange={(e) => {
                    setPictitle(e.target.value);
                  }}
                  required
                  id="standard-required"
                  label="Picture title"
                  variant="outlined"
                  fullWidth
                  sx={{ width: "100%", mb: 3 }}
                />
                <TextField
                  onChange={(e) => {
                    setPicpath(e.target.value);
                  }}
                  error={picPathError.length === 0 ? false : true}
                  value={picPath}
                  helperText={picPathError}
                  // helperText="Please paste your picture path (URL)"
                  required
                  id="standard-required"
                  label="Picture path"
                  variant="outlined"
                  fullWidth
                  sx={{ width: "50%", mb: 3 }}
                />
                <TextField
                  error={picThumnailError.length === 0 ? false : true}
                  value={picThumnail}
                  helperText={picThumnailError}
                  // helperText="Please paste your thumnail (URL)"
                  onChange={(e) => {
                    setPicthumnai(e.target.value);
                  }}
                  required
                  id="standard-required"
                  label="Picture thumnail"
                  variant="outlined"
                  fullWidth
                  sx={{ width: "50%", mb: 3 }}
                />
                <TextField
                  error={startdateError.length === 0 ? false : true}
                  value={startdate}
                  helperText={startdateError}
                  onChange={(e) => {
                    setStartdate(e.target.value);
                  }}
                  required
                  id="datetime-local"
                  label="start date"
                  type="datetime-local"
                  // defaultValue="2017-05-24T10:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  sx={{ width: "50%", mb: 3 }}
                />
                <TextField
                  error={endateError.length === 0 ? false : true}
                  value={endate}
                  helperText={endateError}
                  onChange={(e) => {
                    setEndate(e.target.value);
                  }}
                  required
                  id="datetime-local"
                  label="end date"
                  type="datetime-local"
                  // defaultValue="2017-05-24T10:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  sx={{ width: "50%", mb: 3 }}
                />
              </Box>
              <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  startIcon={
                    <ConfirmationNumberOutlinedIcon
                      sx={{ fontSize: "1.52em" }}
                    />
                  }
                  sx={{
                    textTransform: "capitalize",
                    height: "5vh",
                    display: "flex",
                    pl: 8,
                    pr: 8,
                  }}
                >
                  <Typography sx={{ fontSize: "1.52em" }}>Create</Typography>
                </Button>
              </Box>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

const useStyles = makeStyles({
  center: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  MockBox: {
    bgcolor: "primary.main",
    color: "black",
    p: 1,
    m: 1,
    borderRadius: 1,
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "700",
  },
  textFieldStyle: {
    width: "50%",
    mb: 1,
  },
});

export default SellerCreateCoupon;
