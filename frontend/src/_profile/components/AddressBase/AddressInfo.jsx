import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddressDetail from "./AddressDetail";
import { For } from "../../../common/utils";
const data = [
    {
        id: 1,
        primary: true,
        name: "Athippat Chirawongnathiporn",
        address:
            "69/3 Koh Kwang Sub-district, Muang District, Chanthaburi 22000",
        phoneNumber: "0853844385",
    },
    {
        id: 2,
        primary: false,
        name: "Jirasin Jarethammajit",
        address:
            "123 Soi Lemoningz 22, Lemoningz Rd, Monterey, Pattaya, Chonburi 20970",
        phoneNumber: "0949384955",
    },
    {
        id: 3,
        primary: false,
        name: "Apisit Maneerat",
        address: "23/54 Soi 4 Los Angeles, California, United State 90011",
        phoneNumber: "0908738834",
    },
    {
        id: 4,
        primary: false,
        name: "Apisit Maneerat",
        address: "23/54 Soi 4 Los Angeles, California, United State 90011",
        phoneNumber: "0908738834",
    },
];
const AddressInfo = () => {
    const classes = useStyles();

    return (
        <Box sx={{ width: "100%", marginTop: "50px", paddingBottom: "170px" }}>
            <Box sx={{ width: "98%", padding: "0px 16px" }}>
                <Typography
                    sx={{
                        fontSize: "24px",
                        fontWeight: 600,
                        marginBottom: "35px",
                    }}
                >
                    Delivery Address
                </Typography>
                <Grid container className={classes.header}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={3}>
                        Recipient's Name
                    </Grid>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={3}>
                        Address
                    </Grid>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={2}>
                        Phone Number
                    </Grid>
                </Grid>

                <Grid container className={classes.info} style={{}}>
                    <For each={data}>
                        {(item, idx) => <AddressDetail data={item} key={idx} />}
                    </For>
                </Grid>
            </Box>
        </Box>
    );
};
const useStyles = makeStyles({
    header: {
        backgroundColor: "#FD6637",
        fontWeight: "600",
        color: "white",
        padding: "15px 15px",
        textAlign: "end",
        borderRadius: "10px 10px 0px 0px",
    },
    info: {
        fontWeight: "400",
        fontSize: "14px",
        textAlign: "end",
        boxShadow: "0px 3.55484px 3.55484px rgba(196, 196, 196, 0.26)",
        borderRadius: "0px 0px 10px 10px",
    },
});

export default AddressInfo;
