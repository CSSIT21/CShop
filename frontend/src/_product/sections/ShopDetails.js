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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Avatar
          alt="Shop"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 95, height: 95, marginRight: "25px" }}
        />
        <div className="">
          <div className="shopName">{shopName}</div>
          <Typography
            sx={{
              minWidth: 200,
              fontSize: "14px",
              lineHeight: "21px",
              color: "#A0A3BD",
            }}
          >
            Active {activeTime}
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "17px" }}
          >
            <CButton
              title="Chat now"
              icon={<ShoppingCartOutlinedIcon />}
              width="120px"
              height="45px"
            />
            <CButton
              title="Go to shop"
              icon={<StoreOutlinedIcon />}
              width="120px"
              height="45px"
              backgroundColor="#FFFFFF"
              style={text}
            />
          </Box>
        </div>
      </Box>
      <div className="right-part">
        <Box sx={{ display: "flex", alignItems: "center", textAlign: "left" }}>
          <Typography
            sx={{
              minWidth: 100,
              fontSize: "18px",
              lineHeight: "27px",
              color: "#A0A3BD",
            }}
          >
            Rating
          </Typography>
          <Typography sx={{ minWidth: 100 }}>{rating}</Typography>
          <Typography
            sx={{
              minWidth: 100,
              fontSize: "18px",
              lineHeight: "27px",
              color: "#A0A3BD",
            }}
          >
            Followers
          </Typography>
          <Typography sx={{ minWidth: 100 }}>{followers}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", textAlign: "left" }}>
          <Typography
            sx={{
              minWidth: 100,
              fontSize: "18px",
              lineHeight: "27px",
              color: "#A0A3BD",
            }}
          >
            Products
          </Typography>
          <Typography sx={{ minWidth: 100 }}>{products}</Typography>
          <Typography
            sx={{
              minWidth: 100,
              fontSize: "18px",
              lineHeight: "27px",
              color: "#A0A3BD",
            }}
          >
            Joined
          </Typography>
          <Typography sx={{ minWidth: 100 }}>{joined}</Typography>
        </Box>
      </div>
    </Box>
  );
};

const useStyles = makeStyles({});
const text = {
  color: "#FD6637",
  borderColor: "#FD6637",
  marginLeft: "17px",
};

export default ShopDetails;
