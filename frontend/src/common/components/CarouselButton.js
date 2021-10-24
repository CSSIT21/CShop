import React from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { Box } from "@mui/system";

// ถ้าแปะtotalPageมา Carouselจะไม่loop

const CarouselButton = ({ pageHandle, currentPage, totalPage = false }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Fab
        aria-label="prev"
        sx={{
          backgroundColor: "#FFFF",
          boxShadow: "none",
          width: "50px",
          height: "50px",
        }}
        disabled={totalPage && currentPage == 0}
        onClick={() => {
          pageHandle(currentPage - 1);
        }}
      >
        <ChevronLeft style={iconStyle} />
      </Fab>

      <Fab
        sx={{
          boxShadow: "none",
          marginLeft: 1.7,
          width: "50px",
          height: "50px",
        }}
        color="primary"
        aria-label="next"
        disabled={currentPage == totalPage - 1}
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
