import React from "react";
import Box from "@mui/material/Box";
import Added from "@mui/icons-material/CheckCircleOutlineRounded";
import { margin, padding } from "@mui/system";
import Typography from "@mui/material/Typography";

const Popup = (props) => {
  return (
    <Box
      className="container"
      sx={{
        width: 572,
        height: 300,
        borderRadius: "20px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "86px",
          height: "86px",
          left: "244px",
          top: "81px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Added
          sx={{
            color: "#00BF9D",
            padding: "8.33%",
            width: "71.67px",
            height: "71.67px",
            left: "244px",
          }}
        />
        <Typography
          sx={{
            width: "420px",
            height: "36px",
            left: "76px",
            top: "183px",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "24px",
            lineHeight: "36px",
          }}
        >
          The item already added in the cart
        </Typography>
        {props.content}
      </Box>
    </Box>
  );
};

export default Popup;
