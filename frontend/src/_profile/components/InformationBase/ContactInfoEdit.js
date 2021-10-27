import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Grid, Typography, TextField, MenuItem } from "@mui/material";
import authState from "../../../common/store/authState";
import { useRecoilState } from "recoil";

const address = [
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

const ContactInfoEdit = () => {
    const classes = useStyles();
    const [userInfo] = useRecoilState(authState);
    const [phoneNumber, setPhoneNumber] = useState(userInfo.user.contact);
    const [email, setEmail] = useState(userInfo.user.email);
    const [confirmEmail, setConfirmEmail] = useState();
    return (
        <>
            <Box className={classes.container}>
                <Typography
                    sx={{
                        fontSize: "24px",
                        fontWeight: "600",
                        margin: "50px 0",
                    }}
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
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                    />
                </Grid>
                <Grid container className={classes.grid}>
                    <Grid item xs={4}>
                        <Typography sx={infoTitle}>Email</Typography>
                    </Grid>
                    <TextField
                        id="phoneNumber"
                        variant="outlined"
                        sx={textField}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </Grid>
                <Grid container className={classes.grid}>
                    <Grid item xs={4}>
                        <Typography sx={infoTitle}>Confirm Email</Typography>
                    </Grid>
                    <TextField
                        id="phoneNumber"
                        variant="outlined"
                        sx={textField}
                        value={confirmEmail}
                        onChange={(e) => {
                            setConfirmEmail(e.target.value);
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
                            value="126 Pracha Uthit Rd 126 Pracha Uthit Rd 126 Pracha Uthit Rd 126 Pracha Uthit Rd "
                            multiline
                            rows={5}
                            sx={addressTextField}
                            // onChange={(e) => {
                            //   setAddress({ ...address, addressLine: e.target.value });
                            // }}
                        />
                        <TextField
                            id="province"
                            variant="outlined"
                            select
                            sx={addressTextField}
                            value={address[0].province}
                            // onChange={(e) => {
                            //   setAddress({ ...address, province: e.target.value });
                            // }}
                        >
                            {address.map((address) => (
                                <MenuItem
                                    key={address.postalCode}
                                    value={address.province}
                                >
                                    {address.province}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="district"
                            variant="outlined"
                            select
                            sx={addressTextField}
                            value={address[0].district}
                            // onChange={(e) => {
                            //   setAddress({ ...address, district: e.target.value });
                            // }}
                        >
                            {address.map((address) => (
                                <MenuItem
                                    key={address.postalCode}
                                    value={address.district}
                                >
                                    {address.district}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="subDistrict"
                            variant="outlined"
                            select
                            sx={addressTextField}
                            value={address[0].subDistrict}
                            // onChange={(e) => {
                            //   setAddress({ ...address, subDistrict: e.target.value });
                            // }}
                        >
                            {address.map((address) => (
                                <MenuItem
                                    key={address.postalCode}
                                    value={address.subDistrict}
                                >
                                    {address.subDistrict}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="postalCode"
                            variant="outlined"
                            sx={addressTextField}
                            InputProps={{
                                readOnly: true,
                            }}
                            value={address[0].postalCode}
                            // onChange={(e) => {
                            //   setAddress({ ...address, postalCode: e.target.value });
                            // }}
                        >
                            {address.map((address) => (
                                <MenuItem
                                    key={address.postalCode}
                                    value={address.postalCode}
                                >
                                    {address.postalCode}
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
