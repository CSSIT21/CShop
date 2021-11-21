import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ProductCard from "~/common/components/ProductCard";
import MenuItem from "@mui/material/MenuItem";

const CarouselProduct = ({
  section = {
    id: "0",
    page: {
      type: 2,
      id: 1,
      content: [],
    },
  },
  order = 0,
  ...rest
}) => {
  const classes = useStyles();
  const categories = ["Baba1", "Baba2", "Baba3"];
  const [selectCategory, setSelectCategory] = useState();

  return (
    <>
      <Box
        sx={{
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
          {[...Array(5)].map((id, idx) => (
            <Grid item xs={2.4} key={idx}>
              <ProductCard />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", margin: "20px 0" }}
      >
        <TextField
          id="outlined-select-currency"
          select
          label="Select Category"
          value={selectCategory}
          onChange={(e) => {
            setSelectCategory(e.target.value);
          }}
          sx={{ width: "30%" }}
        >
          {categories.map((category, idx) => (
            <MenuItem key={idx} value={category}>
              {category}
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
