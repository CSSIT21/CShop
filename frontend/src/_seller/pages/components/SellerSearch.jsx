import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import Typography from "@mui/material/Typography";
const SellerSearch = ({ Pagename }) => {
  return (
    <Box sx={{ display: "flex", width: "80%" }}>
      <Button sx={{ p: "10px", mr: "10px", flexShrink:0 }}>
        {<AllInboxIcon />}
        <Typography
          variant
          sx={{
            color: "black",
            fontWeight: "700",
            fontSize: "1.1em",
            ml: 0.5,
          }}
        >
          {Pagename}
        </Typography>
      </Button>

      <Paper
        component="form"
        sx={{
          p: "2.5px 8px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#EFEFF1",
          boxShadow: 0,
        }}
      >
        <SearchIcon sx={{ color: "#b8b8b8" }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder=" what are you looking for?"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <Button
          type="submit"
          sx={{ pl: "2rem", pr: "2rem" }}
          aria-label="search"
          variant="contained"
        >
          Search
        </Button>
      </Paper>
    </Box>
  );
};

export default SellerSearch;
