import React from "react";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Filter from "../components/sellerShopBase/Filter";

const menus = [
  {
    cateId: 3,
    title: "Games",
  },
  {
    cateId: 4,
    title: "PC",
  },
  {
    cateId: 5,
    title: "Fan",
  },
  {
    cateId: 6,
    title: "Umbar",
  },
];

const ShopCategory = () => {
  const { id, cateId } = useParams();
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
        Own by: {id} <br />
        category: {cateId}
        <Filter categories={menus} />
      </Box>
    </Box>
  );
};

export default ShopCategory;
