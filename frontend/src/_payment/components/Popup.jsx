import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #FFE8E1CC",
  boxShadow: 24,
  p: 2,
};

const buttons = [
  <Button key="two">Internet Banking</Button>,
  <Button key="four">QR Code</Button>,
];

const Popup = () => {
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Select payment
      </Typography>
      <Box
        id="modal-modal-description"
        sx={{
          mt: 2,
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
        >
          {buttons}
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default Popup;
