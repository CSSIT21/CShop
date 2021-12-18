import React, { useState } from "react";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Filter from "../components/sellerShopBase/Filter";
import config from "~/common/constants";
import axios from "axios";

const ShopCategory = () => {
  const { id, cateId } = useParams();
  const [menus, setmenus] = useState([]);
  axios
    .get(`${config.SERVER_URL}/sellershop/${id}`)
    .then(({ data }) => {
      setmenus(data.shopinfo.categories);
    })
    .catch((e) => {
      console.log(e.message);
    });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box sx={{ width: "86%" }}>
        <Filter categories={menus} category_Id={cateId} />
      </Box>
    </Box>
  );
};

export default ShopCategory;
