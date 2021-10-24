import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CButton from "../../common/components/CButton";

const ManageAccountPage = () => {
    return (
        <Box>
            <Typography variant="h4" fontWeight="600">
                Manage Accounts
            </Typography>
            <CButton title="Next" />
        </Box>
    );
};

export default ManageAccountPage;
