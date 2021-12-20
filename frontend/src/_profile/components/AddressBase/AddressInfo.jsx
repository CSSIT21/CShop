import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography, Dialog, DialogContent, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddressDetail from "./AddressDetail";
import { For } from "../../../common/utils";
import Slide from "@mui/material/Slide";
import { useRecoilValue } from "recoil";
import authState from "../../../common/store/authState";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingButton from "@mui/lab/LoadingButton";
import config from "~/common/constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AddressInfo = ({ address, setAddress = () => {} }) => {
  const classes = useStyles();
  const [deleteId, setdeleteId] = useState(0);
  const [open, setOpen] = useState(false);
  const auth = useRecoilValue(authState);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
    setdeleteId(0);
  };
  const handleDeleteAddress = () => {
    setIsLoading(true);
    axios
      .post(config.SERVER_URL + "/profile/address/delete", {
        id: auth.user.id,
        addressId: deleteId,
      })
      .then(({ data }) => {
        Swal.fire({
          title: "Delete success!",
          text: "Your address has been deleted!",
          icon: "success",
          timer: 3000,
        });
        axios
          .post(config.SERVER_URL + "/profile/address/get", {
            id: auth.user.id,
          })
          .then(({ data }) => {
            setAddress(data.address);
          });
        setIsLoading(false);
        setOpen(false);
      });
  };

  return (
    <Box sx={{ width: "100%", marginTop: "50px", paddingBottom: "170px" }}>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "60px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "500",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Are you sure you want to delete this address?
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="outlined"
              className={classes.button}
              onClick={handleCloseDialog}
            >
              No
            </Button>

            {!isLoading ? (
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleDeleteAddress}
              >
                Yes
              </Button>
            ) : (
              <LoadingButton
                loading
                variant="contained"
                className={classes.button}
              ></LoadingButton>
            )}
          </Box>
        </DialogContent>
      </Dialog>
      <Box sx={{ width: "100%", padding: "0px 16px" }}>
        <Typography
          sx={{ fontSize: "24px", fontWeight: 600, marginBottom: "35px" }}
        >
          Delivery Address
        </Typography>
        <Grid container className={classes.header}>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}>
            Recipient's Name
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            Address
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            Phone Number
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>

        <Grid container className={classes.info} style={{}}>
          <For each={address}>
            {(item, idx) => (
              <AddressDetail
                key={idx}
                data={item}
                index={idx}
                handleOpenDelete={() => {
                  setdeleteId(item.id);
                  setOpen(true);
                }}
              />
            )}
          </For>
        </Grid>
      </Box>
    </Box>
  );
};
const useStyles = makeStyles({
  header: {
    backgroundColor: "#FD6637",
    fontWeight: "600",
    color: "white",
    padding: "15px 15px",
    textAlign: "start",
    borderRadius: "10px 10px 0px 0px",
  },
  info: {
    fontWeight: "400",
    fontSize: "14px",
    textAlign: "start",
    boxShadow: "0px 3.55484px 3.55484px rgba(196, 196, 196, 0.26)",
    borderRadius: "0px 0px 10px 10px",
  },
  button: {
    width: "80px",
    height: "45px",
  },
});

export default AddressInfo;
