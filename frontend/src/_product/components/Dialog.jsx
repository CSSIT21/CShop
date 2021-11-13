import * as React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import Added from "@mui/icons-material/CheckCircleOutlineRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  return (
    <div>
      <Added
        sx={{
          color: "#00BF9D",
          padding: "8.33%",
          width: "86px",
          height: "86px",
          left: "00px",
        }}
      />
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          The item already added in the cart
        </DialogContentText>
      </DialogContent>
    </div>
  );
}
