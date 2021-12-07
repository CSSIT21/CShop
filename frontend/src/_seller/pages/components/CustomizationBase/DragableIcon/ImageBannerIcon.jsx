import { Box } from "@mui/system";
import React from "react";
import { Typography } from "@mui/material";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";

const ImageBannerIcon = ({ ...rest }) => {
  return (
    <Box {...rest}>
      <Typography fontSize="18px">Banner</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E9EEF1",
          height: "90px",
          marginTop: "10px",
        }}
      >
        <PhotoSizeSelectActualOutlinedIcon style={{ color: "#ACACAC" }} />
      </Box>
    </Box>
  );
};

export default ImageBannerIcon;
