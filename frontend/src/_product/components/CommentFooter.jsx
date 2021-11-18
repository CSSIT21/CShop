import React from "react";
import { Box, Typography } from "@mui/material";

const CommentFooter = ({ date = "23/12/2021", time = "10:00" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",

        margin: "0",

        width: "100%",
      }}
    >
      <Typography
        sx={{
          marginTop: 1.5,
          fontSize: "16px",
          fontWeight: "400",
          color: "#A0A3BD",
        }}
      >
        Commented on {date} At {time}
      </Typography>
    </Box>
  );
};

export default CommentFooter;
