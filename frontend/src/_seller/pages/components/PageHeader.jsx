import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import Typography from "@mui/material/Typography";

const PageHeader = ({ Pagename }) => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Button sx={{ p: "10px", mr: "10px", flexShrink: 0 }}>
        {
          <AllInboxIcon
            sx={{
              fontSize: "30px",
            }}
          />
        }
        <Typography
          variant
          sx={{
            color: "black",
            fontWeight: "700",
            fontSize: "2em",
            ml: 0.5,
          }}
        >
          {Pagename}
        </Typography>
      </Button>
    </Box>
  );
};

export default PageHeader;
