import React, { useState } from "react";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import ReviewDialogContents from "./ReviewDialogContents";
import CButton from "~/common/components/CButton";
import ConfirmDialogs from "~/common/components/ConfirmDialogs";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    padding: "25px 45px 8px 45px",
  },
  "& .MuiDialogContent-root": {
    padding: "25px 45px",
  },
  "& .MuiDialogActions-root": {
    padding: "20px 45px 25px 45px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ReviewDialog({ children }) {
  const [open, setOpen] = React.useState(false);
  const [openThankYouDialog, setOpenThankYouDialog] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseThankYouDialog = () => {
    setOpenThankYouDialog(false);
  };
  const handleClickOpenThankYouDialog = () => {
    setOpenThankYouDialog(true);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Review
      </Button>

      <BootstrapDialog
        maxWidth="xl"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        // sx={{ padding: "100px 10px" }}
      >
        <DialogTitle
          sx={{ color: "#FD6637", fontSize: "24px", fontWeight: "600" }}
        >
          {"Product Review"}
        </DialogTitle>
        <DialogContent sx={{ width: "1000px", height: "500px" }}>
          <ReviewDialogContents />
        </DialogContent>
        <DialogActions>
          <CButton
            title="Cancel"
            width="100px"
            height="39px"
            onClick={handleClose}
            backgroundColor="white"
            style={{ color: "#A0A3BD" }}
          />
          <CButton
            title="Confirm"
            width="100px"
            height="39px"
            onClick={handleClickOpenThankYouDialog}
            sx={{ marginLeft: "16px" }}
          />
          <ConfirmDialogs
            text="Your review has been sent"
            open={openThankYouDialog}
            handleClose={handleCloseThankYouDialog}
          />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
export default ReviewDialog;
