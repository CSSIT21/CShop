import { faAirFreshener } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/system";
import React from "react";
import CButton from "../../common/components/CButton";

const ManageAccountPage = () => {
    return (
        <div>
            <Box>User</Box>
            <CButton title="Test" size="large" icon={faAirFreshener} />
        </div>
    );
};

export default ManageAccountPage;
