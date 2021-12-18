import React from "react";
import HeaderLeft from "./HeaderBase/HeaderLeft";
import HeaderRight from "./HeaderBase/HeaderRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const Header = ({ shopInfo = {}, follow = false }) => {
  const auth = useRecoilValue(authState);
  const { id } = useParams();
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <HeaderLeft shopInfo={shopInfo} follow={follow} />
        <HeaderRight shopInfo={shopInfo} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {auth.user.role == "SELLER" && auth.user.shop_info[0].id == id && (
          <Link to={`/seller/1/dashboard`}>
            <Button
              sx={{ margin: "0 50px 0 0", padding: "10px 20px" }}
              variant="outlined"
              startIcon={<ConstructionIcon />}
            >
              Manage
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Header;
