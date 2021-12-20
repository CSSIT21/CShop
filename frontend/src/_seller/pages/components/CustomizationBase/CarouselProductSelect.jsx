import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ProductCard from "~/common/components/ProductCard";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { nanoid } from "nanoid";
import AddIcon from "@mui/icons-material/Add";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import config from "~/common/constants";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";

const CarouselProductSelect = ({
  id = "0",
  information,
  setInformation = () => {},
  ...rest
}) => {
  const auth = useRecoilValue(authState);
  const [originalProduct, setoriginalProduct] = useState([]);
  const [sectionImages, setSectionImages] = useState([]);
  const [products_id, setproducts_id] = useMemo(() => {
    return [
      sectionImages.map((e) => {
        return e.id;
      }),
    ];
  }, [sectionImages]);

  console.log(products_id);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openAddProduct, setopenAddProduct] = useState(false);
  const [Topic, setTopic] = useState("Topic");
  const [searchText, setsearchText] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  useLayoutEffect(() => {
    if (id in information) {
      setTopic(information[id].content.filter_name);
      setSectionImages(information[id].content.products_info);
    } else {
      console.log("products not found");
    }
  }, []);
  useEffect(() => {
    axios
      .get(
        `${config.SERVER_URL}/shopcustomization/products/${auth.user.shop_info[0].id}`
      )
      .then(({ data }) => {
        setoriginalProduct(data.products);
      });
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedValue(event.target.value);
  };
  const addImage = () => {
    if (selectedValue) {
      setSectionImages([
        ...sectionImages,
        products.find((e) => e.id == selectedValue),
      ]);
      handleCloseProduct();
      setSelectedValue(null);
    }
  };

  const products = useMemo(() => {
    // "   hello  world   " -> "hello world"
    let words = searchText.trim().split(" ");

    let products = originalProduct.filter((e) => {
      return (
        !products_id.includes(e.id) &&
        words.every((word) => {
          return e.title.toLowerCase().includes(word.toLowerCase());
        })
      );
    });
    return products;
  }, [originalProduct, products_id, sectionImages, searchText]);
  console.log(products, typeof products !== "undefined");

  const updateTopic = () => {
    if (Topic !== "") {
      setTimeout(() => {
        setInformation((info) => ({
          ...info,
          [id]: {
            ...info[id],
            header: Topic,
            content: { products_info: sectionImages, products: products_id },
          },
        }));
      }, 500);

      handleClose();
    }
  };

  const deleteImage = (id) => {
    console.log(id);
    setSectionImages(sectionImages.filter((s, index) => id !== s.id));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenProduct = () => {
    setopenAddProduct(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseProduct = () => {
    setopenAddProduct(false);
  };
  return (
    <>
      <Box
        sx={{
          padding: "70px",
          backgroundColor: "#FDF4DD",
          borderRadius: "20px",
        }}
        {...rest}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <Typography
            component="span"
            color="#000000"
            fontSize="24px"
            fontWeight={600}
          >
            {Topic}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{ backgroundColor: "#FFFFFF" }}
              className={classes.iconStyle}
            >
              <ChevronLeftIcon style={{ color: "#000000" }} />
            </Box>
            <Box
              sx={{ backgroundColor: "#FD6637" }}
              className={classes.iconStyle}
            >
              <ChevronRightIcon style={{ color: "#FFFFFF" }} />
            </Box>
          </Box>
        </Box>
        <Box
          onClick={handleClickOpen}
          sx={{
            "&:hover": {
              opacity: "0.5",
              transition: "0.25s all ease-in-out",
            },
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {sectionImages.slice(0, 5).map((product, idx) => (
              <Grid item xs={2.4} key={idx}>
                <ProductCard product={product} />
              </Grid>
            ))}
            {5 - sectionImages.length > 0 &&
              [...Array(5 - sectionImages.length)].map((id, idx) => (
                <Grid item xs={2.4} key={idx}>
                  <ProductCard />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ textAlign: "center", padding: "50px 0" }}>
          <Typography
            component="span"
            color="#FD6637"
            fontWeight={600}
            fontSize="24px"
          >
            Add Product Carousel
          </Typography>
        </DialogTitle>

        <Box
          sx={{
            padding: "0 150px 50px 150px",
            borderRadius: "20px",
            height: "600px",
          }}
        >
          <Typography component="span" color="#000000" fontWeight={400}>
            Topic
          </Typography>
          <Box sx={{ display: "flex", marginTop: "10px" }}>
            <TextField
              type="text"
              sx={{ color: "#FD6637", margin: "0 0 50px 0" }}
              fullWidth
              placeholder="Topic"
              value={Topic}
              onChange={(e) => {
                setTopic(e.target.value);
              }}
            />
            <Button
              onClick={updateTopic}
              sx={{ width: "100px", height: "56px", marginLeft: "10px" }}
              variant="contained"
              disabled={!(Topic !== "")}
            >
              Save
            </Button>
          </Box>

          <Grid container spacing={5}>
            {sectionImages.map((product, idx) => (
              <Grid item xs="4" key={idx}>
                <Box
                  key={product.id}
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "100%",
                    display: "block",

                    "& .MuiSvgIcon-root": {
                      opacity: "0",
                    },
                    "&:hover img": {
                      opacity: "0.5",
                    },
                    "&:hover .MuiSvgIcon-root": {
                      opacity: "1",
                    },
                  }}
                >
                  <img
                    onClick={() => {
                      deleteImage(product.id);
                    }}
                    src={product.product_picture[0].path}
                    style={{
                      objectFit: "cover",
                      transition: "0.25s all ease-in-out",
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                  ></img>
                  <DeleteRoundedIcon
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      transition: "0.25s all ease-in-out",
                    }}
                  />
                </Box>
              </Grid>
            ))}
            <Grid item xs="4">
              <Box
                onClick={handleClickOpenProduct}
                sx={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "100%",
                  display: "block",
                  border: "1px solid #FD6637",
                  borderRadius: "15px",
                  marginBottom: "50px",
                }}
              >
                <AddIcon
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "50%",
                    transform: "translate(50%, -50%)",
                    color: "#FD6637",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
      <Dialog
        open={openAddProduct}
        keepMounted
        onClose={handleCloseProduct}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ textAlign: "center", position: "relative" }}>
          <IconButton
            onClick={handleCloseProduct}
            sx={{ position: "absolute", left: "20px" }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            component="span"
            color="#000000"
            fontWeight={500}
            fontSize="18px"
          >
            Choose Product
          </Typography>
          <Button
            onClick={addImage}
            sx={{ position: "absolute", right: "20px" }}
          >
            Next
          </Button>
        </DialogTitle>
        <TextField
          id="product"
          sx={{ margin: "0 25px" }}
          variant="filled"
          size="small"
          value={searchText}
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ padding: "20px 40px", height: "500px" }}>
          {typeof products !== "undefined" ? (
            products.map((product, idx) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "50px",
                  marginBottom: "20px",
                }}
                key={idx}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    variant="square"
                    alt={product.title}
                    src={product.product_picture[0].path}
                    sx={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      marginRight: "5px",
                    }}
                  />
                  <Typography
                    color="#000000"
                    fontWeight={400}
                    fontSize="16px"
                    sx={{
                      width: "100%",
                      height: "25px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.title}
                  </Typography>
                </Box>
                <Radio
                  checked={selectedValue == product.id}
                  onChange={handleChange}
                  value={product.id}
                  inputProps={{ "aria-label": product.id }}
                />
              </Box>
            ))
          ) : (
            <></>
          )}
        </Box>
      </Dialog>
    </>
  );
};
const useStyles = makeStyles({
  iconStyle: {
    borderRadius: "50%",
    backgroundColor: "#FD6637",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 7.5px",
  },
});
export default CarouselProductSelect;
