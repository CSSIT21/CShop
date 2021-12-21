import { useState } from "react";
import { Button, Typography, Modal, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FolderIcon from "@mui/icons-material/Folder";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";

import { getUrl } from "~/common/utils";
import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

// const subBodyClick = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// function SubBodyClick() {
//   const [bodyClick, setbodyClick] = useState(false);
//   const bodyClickOpen = () => setbodyClick(true);
//   const bodyClickClose = () => setbodyClick(false);

//   return (
//     <div>
//       <Button onClick={bodyClickOpen}>Yes</Button>
//       <Modal
//         open={bodyClick}
//         onClose={bodyClickClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={subBodyClick}>
//           <Box
//             sx={{ display: "flex", justifyContent: "center", color: "green" }}
//           >
//             <CheckCircleOutlineIcon sx={{ fontSize: 100 }} />
//           </Box>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Successfully added your product
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   pt: 2,
//   px: 4,
//   pb: 3,
// };

// function SubModal({ updateProduct }) {
//   const [subAdd, setSubAdd] = useState(false);
//   const subOpen = () => {
//     setSubAdd(true);
//   };
//   const subClose = () => {
//     setSubAdd(false);
//   };
//   return (
//     <Box>
//       <Button onClick={updateProduct}>ADD</Button> :
//       <Modal
//         hideBackdrop
//         open={subAdd}
//         onClose={subClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Box sx={{ ...style, width: 250 }}>
//           <h2 id="child-modal-title">Are your sure?</h2>
//           <Stack component="form" noValidate spacing={3}>
//             {/* <TextField
//               id="date"
//               label="Date"
//               type="datetime-local"
//               variant="standard"
//               defaultValue="2017-05-24T10:30"
//               sx={{ width: 190 }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             /> */}
//           </Stack>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginTop: 2,
//             }}
//           >
//             <Button onClick={subClose}>No</Button>
//             <SubBodyClick />
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

// const Input = styled("input")({
//   display: "none",
// });

// function UploadButtons() {
//   return (
//     <Stack direction="row" alignItems="center" spacing={2}>
//       <label htmlFor="icon-button-file">
//         <Input accept="image/*" id="icon-button-file" type="file" />
//         <IconButton aria-label="upload picture" component="span">
//           <CropOriginalIcon sx={{ fontSize: 150 }} />
//         </IconButton>
//       </label>
//     </Stack>
//   );
// }

// function SelectVariants() {
//   const [Category, setCategory] = useState("");

//   const categoryChange = (event) => {
//     setCategory(event.target.value);
//   };
//   return (
//     <FormControl variant="standard" sx={{ m: 0, minWidth: 350, mt: "10px" }}>
//       <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
//       <Select
//         labelId="demo-simple-select-standard-label"
//         id="demo-simple-select-standard"
//         value={Category}
//         onChange={categoryChange}
//         label="Category"
//       >
//         <MenuItem value="">
//           <em>None</em>
//         </MenuItem>
//         <MenuItem value={10}>Ten</MenuItem>
//         <MenuItem value={20}>Twenty</MenuItem>
//         <MenuItem value={30}>Thirty</MenuItem>
//       </Select>
//     </FormControl>
//   );
// }

const CategoryType = [
  {
    value: 1,
    label: "IT",
  },
  {
    value: 2,
    label: "Education",
  },
  {
    value: 3,
    label: "Fashion",
  },
  {
    value: 4,
    label: "Kids",
  },
  {
    value: 5,
    label: "Beauty",
  },
  {
    value: 6,
    label: "Furniture",
  },
  {
    value: 7,
    label: "Electronics",
  },
  {
    value: 8,
    label: "Food",
  },
  {
    value: 9,
    label: "Sport",
  },
  {
    value: 10,
    label: "Accessories",
  },
  {
    value: 11,
    label: "Others",
  },
];

export default function AddProduct({ product, setProduct }) {
  // const ProductAdd = () => setProduct(true);
  const ProduceClose = () => setProduct(false);

  const shopid = useParams();

  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    if (
      title != "" &&
      subTitle != "" &&
      quant != "" &&
      price != "" &&
      category != ""
    ) {
      setLoading(true);
      updateProduct();
    }
    // console.log(`${title},${subTitle}`);
  }

  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [quant, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [path, setPath] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [file, setFile] = useState("");
  // const [sold , setSold] = useState();
  // const [suggest , setSuggest] = useState();
  // const [rate , setRating] = useState();

  const uploadFile = async (e) => {
    // console.log(e)
    if (e) {
      const path = URL.createObjectURL(e);
      // console.log(path)
      // console.log(e.target.files[0].name);
      setPath(path);
      setFile(e);
    }
  };

  const updateProduct = async () => {
    try {
      let url = {
        success: true,
        original_link:
          "https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-store.png",
      };
      if (file) {
        url = await getUrl(file);
        // console.log(url)
      }

      if (url.success) {
        await axios.post(
          `${config.SERVER_URL}/sellerconsole/${shopid.id}/addToProduct`,
          {
            shop_id: parseInt(shopid.id),
            title: title,
            quantity: parseInt(quant),
            price: parseInt(price),
            category_id: parseInt(category),
            sub_title: subTitle,
            path: url.original_link,
            thumbnail: url.original_link,
          }
        );

        // handleClose();
        // window.alert("Create Success");
        window.location.reload(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   updateProduct();
  // }, []);

  return (
    <Dialog open={product} onClose={ProduceClose}>
      <DialogTitle
        sx={{
          alignSelf: "center",
          fontStyle: "normal",
          fontSize: "36px",
          lineHeight: "54px",
          color: "#FD6637",
          fontWeight: "bold",
        }}
      >
        ADD PRODUCT
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "350px",
            }}
          >
            <TextField
              required
              id="standard-required"
              placeholder="Title"
              variant="standard"
              fullWidth
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Box
              sx={{
                marginTop: "20px",
              }}
            >
              <TextField
                required
                id="standard-required"
                placeholder="Sub Title"
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setSubtitle(e.target.value);
                }}
              />
            </Box>
            <Box
              sx={{
                marginTop: "20px",
              }}
            >
              <TextField
                type="number"
                required
                id="standard-required"
                placeholder="Price"
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Box>
            <Box
              sx={{
                marginTop: "20px",
              }}
            >
              <TextField
                required
                type="number"
                id="standard-required"
                placeholder="Quantity"
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </Box>

            <TextField
              id="standard-select-currency"
              select
              label="Category"
              variant="standard"
              fullWidth
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              sx={{ width: "100%", mb: 3 }}
            >
              {CategoryType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <label htmlFor={`outlined-button-file-`}>
              <Button
                component="span"
                variant="outlined"
                sx={{ height: "42px", borderWidth: "2px", mt: 1 }}
              >
                <input
                  accept="image/*"
                  type="file"
                  style={{ display: "none" }}
                  id={`outlined-button-file-`}
                  onChange={(e) => {
                    uploadFile(e.target.files[0]);
                  }}
                />
                Upload file
              </Button>
            </label>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={ProduceClose}>Cancel</Button>
        {/* <Button onClick={updateProduct}>Confirm</Button> */}
        <LoadingButton
          onClick={handleClick}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
