import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import TopProfile from "../components/ProfileBase/TopProfile";
import ProfileArea from "../components/ProfileBase/ProfileArea";
import ProfileBox from "../components/ProfileBase/ProfileBox";
import {
  Person as PersonIcon,
  LocationOn as AddressIcon,
  ConfirmationNumber as CouponIcon,
  History as HistoryIcon,
} from "@mui/icons-material/";
import { Box } from "@mui/system";

const ProfilePage = (props) => {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = useState(true);
  const [openVoucher, setOpenVoucher] = useState(true);
  const [openShopping, setOpenShopping] = useState(true);
  return (
    <>
      <TopProfile />
      <Box className={classes.container}>
        <Box style={{ width: "70%" }}>
          <ProfileArea
            title="Profile"
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
          </ProfileArea>
          <ProfileArea
            title="Voucher & Coupon"
            open={openVoucher}
            setOpen={setOpenVoucher}
          >
            <ProfileBox
              title="Voucher & Coupon"
              icon={<CouponIcon style={iconStyles} />}
              to="/profile/voucher"
            />
          </ProfileArea>
          <ProfileArea
            title="Shopping Information"
            open={openShopping}
            setOpen={setOpenShopping}
          >
            <ProfileBox
              title="Order History"
              icon={<HistoryIcon style={iconStyles} />}
              to="/profile/history"
            />
          </ProfileArea>
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
  },
});

const iconStyles = { fontSize: "32px" };
