import { useState } from "react";
import { Button, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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
  
  function SubBodyClick() {
    const [bodyClick, setbodyClick] = useState(false);
    const bodyClickOpen = () => setbodyClick(true);
    const bodyClickClose = () => setbodyClick(false);
  
    return (
      <div>
        <Button onClick={bodyClickOpen}>Yes</Button>
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
              Successfully added your product
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  
export default function DeleteOnClick() {
    const [subAdd, setSubAdd] = useState(false);
    const subOpen = () => {
      setSubAdd(true);
    };
    const subClose = () => {
      setSubAdd(false);
    };
    return (
      <Box>
         <DeleteIcon onClick={subOpen} sx={{ fontSize: 18 }} />
        <Modal
          hideBackdrop
          open={subAdd}
          onClose={subClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 250 }}>
            <h2 id="child-modal-title">Are your sure?</h2>
            <Stack component="form" noValidate spacing={3}>
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "space-between",marginTop : 2 }}>
              <Button onClick={subClose}>No</Button>
              <SubBodyClick/>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  }