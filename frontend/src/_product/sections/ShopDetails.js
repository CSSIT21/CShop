import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CButton from "../../common/components/CButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { makeStyles } from "@mui/styles";

const ShopDetails = (props) => {
  const shopName = "Shop Name";
  const activeTime = "19 minutes ago";
  const rating = "4.7";
  const followers = "7.4k";
  const products = "6666";
  const joined = "4 years ago";

  const classes = useStyles();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="left-part">
        <Avatar
          alt="Shop"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 95, height: 95 }}
        />
        <div className="">
          <div className="shopName">{shopName}</div>
          <div className="active">Active {activeTime}</div>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CButton
              title="Chat now"
              icon={<ShoppingCartOutlinedIcon />}
              width="120"
            />
            <CButton
              title="Go to shop"
              icon={<StoreOutlinedIcon />}
              width="120"
            />
          </Box>
        </div>
      </div>
      <div className="right-part">
        <Box sx={{ display: "flex", alignItems: "center", textAlign: "left" }}>
          <Typography sx={{ minWidth: 100 }}>Rating</Typography>
          <Typography sx={{ minWidth: 100 }}>{rating}</Typography>
          <Typography sx={{ minWidth: 100 }}>Followers</Typography>
          <Typography sx={{ minWidth: 100 }}>{followers}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", textAlign: "left" }}>
          <Typography sx={{ minWidth: 100 }}>Products</Typography>
          <Typography sx={{ minWidth: 100 }}>{products}</Typography>
          <Typography sx={{ minWidth: 100 }}>Joined</Typography>
          <Typography sx={{ minWidth: 100 }}>{joined}</Typography>
        </Box>
      </div>
    </Box>
  );
};

const useStyles = makeStyles({});

export default ShopDetails;
