import React, { useRef, useEffect } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Avatar, Typography, Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import authState from "../../common/store/authState";
import { useHistory } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";

const TopProfile = () => {
  const classes = useStyles();
  const auth = useRecoilValue(authState);
  const router = useHistory();
  const avatar = useRef();

  useEffect(() => {
    const $div = document.createElement("div");
    $div.textContent = "EDIT";
    $div.classList.add("profile-edit");
    if (avatar.current != null) {
      avatar.current.appendChild($div);
    }
    return () => $div.remove();
  }, []);

  return (
    <Box className={classes.container}>
      <Box className={classes.profile}>
        <Avatar
          src={auth.user.customer_info.url}
          sx={{ width: 80, height: 80, marginRight: "25px" }}
          className={classes.profilePic}
          ref={avatar}
        ></Avatar>
        <Box className={classes.nametag}>
          <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
            {auth.user.customer_info.firstname}{" "}
            {auth.user.customer_info.lastname}
          </Typography>
          <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
            #{auth.user.customer_info.customer_id}
          </Typography>
        </Box>
      </Box>
      {auth.user.role === "SELLER" && (
        <Button
          variant="contained"
          startIcon={<StoreIcon />}
          style={{
            textTransform: "capitalize",
            height: "45px",
          }}
          onClick={() => {
            router.push("/shop/1");
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>My Shop</Typography>
        </Button>
      )}
    </Box>
  );
};

export default TopProfile;

const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 100px",
    boxShadow: " 0px 4px 4px rgba(196, 196, 196, 0.25)",
  },
  profile: {
    display: "flex",
  },
  nametag: {
    color: "black",
  },
  profilePic: {
    cursor: "pointer",
    "&:hover": {
      position: "relative",
    },
    "& .profile-edit": {
      transition: "all .25s ease-in-out",
      position: "absolute",
      width: "100%",
      padding: "10px",
      top: "100%",
      transform: "translateY(0%)",
      textAlign: "center",
      background: "rgba(0,0,0,.3)",
      color: "white",
      fontSize: "14px",
    },
    "&:hover .profile-edit": {
      transform: "translateY(-100%)",
    },
  },
});
