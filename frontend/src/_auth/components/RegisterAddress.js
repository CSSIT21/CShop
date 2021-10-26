import React, { useState } from "react";
import CButton from "~/common/components/CButton";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
const data = [
  {
    subDistrict: "Select Sub District",
    district: "Select District",
    province: "Select Province",
    postalCode: "Postal Code",
  },
  {
    subDistrict: "Bang Mot",
    district: "Thung Khru",
    province: "Bangkok",
    postalCode: 10140,
  },
  {
    subDistrict: "Pak Nam",
    district: "Mueang Samut Prakan",
    province: "Samut Prakarn",
    postalCode: 10270,
  },
  {
    subDistrict: "Tha Din Daeng",
    district: "Phak Hai",
    province: "Phra Nakhon Si Ayutthaya",
    Zipcode: 13120,
  },
];
const RegisterAddress = ({
  activeStep,
  handleBack = () => {},
  handleRegister = () => {},
}) => {
  const classes = useStyles();
  const [address, setAddress] = useState({
    addressLine: "",
    subDistrict: data[0].subDistrict,
    district: data[0].district,
    province: data[0].province,
    postalCode: data[0].postalCode,
  });

  return (
    <Box>
      <Box className={classes.header}>Address</Box>
      <Box className={classes.context}>
        <Box className={classes.address}>
          <Box className={classes.contextHeader}>Address</Box>
          <Box className={classes.textFieldBox}>
            <TextField
              id="addressLine"
              variant="outlined"
              placeholder="Address"
              fullWidth
              multiline
              rows={5}
              onChange={(e) => {
                setAddress({ ...address, addressLine: e.target.value });
              }}
            />
          </Box>
          <Box className={classes.rowSelect}>
            <Box className={classes.textFieldBox} style={{ width: "45%" }}>
              <TextField
                id="province"
                variant="outlined"
                sx={{ borderRadius: "10px" }}
                fullWidth
                select
                value={address.province}
                onChange={(e) => {
                  setAddress({ ...address, province: e.target.value });
                }}
              >
                {data.map((data) => (
                  <MenuItem key={data.postalCode} value={data.province}>
                    {data.province}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.textFieldBox} style={{ width: "45%" }}>
              <TextField
                id="district"
                variant="outlined"
                sx={{ borderRadius: "10px" }}
                fullWidth
                select
                value={address.district}
                onChange={(e) => {
                  setAddress({ ...address, district: e.target.value });
                }}
              >
                {data.map((data) => (
                  <MenuItem key={data.postalCode} value={data.district}>
                    {data.district}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
          <Box className={classes.rowSelect}>
            <Box className={classes.textFieldBox} style={{ width: "45%" }}>
              <TextField
                id="subDistrict"
                variant="outlined"
                sx={{ borderRadius: "10px" }}
                fullWidth
                select
                value={address.subDistrict}
                onChange={(e) => {
                  setAddress({ ...address, subDistrict: e.target.value });
                }}
              >
                {data.map((data) => (
                  <MenuItem key={data.postalCode} value={data.subDistrict}>
                    {data.subDistrict}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.textFieldBox} style={{ width: "45%" }}>
              <TextField
                id="postalCode"
                variant="outlined"
                sx={{ borderRadius: "10px" }}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                value={address.postalCode}
                onChange={(e) => {
                  setAddress({ ...address, postalCode: e.target.value });
                }}
              >
                {data.map((data) => (
                  <MenuItem key={data.postalCode} value={data.postalCode}>
                    {data.postalCode}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.button}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            backgroundColor: "#ffffff",
            boxShadow: "none",
            border: "1px solid #FD6637",
            borderRadius: "12px",
            width: "300px",
            height: "55px",
            color: "#FD6637",
            textTransform: "capitalize",
          }}
        >
          Back
        </Button>
        <CButton
          title="Register"
          onClick={handleRegister}
          width="300px"
          height="55px"
        />
      </Box>
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
    marginBottom: "40px",
  },
  textFieldBox: {
    marginBottom: "35px",
    backgroundColor: "white",
    borderRadius: "10px",
    width: "100%",
    [`& fieldset`]: {
      borderRadius: "10px",
    },
  },
  rowSelect: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "70px 0 180px 0",
    padding: "0 12%",
  },
});
export default RegisterAddress;
