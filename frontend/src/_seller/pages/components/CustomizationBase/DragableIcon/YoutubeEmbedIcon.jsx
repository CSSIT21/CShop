import { Box } from "@mui/system";
import React from "react";
import { Typography } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";

const YoutubeEmbedIcon = ({ ...rest }) => {
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
        <YouTubeIcon style={{ color: "red", width: "50px", height: "50px" }} />
      </Box>
    </Box>
  );
};

export default YoutubeEmbedIcon;
