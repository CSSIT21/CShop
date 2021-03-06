import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import AvatarImage from "~/common/assets/images/profileshop.png";
import FollowButton from "~/common/components/FollowButton";
import dayjs from "dayjs";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";
import Swal from "sweetalert2/dist/sweetalert2.js";

const useStyles = makeStyles({
  HeaderLeftShop: {
    display: "flex",
    height: "220px",
    width: "50%",
  },

  ProfileShop: {
    display: "flex",
  },

  DetailShop: {
    padding: "0 0 0 25px",
  },
});

const HeaderLeft = ({ shopInfo = {} }) => {
  const classes = useStyles();
  const auth = useRecoilValue(authState);
  const { id, cateId } = useParams();
  const [shopimage, setshopimage] = useState(AvatarImage);
  const [date, setdate] = useState();
  const router = useHistory();
  useEffect(() => {
    if (shopInfo.shop_picture) {
      setshopimage(shopInfo.shop_picture.path);
    }
  }, [shopInfo]);
  useEffect(() => {
    const joinDate = shopInfo.last_active;
    setdate(dayjs(joinDate).fromNow());
  }, [shopInfo]);

  return (
    <Box className={classes.HeaderLeftShop}>
      <Box className={classes.ProfileShop}>
        <Avatar
          alt="profile"
          src={shopimage}
          sx={{ width: "150px", height: "150px" }}
        />
        <Box className={classes.DetailShop}>
          <Typography fontSize="18px" fontWeight="500">
            {shopInfo.shop_name}
          </Typography>
          <Typography
            fontSize="14px"
            color="#A0A3BD"
            sx={{ margin: "0 0 10px 0" }}
          >
            Active {date}
          </Typography>
          <Typography fontSize="14px" color="#A0A3BD">
            {shopInfo.description}
          </Typography>
          {!(auth.user.role == "SELLER" && auth.user.shop_info[0].id == id) && (
            <Box>
              <FollowButton
                sx={{ margin: "24px 24px 0 0", padding: "10px 20px" }}
                width="120px"
                height="45px"
                fontSize="14px"
                fontWeight="500"
                shop_id={id}
                customer_id={auth.user.id}
              />

              <Button
                onClick={() => {
                  if (auth.isLoggedIn) {
                    router.push("/chat/" + id);
                  } else {
                    Swal.fire({
                      text: "Please login to chat with seller!",
                      icon: "error",
                      confirmButtonText: "OK",
                    });
                  }
                }}
                sx={{ margin: "24px 0 0 0", padding: "10px 20px" }}
                width="120px"
                height="45px"
                fontSize="14px"
                fontWeight="500"
                backgroundColor="#FD6637"
                variant="contained"
              >
                <ShoppingCartOutlinedIcon
                  style={{ width: "16px", heigth: "16px", margin: "0 5px 0 0" }}
                />
                Chat now
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderLeft;
