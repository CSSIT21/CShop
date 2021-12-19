import React, { useState, useEffect } from "react";
import { Button, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Popup({
  open = false,
  setOpen = () => {},
  title = "",
  description = "",
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const shopid = useParams();

  const [shopname, setShopname] = useState();
  const [descrp, setDescription] = useState();
  const [phonenumber, setPhonenumber] = useState();

  const updateInfo = async () => {
    try {
      await axios.post(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/updateShopinfo`,
        {
          id: shopid,
          shop_name: shopname,
          description: descrp,
          phone_number: phonenumber,
        }
      );
      handleClose();
      window.location.reload(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchShopInfo = async () => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/shopinfo`
      );
      // console.log(res.data.shop_name);
      // console.log(res.data.description);
      // console.log(res.data.phone_number);
      setShopname(res.data.shop_name);
      setDescription(res.data.description);
      setPhonenumber(res.data.phone_number);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchShopInfo();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          alignSelf: "center",
        }}
      >
        Change your information
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            alignSelf: "center",
          }}
        >
          Enter your new information and click save
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          onChange={(e) => {
            setShopname(e.target.value);
          }}
          value={shopname}
          label="Shop name"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          id="standard-multiline-static"
          label="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          multiline
          fullWidth
          value={descrp}
          rows={5}
          variant="standard"
        />
        <Box sx={{ marginTop: 2 }}>
          <TextField
            id="outlined-textarea"
            label="Phone number"
            placeholder="Phone : XXX-XXX-XXXX"
            onChange={(e) => {
              setPhonenumber(e.target.value);
            }}
            type="number"
            variant="standard"
            value={phonenumber}
            multiline
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={updateInfo}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
