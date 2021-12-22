import { Box } from "@mui/system";
import { Fragment,useState,useEffect } from "react";
import { Avatar, Typography, Modal, Input,Button } from "@mui/material";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import Divider from "@mui/material/Divider";
import { getUrl } from "~/common/utils";
import LoadingButton from "@mui/lab/LoadingButton";
import ImageIcon from "@mui/icons-material/Image";

import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

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

const CreatePromotion = (props) => {
    const classes = useStyles(props);

    const [code, setCode] = useState("");
    const [descpt, setDescpt] = useState("");
    const [minprice, setMinprice] = useState("");
    const [reduceprice, setReduceprice] = useState("");
    const [picPath, setPicpath] = useState("");
    const [picThumnail, setPicthumnai] = useState("");
    const [picTitle, setPictitle] = useState("");
    const [picFile, setFile] = useState("");
    const [discountType, setdiscountType] = useState("Shop");
    const [discountClass, setdiscountClass] = useState("");
    const [startdate, setStartdate] = useState("");
    const [endate, setEndate] = useState("");
    const [quantity, setQuantity] = useState("0");
    const [max_quantity, setMax] = useState("");
  
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
    const [max_quantityError, setMaxError] = useState("");
  
    const checkValidation = (e) => {
      if (code == "") {
        setCodeError("Invalid you need to provide 6 character");
      }
      if (descpt == "") {
        setDescptError("This field is required");
      }
      if (minprice == "") {
        setMinpriceError("This field is required");
      }
      // if (reduceprice == "") {
      //   setReducepriceError("This field is required");
      // }
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
      if (max_quantity == "") {
        setMaxError("This field is required");
      }
      if (
        code != "" &&
        descpt != "" &&
        minprice != "" &&
        discountClass != "" &&
        // reduceprice != "" &&
        picPath != "" &&
        // picThumnail != "" &&
        picTitle != "" &&
        startdate != "" &&
        endate != "" &&
        max_quantity != ""
      ) {
        createCoupon();
      }
    };
  
    const handleSubmit = async () => {
      checkValidation();
    };
  
    const [loading, setLoading] = React.useState(false);
    function handleClick() {
      if (
        code != "" &&
        descpt != "" &&
        minprice != "" &&
        discountClass != "" &&
        // reduceprice != "" &&
        picPath != "" &&
        // picThumnail != "" &&
        picTitle != "" &&
        startdate != "" &&
        endate != "" &&
        max_quantity != ""
      ) {
        setLoading(true);
      }
      handleSubmit();
    }
  
    const uploadFile = async (e) => {
      if (e.target.files.length) {
        const path = URL.createObjectURL(e.target.files[0]);
        console.log(e.target.files[0].name);
        setPicpath(path);
        setPictitle(e.target.files[0].name);
        setFile(e.target.files[0]);
      }
    };
  
    // const shopid = useParams();
  
    // const tempShopid = shopid.id;
  
    const createCoupon = async () => {
      try {
        let url = {
          success: true,
          original_link:
            "https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-store.png",
        };
        if (picFile) {
          url = await getUrl(picFile);
          // setPicpath(url.original_link);
          // setPicthumnai(url.original_link);
        }
        // console.log(
        //   `${code},${descpt},${minprice},${reduceprice},${startdate},${endate},${discountType},${discountClass},${max_quantity}
        //   ${picPath},${picThumnail},${picTitle}`
        // );
  
        if (url.success) {
          await axios.post(
            `${config.SERVER_URL}/sellerconsole/14/discount`,
            {
              id: 14,
              code: code,
              start_date: startdate.toLocaleString(),
              end_date: endate.toLocaleString(),
              description: descpt,
              class_types: discountClass,
              min_price: parseInt(minprice),
              reduce_price: parseInt(reduceprice),
              picture_path: url.original_link,
              picture_thumbnail: url.original_link,
              picture_title: picTitle,
              quantity: parseInt(quantity),
              max_quantity: parseInt(max_quantity),
            }
          );
  
          if (createCoupon) {
            window.alert("Create Success");
            window.location.reload(false);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

  return (
    <Box sx={{ backgroundColor: "white", display:'flex', flexFlow:'row wrap', alignItems:'baseline',width:'100%' }}>
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
          {/* <PageHeader Pagename={Pagename} /> */}
        </Box>

        <Box className={classes.center}>
          <FormControl>
            <Box sx={{ m: 6 }} Validate autoComplete="off" component="form">
              <Typography sx={{ fontSize: "1.52em", fontWeight: 600, mb: 1 }}>
                Create Coupon Center
              </Typography>
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
                disabled={discountClass == "FreeShipping" ? true : false}
                
                id="standard-required"
                label="Reduce price"
                variant="outlined"
                fullWidth
                //   helperText="Some important text"
                sx={{ width: "50%", mb: 3 }}
              />
              <TextField
                error={max_quantityError.length === 0 ? false : true}
                value={max_quantity}
                helperText={max_quantityError}
                type="number"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 12,
                }}
                onChange={(e) => {
                  setMax(e.target.value);
                }}
                required
                id="standard-required"
                label="max quantity"
                variant="outlined"
                fullWidth
                //   helperText="Some important text"
                sx={{ width: "50%", mb: 3 }}
              />
              <br />
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
                value="Event"
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
              <Divider sx={{ m: 2 }} />
              <Box>
                <Typography sx={{ fontSize: "1.52em", fontWeight: 600, mb: 1 }}>
                  Picture
                </Typography>
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
                {/* <TextField
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
                /> */}
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={picPath}
                    alt="avatar"
                    variant="square"
                    sx={{
                      width: "150px",
                      height: "150px",
                      marginRight: "30px",
                    }}
                  >{picPath ? "" : <ImageIcon sx={{ fontSize: "4em" }} />}</Avatar>
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
              <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
                {/* <Button
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
                </Button> */}
                <LoadingButton
                  onClick={handleClick}
                  endIcon={
                    <ConfirmationNumberOutlinedIcon
                      sx={{ fontSize: "1.52em" }}
                    />
                  }
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    height: "5vh",
                    display: "flex",
                    pl: 8,
                    pr: 8,
                  }}
                >
                  Confirm
                </LoadingButton>
              </Box>
            </Box>
          </FormControl>
          {/* <UploadComponent /> */}
        </Box>
      </Box>
    </>
    </Box>
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
  


export default CreatePromotion;