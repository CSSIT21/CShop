import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const TrackingNumber = ({ trackingNumber }) => {
    return (
        <Box>
            <Typography variant="h6">
                Tracking number : {`${trackingNumber}`}
            </Typography>
        </Box>
    );
};

export default TrackingNumber;
