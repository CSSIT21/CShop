import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import CButton from "../../common/components/CButton";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const ManageSellerAccountPage = () => {
    return (
        <Box>
            <Typography variant="h4" fontWeight="600">
                Manage Sellers
            </Typography>
            <CButton icon={<AccountBalanceIcon />} title="Mixko" />
        </Box>
    );
};

export default ManageSellerAccountPage;
