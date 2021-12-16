import { borderRadius, Box } from "@mui/system";
import React from "react";

const PreviewProductCard = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        width: "40px",
        height: "50px",
        padding: "0.1rem",
        margin: "0 0.2rem",
        borderRadius: "3px",
      }}
    >
      <Box
        sx={{ backgroundColor: "#CCCCCC", height: "30px", borderRadius: "3px" }}
      ></Box>
    </Box>
  );
};

export default PreviewProductCard;
