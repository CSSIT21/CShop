import React from "react";
import { Typography, Dialog } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const ConfirmDialogs = ({ open, handleClose, text }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
