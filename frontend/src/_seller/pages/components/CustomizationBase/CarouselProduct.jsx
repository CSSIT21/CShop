import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import React, { useState, useLayoutEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ProductCard from "~/common/components/ProductCard";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import config from "~/common/constants";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";

const CarouselProduct = ({
  id = "0",
  information,
  setInformation = () => {},
  order = 0,
  categories,
  ...rest
}) => {
  const classes = useStyles();
  const auth = useRecoilValue(authState);

  const handleChange = async (e) => {
    const category_object = categories.find((el) => {
      return el.title === e.target.value;
    });
    const { data } = await axios.get(
      `${config.SERVER_URL}/shopcustomization/categoryproducts/${category_object.id}`
    );
    console.log(data.products.products);
    setInformation((info) => ({
      ...info,
      [id]: {
        ...info[id],
        content: {
          category: e.target.value,
          products: data.products.products,
        },
      },
    }));
  };

  return (
    <>
      <div
        style={{
          padding: "70px",
          backgroundColor: "#EFEFF1",
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
            Banner#{order}
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

        <Grid
          container
          spacing={2}
          sx={{ width: "100%", height: "100%", pointerEvents: "none" }}
        >
          {information[id]
            ? information[id].content.products
                .slice(0, 5)
                .map((product, idx) => (
                  <Grid item xs={2.4} key={idx}>
                    <ProductCard product={product} />
                  </Grid>
                ))
            : [...Array(5)].slice(0, 5).map((product, idx) => (
                <Grid item xs={2.4} key={idx}>
                  <ProductCard product={product} />
                </Grid>
              ))}
        </Grid>
      </div>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", margin: "20px 0" }}
      >
        <TextField
          id="outlined-select-currency"
          select
          label="Select Category"
          value={information[id] ? information[id].content.category : null}
          onChange={handleChange}
          sx={{ width: "30%" }}
        >
          {categories.map((category, idx) => (
            <MenuItem key={category.id} value={category.title}>
              {category.title}
            </MenuItem>
          ))}
        </TextField>
      </Box>
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
export default CarouselProduct;
