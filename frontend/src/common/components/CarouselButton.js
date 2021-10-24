import React from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { Box } from "@mui/system";

const CarouselButton = ({ pageHandle, currentPage }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Fab
        size="medium"
        aria-label="prev"
        sx={{
          backgroundColor: "#FFFF",
          boxShadow: "none",
          width: "50px",
          height: "50px",
        }}
        onClick={() => {
          pageHandle(currentPage - 1);
        }}
      >
        <ChevronLeft style={iconStyle} />
      </Fab>
      <Fab
        size="medium"
        color="primary"
        aria-label="next"
        sx={{
          boxShadow: "none",
          marginLeft: 1.7,
          width: "50px",
          height: "50px",
        }}
        onClick={() => {
          pageHandle(currentPage + 1);
        }}
      >
        <ChevronRight style={iconStyle} />
      </Fab>
    </Box>
  );
};

const iconStyle = {
  fontSize: "30px",
};
export default CarouselButton;
