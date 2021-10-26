import React from "react";
import Box from "@mui/material/Box";

const sideImage = ({ img, ...rest }) => {
  return (
    <Box
      sx={{
        top: "-0.9px",
      }}
    >
      <Box
        sx={{
          width: "116px",
          height: "116px",
          border: "1px solid #EFF0F6",
          margin: "12px",
          borderRadius: "10px",
          backgroundColor: "#EFF0F6",
          cursor: "pointer",
        }}
        {...rest}
      >
        <img src={img} style={imgStyle} />
      </Box>
    </Box>
  );
};

const changeImage = (e) => {};

export default sideImage;

const imgStyle = {
  width: "100%",
  height: "100%",
};
