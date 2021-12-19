import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useRecoilValue } from "recoil";
import authState from "../../common/store/authState";
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";

import StockLogBody from "./components/TableContent/StockLogBody";
import PageHeader from "./components/PageHeader";

import FlashOnIcon from '@mui/icons-material/FlashOn';

const ProductType = [
    {
        value: 1,
        label: "IT",
    },
    {
        value: 2,
        label: "Education",
    },
    {
        value: 3,
        label: "Fashion",
    },
    {
        value: 4,
        label: "Kids",
    },
    {
        value: 5,
        label: "Beauty",
    },
    {
        value: 6,
        label: "Furniture",
    },
    {
        value: 7,
        label: "Electronics",
    },
    {
        value: 8,
        label: "Food",
    },
    {
        value: 9,
        label: "Sport",
    },
    {
        value: 10,
        label: "Accessories",
    },
    {
        value: 11,
        label: "Others",
    },
];

const SellerFlashsell = () => {
    const Pagename = "FlashShell";
    const auth = useRecoilValue(authState);


    return (
        <Box>
            <Box sx={{ mt: "4rem" }} />
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    mb: 2,
                }}
            >
                <PageHeader Pagename={Pagename} />
            </Box>
            <Box sx={{ mt: "4rem" }} />

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50vh', display: "flex", mt: 3, },
                }}
                noValidate
                autoComplete="off"
            >
                <Box sx={{ display: "flex", flexDirection: "column", ml: 50 }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Title"
                        placeholder="title"

                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Path"
                        placeholder="path"

                    />
                    <TextField
                        id="outlined-required"
                        label="Thumbnail"
                        placeholder="thumbnail"

                    />
                    <TextField
                        required
                        select
                        id="outlined-required"
                        label="Product"

                    >
                        {ProductType.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="outlined-required"
                        label="Description"
                        placeholder="description"
                    />
                    <TextField
                        required
                        id="datetime-local"
                        label="start date"
                        type="datetime-local"
                        placeholder="2019-05-24T10:30"
                        InputLabelProps={{
                            shrink: true,
                        }}

                        sx={{ width: "50%", mb: 3 }}
                    />
                    <TextField
                        required
                        id="datetime-local"
                        label="end date"
                        type="datetime-local"
                        placeholder="2020-08-24T10:30"
                        InputLabelProps={{
                            shrink: true,
                        }}

                        sx={{ width: "50%", mb: 3 }}
                    />
                    <Box sx={{ m: 1 }}>
                        <Button
                            variant="contained"
                            startIcon={
                                <FlashOnIcon
                                    sx={{ fontSize: "1.52em" }}
                                />
                            }
                            sx={{
                                textTransform: "capitalize",
                                height: "5vh",
                                display: "flex",
                                ml : 15,
                                mt : 3
                            }}
                        >
                            <Typography sx={{ fontSize: "1.52em" }}>Create</Typography>
                        </Button>
                    </Box>
                </Box>

            </Box>
        </Box>


    );
};

export default SellerFlashsell;
