import React, { useState, useMemo } from "react";
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
  const [open, setOpen] = useState(false);
  const [openThankYouDialog, setOpenThankYouDialog] = useState(false);

  const [chipData, setChipData] = useState([
    { key: 0, label: "Good Quality", clicked: false },
    { key: 1, label: "Worth Buying", clicked: false },
    { key: 2, label: "Fast Shipping", clicked: false },
    { key: 3, label: "Good Shop Services", clicked: false },
    { key: 4, label: "Good Ship Services", clicked: false },
  ]);

  const submitable = useMemo(() => {
    let chipCheck = false;
    chipData.forEach((el) => {
      if (el.clicked) chipCheck = true;
    });

    // เพ่ิมconditions(image, commenttext, chip)เพิ่มdependency
    return chipCheck;
  }, [chipData]);

  const [value, setValue] = React.useState("");

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

  const handleChange = (e) => {
    setValue(e.target.value.slice(0, 120));
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
      >
        <DialogTitle
          sx={{ color: "#FD6637", fontSize: "24px", fontWeight: "600" }}
        >
          {"Product Review"}
        </DialogTitle>
        <DialogContent sx={{ width: "1000px", height: "500px" }}>
          <ReviewDialogContents
            generatedCommentsData={chipData}
            setChipData={setChipData}
            value={value}
            setValue={setValue}
            handleChange={handleChange}
          />
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
            disabled={!submitable}
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
