import React from "react";
import Grid from "@mui/material/Grid";

const ProductDetailHeader = ({ status }) => {
  if (status === "Success") {
    return (
      <>
        <Grid item xs={1} sx={gridStyle}></Grid>
        <Grid item xs={8} sx={gridStyle}>
          Product Name
        </Grid>
        <Grid item xs={1} sx={gridStyle}>
          Price
        </Grid>
        <Grid item xs={2} sx={gridStyle}></Grid>
      </>
    );
  }
  return (
    <>
      <Grid item xs={1} sx={gridStyle}></Grid>
      <Grid item xs={10} sx={gridStyle}>
        Product Name
      </Grid>
      <Grid item xs={1} sx={gridStyle}>
        Price
      </Grid>
    </>
  );
};
const gridStyle = {
  margin: "20px",
};
export default ProductDetailHeader;
