import React from "react";
import Box from "@mui/material/Box";

const sideImage = ({ img }) => {
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
      >
        <image
          src={img}
          onClick={changeImage1()}
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            paddingLeft: "8px",
            display: "block",
          }}
        ></image>
      </Box>
    </Box>
  );
};

const changeImage1 = (event) => {};

export default sideImage;
