import Box from "@mui/material/Box";
import authState from "../../common/store/authState";
import { useRecoilValue } from "recoil";

import StockLogBody from "./components/TableContent/StockLogBody";
import PageHeader from "./components/PageHeader";

import React, { useState, useEffect } from "react";
import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function SellerStockLog() {
  const Pagename = "Stock Log";
  const auth = useRecoilValue(authState);


  const shopid = useParams();

  const fetchStock = async () => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/stockhistory`
      );
      // console.log(res.data);
      Productdata.push(res.data);
      // console.log(Productdata)
      await createProduct();
      console.log(rows);
    } catch (e) {
      console.log(e);
    }
  };

  const Productdata = [];

  useEffect(async () => {
    await fetchStock();
    // console.log(rows)
    // console.log(shopid.id)
  }, []);

  const createProduct = async () => {
    return await Productdata[0].map((product) => {
      rows.push(
        createData(product.id, product.title, product.quantity, product.price)
        // {
        //   productId: product.id,
        //   productname: product.title,
        //   amount: product.quantity,
        //   price: product.price,
        // }
      );
      // console.log(rows)
    });
  };  

  const columns = [
    { id: "productId", label: "productId" },
    { id: "productName", label: "productName" },
    {
      id: "Quantity",
      label: "Quantity",
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "TradeType",
      label: "Import/Export",
      align: "right",
    },
    {
      id: "Update_Date",
      label: "Update_Date",
      align: "right",
    },
  ];
 
  function createData(productId, productName, Quantity, TradeType, Update_Date) {
    return { productId, productName, Quantity, TradeType, Update_Date };
  }
  
  const rows = [
    createData("0081", "PopCornLv10", 10, "Import", "2021-11-21 11:15:16"),
    createData("0082", "PopCornLv11", 10, "Export", "2021-11-21 11:15:16"),
    createData("0083", "PopCornLv12", 10, "Export", "2021-11-21 11:15:16"),
    createData("0084", "PopCornLv13", 10, "Import", "2021-11-21 11:15:16"),
    createData("0085", "PopCornLv14", 10, "Import", "2021-11-21 11:15:16"),
    createData("00811", "PopCornLv15", 10, "Import", "2021-11-21 11:15:16"),
  ];

  return (
    <>
      <Box>
        <Box sx={{ mt: "4rem" }} />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <PageHeader Pagename={Pagename} />
        </Box>
        <Box sx={{ mt: "4rem" }} />

        <StockLogBody rows={rows} columns={columns}/> 
      </Box>
    </>
  );
}
