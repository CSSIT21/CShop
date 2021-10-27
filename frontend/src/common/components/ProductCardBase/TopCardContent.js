import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const TopCardContent = ({ title, price }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography gutterBottom fontWeight="bold" variant="h10" component="div">
        {title}
      </Typography>
      <Typography gutterBottom fontWeight="bold" variant="h10" component="div">
        {price} B.
      </Typography>
    </Box>
  );
};

export default TopCardContent;
