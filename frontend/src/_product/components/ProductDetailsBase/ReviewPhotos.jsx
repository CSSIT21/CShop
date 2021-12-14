import React from "react";
import { Box } from "@mui/material";
import { noop } from "~/common/utils";

const ReviewPhotos = ({
  id = 0,
  img = [
    "https://offautan-uc1.azureedge.net/-/media/images/off/ph/products-en/products-landing/landing/off_overtime_product_collections_large_2x.jpg?la=en-ph",
  ],
  children,
  handleClickOpen,
  setPage = noop,
  page,
  ...rest
}) => {
  return (
    <Box sx={containerStyle} variant="outlined" {...rest}>
      <Box
        onClick={() => {
          handleClickOpen(id);
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "80px",
  height: "80px",
  margin: "0 0 0 0",

  overflow: "hidden",
  position: "relative",
  borderRadius: "15px",
};

export default ReviewPhotos;
