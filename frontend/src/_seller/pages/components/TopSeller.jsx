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

import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

const userType = "seller";

const TopSeller = () => {
  const shopid = useParams();
  const classes = useStyles();
  const auth = useRecoilValue(authState);
  const router = useHistory();

  const [open, setOpen] = useState(false);

  const [shopinf, setShopinfo] = useState();

  const fetchShopInfo = async () => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/shopinfo`
      );
      console.log(res.data)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchShopInfo();
  }, []);

  return (
    <Box className={classes.container}>
      <Popup open={open} setOpen={setOpen} title="" description="" />
      <Box className={classes.profile}>
        <Avatar
          src={auth.user.url}
          sx={{ width: 80, height: 80, marginRight: "25px" }}
        />
        <Box className={classes.nametag}>
          <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
            {auth.user.first_name} {auth.user.last_name}
          </Typography>
          <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
            #ID
          </Typography>
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
            {" "}
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
    color: "black",
  },
});
