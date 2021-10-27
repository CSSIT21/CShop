import React, { useEffect } from "react";
import { Typography, Dialog } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialogs = ({
  open,
  handleClose,
  text,
  slide = false,
  timeOut = 3000,
  ...rest
}) => {
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        handleClose();
      }, timeOut);
    }
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        {...rest}
      >
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "60px",
          }}
        >
          <CheckCircleOutlineRoundedIcon
            style={{
              color: "#00BF9D",
              width: "86px",
              height: "86px",
              marginBottom: "30px",
            }}
          />
          <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
            {text}
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmDialogs;
