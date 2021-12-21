import { Avatar, Typography, Modal, Input, Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { Box } from "@mui/system";
import { useRecoilValue } from "recoil";
import authState from "../../common/store/authState";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { ThemeProvider, makeStyles } from "@mui/styles";
import StockLogBody from "./components/TableContent/StockLogBody";
import PageHeader from "./components/PageHeader";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

import { getUrl } from "~/common/utils";
import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

// const ProductType = [
//     {
//         value: 1,
//         label: "IT",
//     },
//     {
//         value: 2,
//         label: "Education",
//     },
//     {
//         value: 3,
//         label: "Fashion",
//     },
//     {
//         value: 4,
//         label: "Kids",
//     },
//     {
//         value: 5,
//         label: "Beauty",
//     },
//     {
//         value: 6,
//         label: "Furniture",
//     },
//     {
//         value: 7,
//         label: "Electronics",
//     },
//     {
//         value: 8,
//         label: "Food",
//     },
//     {
//         value: 9,
//         label: "Sport",
//     },
//     {
//         value: 10,
//         label: "Accessories",
//     },
//     {
//         value: 11,
//         label: "Others",
//     },
// ];

const SellerFlashsell = () => {
  const Pagename = "Flash Sale";
  const auth = useRecoilValue(authState);
  const shopid = useParams();

  //   "shop_id":1,
  //   "title":"Aroy",
  //   "path":"https://i.ytimg.com/vi/e8YBesRKq_U/maxresdefault.jpg",
  //   "thumbnail":"https://i.ytimg.com/vi/e8YBesRKq_U/maxresdefault.jpg",
  //   "description":"All sales 25hrs",
  //   "started_date":"2021-12-19T11:05:26.014Z",
  //   "ended_date":"2021-12-25T18:05:26.014Z"

  const [descpt, setDescpt] = useState("");
  const [started_date, setStarted] = useState("");
  const [ended_date, setEnded] = useState("");
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [file, setFile] = useState("");

  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    if (
      descpt != "" &&
      started_date != "" &&
      ended_date != "" &&
      title != "" &&
      path != "" &&
      thumbnail != ""
    ) {
      // console.log('HELLO')
      setLoading(true);
      handleSubmit();
    }
  }

  const uploadFile = async (e) => {
    if (e.target.files.length) {
      const path = URL.createObjectURL(e.target.files[0]);
      // console.log(e.target.files[0].name);
      setPath(path);
      setThumbnail(path);
      setTitle(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };

  const newFlashSale = async () => {
    try {
      let url = {
        success: true,
        original_link:
          "https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-store.png",
      };
      if (file) {
        url = await getUrl(file);
        // setPicpath(url.original_link);
        // setPicthumnai(url.original_link);
      }
      if (url.success) {
        await axios.post(
          `${config.SERVER_URL}/sellerconsole/${shopid.id}/newflashsales`,
          {
            shop_id: parseInt(shopid.id),
            title: title,
            path: url.original_link,
            thumbnail: url.original_link,
            description: descpt,
            started_date: started_date,
            ended_date: ended_date,
          }
        );
        // window.alert("Create Success");
        window.location.reload(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = () => {
    // console.log(
    //   `${descpt},${started_date},${ended_date},${title},${path},${thumbnail},${shopid.id}`
    // );
    newFlashSale();
  };

  return (
    <Box>
      <Box sx={{ mt: "4rem" }} />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <PageHeader Pagename={Pagename} />
      </Box>
      <Box sx={{ mt: "4rem" }} />

      <Box
        sx={{
          m: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            justifyContent: "center",
            p: 5,
          }}
        >
          <Typography
            gutterBottom
            sx={{ fontWeight: 600, fontSize: "1.5em", mt: 1 }}
          >
            FlashSale information
          </Typography>
          {/* <TextField
                        required
                        select
                        id="outlined-required"
                        label="Product"

                    >
                        {ProductType.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField> */}
          <TextField
            id="outlined-required"
            label="Description"
            placeholder="description"
            sx={{ mb: 3 }}
            onChange={(e) => {
              setDescpt(e.target.value);
            }}
          />
          <Box>
            <TextField
              required
              id="datetime-local"
              label="start date"
              type="datetime-local"
              placeholder="2019-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: "50%", mb: 3, pr: 2 }}
              onChange={(e) => {
                setStarted(e.target.value);
              }}
            />
            <TextField
              required
              id="datetime-local"
              label="end date"
              type="datetime-local"
              placeholder="2020-08-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: "50%", mb: 3 }}
              onChange={(e) => {
                setEnded(e.target.value);
              }}
            />
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Typography
            gutterBottom
            sx={{ fontWeight: 600, fontSize: "1.5em", mt: 1 }}
          >
            Picture
          </Typography>
          <TextField
            id="outlined-required"
            label="Title"
            placeholder="title"
            sx={{ mb: 3 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {/* <TextField
            id="outlined-required"
            label="Path"
            placeholder="path"
            sx={{ mb: 3 }}
            onChange={(e) => {
              setPath(e.target.value);
            }}
          />
          <TextField
            id="outlined-required"
            label="Thumbnail"
            placeholder="thumbnail"
            sx={{ mb: 3 }}
            onChange={(e) => {
              setThumbnail(e.target.value);
            }}
          /> */}{" "}
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
          <Typography variant="caption" gutterBottom sx={{ color: "orange" }}>
            *ALL PRODUCT IN YOUR SHOP WILL INCLUDED IN FLASH SALE
          </Typography>
          <Box sx={{ m: 1 }} onClick={handleClick}>
            {/* <Button
              variant="contained"
              startIcon={<FlashOnIcon sx={{ fontSize: "1.52em" }} />}
              sx={{
                textTransform: "capitalize",
                height: "5vh",
                display: "flex",
                mt: 3,
              }}
              onClick={handleSubmit}
            >
              <Typography sx={{ fontSize: "1.52em" }}>Create</Typography>
            </Button> */}
            <LoadingButton
              
              startIcon={<FlashOnIcon sx={{ fontSize: "1.52em" }} />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                height: "5vh",
                display: "flex",
                pl: 8,
                pr: 8,
              }}
            >
              Confirm
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SellerFlashsell;
