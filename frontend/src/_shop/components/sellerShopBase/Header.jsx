import React from "react";
import HeaderLeft from "./HeaderBase/HeaderLeft";
import HeaderRight from "./HeaderBase/HeaderRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ConstructionIcon from "@mui/icons-material/Construction";
import { Link } from "react-router-dom";
const Header = ({ shopInfo = {} }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <HeaderLeft shopInfo={shopInfo} />
        <HeaderRight shopInfo={shopInfo} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link to={`/seller/1/dashboard`}>
          <Button
            sx={{ margin: "0 50px 0 0", padding: "10px 20px" }}
            variant="outlined"
            startIcon={<ConstructionIcon />}
          >
            Manage
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
