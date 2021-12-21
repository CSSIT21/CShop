import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import config from "../../common/constants";
import dayjs from "dayjs";

const ShopDetails = ({ shopDetail, shopId, auth, avgRating }) => {
  const [activeTime, setActiveTime] = useState();
  const [joinTime, setJoinTime] = useState();
  const rating = "4.7";

  const handleGoToChat = () => {
    if (auth.isLoggedIn)
      location.href = `http://localhost:3000/chat/${shopDetail.id}`;
    else {
      Swal.fire({
        title: "Please login to chat with shop!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    // else location.href = "http://localhost:3000/register";
  };

  const activeTimeFormat = () => {
    let fromNow = dayjs(shopDetail?.last_active).fromNow();
    setActiveTime(fromNow);
  };

  useEffect(() => {
    activeTimeFormat();
    activeJoinFormat();
  }, [shopDetail]);

  const activeJoinFormat = () => {
    let joinFromNow = dayjs(shopDetail?.join_date).fromNow();
    setJoinTime(joinFromNow);
  };

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
          src={shopDetail?.shop_picture.path}
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
              {shopDetail?.shop_name}
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

          {/* Button */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <Link to="/chat"> */}
            <Button
              title="Chat now"
              startIcon={<ShoppingCartOutlinedIcon sx={{ fontSize: "12px" }} />}
              style={goToChatStyle}
              onClick={handleGoToChat}
            >
              Chat now
            </Button>
            {/* </Link> */}
            <Link to={`/shop/${shopId}`}>
              <Button startIcon={<StoreOutlinedIcon />} style={goToShopStyle}>
                Go to shop
              </Button>
            </Link>
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
          <Typography
            sx={{
              fontSize: "18px",
              marginLeft: "2.7rem",
              minWidth: "35px",
              maxWidth: "35px",
            }}
          >
            {avgRating}
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
            {shopDetail?.followers}
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
          <Typography
            sx={{
              fontSize: "18px",
              marginLeft: "1.4rem",
              minWidth: "55px",
              maxWidth: "55px",
            }}
          >
            {shopDetail?._count.product}
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
            {joinTime}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const goToShopStyle = {
  color: "#FD6637",
  border: "1px solid #FD6637",
  // padding: "11px",
  marginLeft: "17px",
  width: "130px",
  height: "45px",
  fontSize: "12px",
  backgroundColor: "#FFFFFF",
  textTransform: "capitalize",
};
const goToChatStyle = {
  width: "130px",
  height: "45px",
  color: "#FFFFFF",
  fontSize: "12px",
  border: "1px solid #FD6637",
  backgroundColor: "#FD6637",
  textTransform: "capitalize",
};

export default ShopDetails;
