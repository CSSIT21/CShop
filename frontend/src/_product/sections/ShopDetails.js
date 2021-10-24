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
        margin: "100px 0 50px 0",
      }}
    >
      {/* Left-part */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* element-left */}
        <Avatar
          alt="Shop"
          src="/static/images/avatar/1.jpg"
          sx={{
            width: 95,
            height: 95,
            marginRight: "30px",
            alignSelf: "self-start",
          }}
        />
        <Box
          className="element-right"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "110px",
          }}
        >
          {/* Top */}
          <Box>
            <Typography
              sx={{ fontSize: "18px", fontWeight: 500 }}
              className="shopName"
            >
              {shopName}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#A0A3BD",
              }}
            >
              Active {activeTime}
            </Typography>
          </Box>

          {/* Buttom */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
        </Box>
      </Box>

      {/* Right-part */}
      <Box
        sx={{
          height: "75px",
          width: "420px",
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#A0A3BD",
            }}
          >
            Rating
          </Typography>
          <Typography sx={{ fontSize: "18px", marginLeft: "2.7rem" }}>
            {rating}
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#A0A3BD",
              marginLeft: "4rem",
            }}
          >
            Followers
          </Typography>
          <Typography sx={{ fontSize: "18px", marginLeft: "1.3rem" }}>
            {followers}
          </Typography>
        </Box>

        {/* Buttom */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              color: "#A0A3BD",
            }}
          >
            Products
          </Typography>
          <Typography sx={{ fontSize: "18px", marginLeft: "1.4rem" }}>
            {products}
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#A0A3BD",
              marginLeft: "2.7rem",
            }}
          >
            Joined
          </Typography>
          <Typography sx={{ fontSize: "18px", marginLeft: "2.7rem" }}>
            {joined}
          </Typography>
        </Box>
      </Box>
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
