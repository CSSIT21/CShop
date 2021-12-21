import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Avatar, Typography, Button } from "@mui/material";
import { useRecoilState } from "recoil";
import authState from "../../common/store/authState";
import { useHistory } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import config from "../../common/constants";
import Swal from "sweetalert2";
import { getUrl } from "~/common/utils";

const TopProfile = () => {
  const classes = useStyles();
  const [auth, setAuth] = useRecoilState(authState);
  const router = useHistory();
  const avatar = useRef();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(
    auth?.user?.customer_picture?.picture_id_from_customer_picture?.path
  );
  const [imageFile, setimageFile] = useState();
  const [imageTitle, setimageTitle] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setImage(
      auth?.user?.customer_picture?.picture_id_from_customer_picture?.path
    );
    handleClose();
  };
  const uploadFile = (e) => {
    if (e.target.files.length) {
      const path = URL.createObjectURL(e.target.files[0]);
      setImage(path);
      setimageFile(e.target.files[0]);
      setimageTitle(e.target.files[0].name.slice(0, 50));
    }
  };
  const handleUpdateImage = async () => {
    const url = await getUrl(imageFile);
    axios
      .patch(`${config.SERVER_URL}/profile/update/image`, {
        id: auth.user.customer_picture.picture_id,
        url: url.original_link,
        title: imageTitle,
      })
      .then(({ data }) => {
        if (data.success) {
          Swal.fire({
            title: "Success!",
            text: "Your picture has been update!",
            icon: "success",
            timer: 2000,
          });
          axios
            .get(`${config.SERVER_URL}/profile/me`, {
              withCredentials: true,
              validateStatus: () => true,
            })
            .then(({ data }) => {
              if (data.success) {
                setAuth(({ isLoggedIn }) => ({ isLoggedIn, user: data.user }));
              }
            });
        } else {
          Swal.fire({
            title: "Update failed!",
            text: "Please check if your file is valid or file name must be shorter than 50",
            icon: "error",
            timer: 2000,
          });
          setImage(
            auth?.user?.customer_picture?.picture_id_from_customer_picture?.path
          );
        }
      });
    handleClose();
  };
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
          src={
            auth?.user?.customer_picture?.picture_id_from_customer_picture?.path
          }
          sx={{ width: 80, height: 80, marginRight: "25px" }}
          className={classes.profilePic}
          ref={avatar}
          onClick={handleClickOpen}
        ></Avatar>
        <Box className={classes.nametag}>
          <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
            {auth?.user?.customer_info?.firstname}{" "}
            {auth?.user?.customer_info?.lastname}
          </Typography>
          <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
            #{auth?.user?.customer_info?.customer_id}
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
            router.push(`/shop/${auth?.user?.shop_info[0]?.id}`);
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>My Shop</Typography>
        </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            padding: "40px 150px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography fontSize={"30px"} fontWeight={"500"}>
            Edit image
          </Typography>
          <Box sx={{ display: "flex", alignItems: "end", marginTop: "40px" }}>
            <Avatar
              src={image}
              sx={{ width: 150, height: 150, marginRight: "30px" }}
            ></Avatar>
            <label htmlFor={`outlined-button-file-`}>
              <Button
                component="span"
                variant="outlined"
                sx={{ height: "42px", borderWidth: "2px" }}
              >
                <input
                  accept="image/*"
                  type="file"
                  style={{ display: "none" }}
                  id={`outlined-button-file-`}
                  onChange={(e) => {
                    uploadFile(e);
                  }}
                />
                Upload file
              </Button>
            </label>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleUpdateImage}>Save</Button>
        </DialogActions>
      </Dialog>
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
