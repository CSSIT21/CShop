import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from "@mui/icons-material/Edit";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Stack from "@mui/material/Stack";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/system";

const ImageUp = styled("input")({
    display: "none",
  });
  function UploadButtons() {
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="icon-button-file">
          <ImageUp accept="image/*" id="icon-button-file" type="file" />
          <IconButton aria-label="upload picture" component="span">
            <CropOriginalIcon sx={{ fontSize: 100 }} />
          </IconButton>
        </label>
      </Stack>
    );
  }

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditationModel() {
  const [edit, setEdit] = useState(false);
  const editOpen = () => setEdit(true);
  const editClose = () => setEdit(false);

  return (
    <div>
      <EditIcon onClick={editOpen} sx={{ fontSize: 18 }} />
      <Modal
        open={edit}
        onClose={editClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <DialogTitle
        sx={{
          alignSelf: "center",
          fontStyle: "normal",
          fontSize: "36px",
          lineHeight: "54px",
          color: "#FD6637",
        }}
      >
        EDIT PRODUCT
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <TextField
              required
              id="standard-required"
              placeholder="Products"
              variant="standard"
            />
            <Box
              sx={{
                marginTop: "20px",
              }}
            >
              <TextField
                required
                id="standard-required"
                placeholder="Name"
                variant="standard"
              />
            </Box>
            <Box
              sx={{
                marginTop: "20px",
              }}
            >
              <TextField
                required
                id="standard-required"
                placeholder="Amount"
                variant="standard"
              />
            </Box>
            <Box
              sx={{
                marginTop: "20px",
              }}
            >
              <TextField
                required
                id="standard-required"
                placeholder="TotalPrice"
                variant="standard"
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", marginLeft : 5 }}>
             <UploadButtons />
            <Box
              sx={{
                display: "flex",
                marginLeft: "30px",
                fontSize: "10px",
                flexDirection: "column",
              }}
            >
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={editClose}>Cancel</Button>
        <Button onClick={editClose}>Confirm</Button>
      </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}