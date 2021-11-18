import React from "react";
import { Box } from "@mui/material";

const ReviewPhoto = ({
  id = 0,
  img = "https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "80px",
        height: "80px",
        margin: "12px 0 0 0",

        overflow: "hidden",
        position: "relative",
        borderRadius: "15px",
      }}
      variant="outlined"
    >
      <img
        src={img}
        sx={{
          width: "100%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        alt={id}
      />
    </Box>
  );
};

export default ReviewPhoto;
