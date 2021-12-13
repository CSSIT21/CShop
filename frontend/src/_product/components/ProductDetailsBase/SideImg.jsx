import React from "react";
import Box from "@mui/material/Box";

const sideImage = ({ img, ...rest }) => {
  return (
    <>
      <Box
        sx={{
          width: "135.4px",
          height: "135.4px",

          margin: "0px 13px 13px 0px",
          borderRadius: "10px",

          backgroundColor: "#EFEFF1B2",
          cursor: "pointer",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          position: "relative",
        }}
        {...rest}
      >
        <img src={img} style={imgStyle} alt="sideImage" />
      </Box>
    </>
  );
};

const imgStyle = {
  width: "100%",

  position: "absolute",
  top: "50%",
  left: "50%",

  transform: "translate(-50%, -50%)",
};

export default sideImage;
