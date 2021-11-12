import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import TopProfile from "../components/TopProfile";
import AccordionCommon from "~/common/components/AccordionCommon";
import ProfileBox from "../components/ProfileBase/ProfileBox";
import {
  Person as PersonIcon,
  LocationOn as AddressIcon,
  ConfirmationNumber as CouponIcon,
  History as HistoryIcon,
} from "@mui/icons-material/";
import { Box } from "@mui/system";

const ProfilePage = () => {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = useState(true);
  const [openVoucher, setOpenVoucher] = useState(true);
  const [openShopping, setOpenShopping] = useState(true);
  return (
    <>
      <TopProfile />
      <Box className={classes.container}>
        <Box style={{ width: "70%" }}>
          <AccordionCommon
            title="Profile"
            col
            open={openProfile}
            setOpen={setOpenProfile}
          >
            <ProfileBox
              title="Information"
              icon={<PersonIcon style={iconStyles} />}
              to="/profile/information"
            />
            <ProfileBox
              title="Address"
              icon={<AddressIcon style={iconStyles} />}
              to="/profile/address"
            />
          </AccordionCommon>
          <AccordionCommon
            title="Voucher & Coupon"
            open={openVoucher}
            setOpen={setOpenVoucher}
          >
            <ProfileBox
              title="Voucher & Coupon"
              icon={<CouponIcon style={iconStyles} />}
              to="/profile/voucher"
            />
          </AccordionCommon>
          <AccordionCommon
            title="Shopping Information"
            open={openShopping}
            setOpen={setOpenShopping}
          >
            <ProfileBox
              title="Order History"
              icon={<HistoryIcon style={iconStyles} />}
              to="/profile/history"
            />
          </AccordionCommon>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "50px",
  },
});

const iconStyles = { fontSize: "32px" };
