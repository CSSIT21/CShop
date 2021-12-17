import React, { useState, useEffect } from "react";
import TabsController from "../components/ShopCommentBase/TabsController";
import Box from "@mui/material/Box";

const ShopComment = () => {
  return (
    <Box sx={{ backgroundColor: "#EFEFF1", padding: "50px 100px 0 100px" }}>
      <Box
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px 20px 0px 0px" }}
      >
        <TabsController />
      </Box>
    </Box>
  );
};

export default ShopComment;
