import React from "react";
import Box from "@mui/material/Box";

const sideImage = ({ img }) => {
  return (
    <Box
      sx={{
        width: "512px",
        height: "512px",
        border: "1px solid #EFF0F6",
        borderRadius: "10px",
        backgroundColor: "#EFF0F6",
        left: "132px",
        top: "8px",
      }}
    >
      <image
        src={img}
        sx={{
          maxWidth: "100%",
          maxHeight: "100%",
          display: "block",
        }}
      ></image>
    </Box>
  );
};

export default sideImage;
