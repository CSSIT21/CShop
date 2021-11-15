import { Box } from "@mui/system";
import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const ProductCommentImage = ({
  id = 1,
  name = "product's name",
  variation = "black",
  img = "https://offautan-uc1.azureedge.net/-/media/images/off/ph/products-en/products-landing/landing/off_overtime_product_collections_large_2x.jpg?la=en-ph",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "30%",
        marginLeft: "100px",
      }}
      variant="outlined"
    >
      <Link to={`/product/${id}`}>
        <img
          src={img}
          width="150px"
          height="150px"
          style={{ backgroundSize: "cover", borderRadius: "15px" }}
          alt={name}
        />
      </Link>
      <Box sx={{ marginLeft: "10px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography fontWeight={500}>Name:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight={500}>Variation:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{variation}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductCommentImage;
