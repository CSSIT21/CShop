import { useState, useEffect } from "react";
import { Button, Typography, Modal, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import ImageIcon from "@mui/icons-material/Image";
import SaveIcon from "@mui/icons-material/Save";

import { getUrl } from "~/common/utils";
import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Popup({
  open = false,
  setOpen = () => {},
  // title = "",
  // description = "",
  shoppath,
}) {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    if (shopname != "") {
      setLoading(true);
      updateInfo();
    }
  }
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
  const [pictitle, setTitle] = useState("");
  const [path, setPath] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [file, setFile] = useState("");

  const uploadFile = async (e) => {
    // console.log(e.target.files[0]);
    if (e.target.files.length) {
      const path = URL.createObjectURL(e.target.files[0]);
      // console.log(e.target.files[0].name);
      setPath(path);
      setTitle(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };

  const updateInfo = async () => {
    try {
      let url = {
        success: true,
        original_link:
          "https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-store.png",
      };
      if (file) {
        url = await getUrl(file);
        // console.log(url.original_link);
      }
      if (url.success) {
        // setPath(url.original_link);
        // setThumbnail(url.original_link);
        await axios.post(
          `${config.SERVER_URL}/sellerconsole/${shopid.id}/updateShopinfo`,
          {
            id: shopid,
            shop_name: shopname,
            description: descrp,
            phone_number: phonenumber,
            title: pictitle,
            path: url.original_link,
            thumbnail: url.original_link,
          }
        );
        // window.alert("Success");
        handleClose();
        window.location.reload(false);
      }
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
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Avatar
            src={path}
            alt="avatar"
            variant="square"
            sx={{
              width: "150px",
              height: "150px",
              marginRight: "30px",
              mt: 2,
            }}
          >
            {path ? "" : <ImageIcon sx={{ fontSize: "4em" }} />}
          </Avatar>
          <label htmlFor={`outlined-button-file-`}>
            <Button
              component="span"
              variant="outlined"
              sx={{ height: "42px", borderWidth: "2px" }}
            >
              <input
                accept="image/*"
                type="file"
                style={{ display: "none" }}
                id={`outlined-button-file-`}
                onChange={(e) => {
                  uploadFile(e);
                }}
              />
              Upload file
            </Button>
          </label>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          Cancel
        </Button>
        {/* <Button onClick={updateInfo}>Save</Button> */}
        <LoadingButton
          onClick={handleClick}
          endIcon={<SaveIcon sx={{ fontSize: "1.52em" }} />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          sx={{
            textTransform: "capitalize",
            height: "5vh",
            display: "flex",
            mt: 2,
            pl: 8,
            pr: 8,
          }}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
