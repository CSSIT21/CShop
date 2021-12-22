import { useState } from "react";
import { Button, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const subBodyClick = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
  export default  function SubBodyClick() {
    const [bodyClick, setbodyClick] = useState(false);
    const bodyClickOpen = () => setbodyClick(true);
    const bodyClickClose = () => setbodyClick(false);
  
    return (
      <div>
        <CheckIcon onClick = {bodyClickOpen} />
        {/* <Button onClick={bodyClickOpen}>Yes</Button> */}
        <Modal
          open={bodyClick}
          onClose={bodyClickClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={subBodyClick}>
            <Box
              sx={{ display: "flex", justifyContent: "center", color: "green" }}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 100 }} />
            </Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Successfully added your order.
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }