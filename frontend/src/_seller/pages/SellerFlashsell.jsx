import { Typography, Button } from "@mui/material";
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

  //   shop_id: shopid,
  //   title: title,
  //   path: path,
  //   thumbnail: thumbnail,
  //   description: description,
  //   started_date: started_date,
  //   ended_date: ended_date,
  //   products: {product}

  const [descpt, setDescpt] = useState("");
  const [started_date, setStarted] = useState("");
  const [ended_date, setEnded] = useState("");
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const newFlashSale = async () => {
    try {
      await axios.post(
        `${config.SERVER_URL}/sellerconsole/${shopid}/newflashsales`,
        {
          shop_id: parseInt(shopid.id),
          title: title,
          path: path,
          thumbnail: thumbnail,
          description: descpt,
          started_date: started_date,
          ended_date: ended_date,
        }
      );

      if (newFlashSale) {
        window.alert("Create Success");
        window.location.reload(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = () => {
    console.log(
      `${descpt},${started_date},${ended_date},${title},${path},${thumbnail},${shopid.id}`
    );
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
          <TextField
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
          />
          <Typography variant="caption" gutterBottom sx={{ color: "orange" }}>
            *ALL PRODUCT IN YOUR SHOP WILL INCLUDED IN FLASH SALE
          </Typography>
          <Box sx={{ m: 1 }}>
            <Button
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
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SellerFlashsell;
