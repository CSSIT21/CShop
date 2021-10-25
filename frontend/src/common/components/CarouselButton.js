import React from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { Box } from "@mui/system";

const CarouselButton = ({
  pageHandle,
  currentPage,
  totalPage,
  loop = false,
}) => {
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
        disabled={!loop && currentPage === 0}
        onClick={() => {
          if (currentPage === 0) {
            pageHandle(totalPage - 1);
          } else {
            pageHandle(currentPage - 1);
          }
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
        disabled={!loop && currentPage === totalPage - 1}
        onClick={() => {
          if (totalPage - 1 === currentPage) {
            pageHandle(0);
          } else {
            pageHandle(currentPage + 1);
          }
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
