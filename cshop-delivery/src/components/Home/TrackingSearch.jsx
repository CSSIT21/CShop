import CustomTextField from "../../styles/CustomMui/CustomTextField";
import ColorButton from "../../styles/CustomMui/ColorButton";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useState } from "react";
import axios from "axios";

const TrackingSearch = ({ setDelivery }) => {
    const classes = useStyles();
    const [trackingNumber, setTrackingNumber] = useState("");
    const [checkLength, setCheckLength] = useState(false);
    const [helperText, setHelperText] = useState("");

    const fetchedTrackingNumber = async () => {
        const getTrackingNumber = await axios.get(
            `http://localhost:8080/delivery/search?tracking=${trackingNumber}`
        );
        setDelivery(getTrackingNumber.data);
        if (!getTrackingNumber.data) {
            setCheckLength(true);
            setHelperText("Not found");
        }
    };

    const checkInput = () => {
        if (trackingNumber.length === 10) {
            setCheckLength(false);
            setHelperText("");
            fetchedTrackingNumber();
        } else {
            setCheckLength(true);
            setHelperText("This field must contain 10 characters");
        }
    };

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            setTrackingNumber(e.target.value);
            fetchedTrackingNumber();
        }
    };

    return (
        <Box className={classes.inputText}>
            <Typography variant="h3" fontWeight={600} sx={{ margin: "20px 0" }}>
                Track your order
            </Typography>
            <Box className={classes.textField}>
                <CustomTextField
                    sx={{ width: "400px" }}
                    onChange={(e) => {
                        setTrackingNumber(e.target.value.toUpperCase());
                    }}
                    onKeyPress={(e) => {
                        keyCheck(e);
                    }}
                    value={
                        trackingNumber.length === 11
                            ? trackingNumber.substring(0, 10)
                            : trackingNumber
                    }
                    helperText={checkLength ? helperText : null}
                />
                <ColorButton
                    sx={{
                        width: "100px",
                        height: "55px",
                        margin: "0 10px",
                    }}
                    onClick={checkInput}
                >
                    <Typography>Track</Typography>
                </ColorButton>
            </Box>
        </Box>
    );
};

const useStyles = makeStyles(() => ({
    textField: {
        margin: "30px 0",
    },
    inputText: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
}));

export default TrackingSearch;
