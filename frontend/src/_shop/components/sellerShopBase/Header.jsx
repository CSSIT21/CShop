import React from "react";
import HeaderLeft from "./HeaderBase/HeaderLeft";
import HeaderRight from "./HeaderBase/HeaderRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ConstructionIcon from "@mui/icons-material/Construction";


const Header = () => {
  return (
    <Box sx={{ width: "100%"}}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <HeaderLeft />
        <HeaderRight />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          sx={{ margin: "0 50px 0 0", padding: "10px 20px" }}
          variant="outlined"
          startIcon={<ConstructionIcon />}
        >
          Manage
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
