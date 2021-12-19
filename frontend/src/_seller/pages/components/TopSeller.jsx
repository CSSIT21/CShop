import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Avatar, Typography, Modal } from "@mui/material";
import { useRecoilValue } from "recoil";
import authState from "../../../common/store/authState";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import StoreIcon from "@mui/icons-material/Store";
import Popup from "./Popup";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CircularProgress from "@mui/material/CircularProgress";
import { orange } from "@mui/material/colors";

import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

const userType = "seller";

const TopSeller = () => {
  const shopid = useParams();
  const classes = useStyles();
  const router = useHistory();

  const [open, setOpen] = useState(false);

  const [shid, setShid] = useState();
  const [shopName, setShopname] = useState();
  const [shopDescription, setShopDes] = useState();
  let shopFollowers = "";
  const [phoneNumber, setPhone] = useState();

  let shoppic = "";
  const [shoppath, setShoppath] = useState();
  const [shoppictitle, setshoppictitle] = useState();
  let shopthumnail = "";

  const fetchShopInfo = async () => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/shopinfo`
      );
      setShid(res.data.id);
      setShopname(res.data.shop_name);
      setShopDes(res.data.description);
      shopFollowers = res.data.followers;
      setPhone(res.data.phone_number);

      shoppic = res.data.shop_picture;
      setShoppath(shoppic.path);
      setshoppictitle(shoppic.title);
      shopthumnail = shoppic.thumnail;

      // console.log(
      //   `${shopName},
      //   ${shopDescription},
      //   ${shopFollowers},
      //   ${phoneNumber},
      //   ${shoppath},
      //   ${shoppictitle},
      //   ${shopthumnail},
      //   ${shid}`
      // );
      // console.log(`${shoppic.path}`);
      // console.log(res.data.shop_name)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchShopInfo();
  }, []);

  const primary = orange[800];

  return (
    <Box className={classes.container}>
      <Popup open={open} setOpen={setOpen} title="" description="" />
      <Box className={classes.profile}>
        {shoppath ? (
          <Avatar
            sx={{
              width: 100,
              height: 100,
              marginRight: "25px",
            }}
            // src="https://drive.cshop.cscms.ml/files/2021/12-17/ywyxwpmhnvrb.jpeg"
            src={shoppath}
            alt={shoppictitle}
          ></Avatar>
        ) : (
          <CircularProgress color="primary" sx={{ mr: 4 }} />
        )}

        <Box className={classes.nametag}>
          <Box>
              
            <Typography sx={{ fontSize: "24px", fontWeight: "600" }} color="primary">
              {shopName}
            </Typography>
            <Typography sx={{ fontWeight: "400" }} variant="caption">
              {shopDescription}
            </Typography>
            <Typography
              sx={{
                fontWeight: "400",
                display: "flex",
                alignItems: "center",
                color:'#8B8B8B'
              }}
              variant="caption"
              display="block"
            >
              {/* <Avatar sx={{ bgcolor: orange[100], mr: 1 }}>
              <LocalPhoneIcon color="primary" />
            </Avatar> */}

              {phoneNumber}
            </Typography>
          </Box>
        </Box>
      </Box>

      {userType === "seller" && (
        <Button
          variant="contained"
          startIcon={<StoreIcon />}
          style={{
            textTransform: "capitalize",
            height: "45px",
          }}
          // onClick={() => {
          //   router.push("/shop/1");

          // }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Typography sx={{ fontSize: "12px" }} onClick={setOpen}>
            Edit
          </Typography>
        </Button>
      )}
    </Box>
  );
};

export default TopSeller;

const useStyles = makeStyles({
  container: {
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px 120px",
    boxShadow: " 0px 4px 4px rgba(196, 196, 196, 0.25)",
  },
  profile: {
    display: "flex",
  },
  nametag: {
    padding: 4,
    color: "black",
  },
});
