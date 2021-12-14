import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import SellerSearch from "./components/SellerSearch";

import authState from "../../common/store/authState";
import { useRecoilValue } from "recoil";
import PageHeader from "./components/PageHeader";
import HistoryTable from "./components/TableContent/OrderHistoryBody";

// ------------------------------------

export default function SellerStockLog() {
  const Pagename = "Order History";
  const auth = useRecoilValue(authState);

  const rows = [
    createData(
      1,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Frozen yoghurt",
      "john",
      24,
      4.0,
      "cancel",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      2,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Ice cream sandwich",
      "jojo",
      9,
      37,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      3,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Eclair",
      "joluno",
      16,
      24,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      4,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Cupcake",
      "joji",
      3,
      67,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      5,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Gingerbread",
      "jotaro",
      16,
      49,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      6,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Eclair",
      "joluno",
      16,
      24,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      7,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Cupcake",
      "joji",
      3,
      67,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      8,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Gingerbread",
      "jotaro",
      16,
      49,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      9,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Cupcake",
      "joji",
      3,
      67,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      10,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Gingerbread",
      "jotaro",
      16,
      49,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      11,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Eclair",
      "joluno",
      16,
      24,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      12,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Cupcake",
      "joji",
      3,
      67,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      13,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Gingerbread",
      "jotaro",
      16,
      49,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      14,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Cupcake",
      "joji",
      3,
      67,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      15,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Gingerbread",
      "jotaro",
      16,
      49,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      16,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Eclair",
      "joluno",
      16,
      24,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      17,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Cupcake",
      "joji",
      3,
      67,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      18,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Gingerbread",
      "jotaro",
      16,
      49,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
  ]


  function createData(
    orderid,
    avatar,
    productname,
    customername,
    amount,
    totalprice,
    status,
    stdate,
    endate
  ) {
    return {
      orderid,
      avatar,
      productname,
      customername,
      amount,
      totalprice,
      status,
      stdate,
      endate,
    };
  }

  const columns = [
    { id: "orderid", label: "orderid" },
    { id: "avatar", label: "avatar" },
    {
      id: "productname",
      label: "productname",
  
      align: "right",
    },
    {
      id: "customername",
      label: "customername",

      align: "right",
    },
    {
      id: "amount",
      label: "amount",

      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "totalprice",
      label: "totalprice",
    
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "status",
      label: "status",
   
      align: "right",
    },
    {
      id: "stdate",
      label: "stdate",

      align: "right",
    },
    {
      id: "endate",
      label: "endate",

      align: "right",
    },
  ];

  //-----------------------------------------------Mock-------------------

  // function createData(ab, bc, cd, de) {
  //   const ef = cd / de;
  //   return { ab, bc, cd, de, ef };
  // }
  // const rows = [
  //   createData("India", "IN", 1324171354, 3287263),
  //   createData("China", "CN", 1403500365, 9596961),
  //   createData("Italy", "IT", 60483973, 301340),
  //   createData("United States", "US", 327167434, 9833520),
  //   createData("Canada", "CA", 37602103, 9984670),
  //   createData("Australia", "AU", 25475400, 7692024),
  //   createData("Germany", "DE", 83019200, 357578),
  //   createData("Ireland", "IE", 4857000, 70273),
  //   createData("Mexico", "MX", 126577691, 1972550),
  //   createData("Japan", "JP", 126317000, 377973),
  //   createData("France", "FR", 67022000, 640679),
  //   createData("United Kingdom", "GB", 67545757, 242495),
  //   createData("Russia", "RU", 146793744, 17098246),
  //   createData("Nigeria", "NG", 200962417, 923768),
  //   createData("Brazil", "BR", 210147125, 8515767),
  // ];

  // const columns = [
  //   { id: "ab", label: "Name", minWidth: 170 },
  //   { id: "bc", label: "ISO\u00a0Code", minWidth: 100 },
  //   {
  //     id: "cd",
  //     label: "Population",
  //     minWidth: 170,
  //     align: "right",
  //     format: (value) => value.toLocaleString("en-US"),
  //   },
  //   {
  //     id: "de",
  //     label: "Size\u00a0(km\u00b2)",
  //     minWidth: 170,
  //     align: "right",
  //     format: (value) => value.toLocaleString("en-US"),
  //   },
  //   {
  //     id: "ef",
  //     label: "Density",
  //     minWidth: 170,
  //     align: "right",
  //     format: (value) => value.toFixed(2),
  //   },
  // ];

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

        {/* <LogTable rows={rows} headerName={headerName}/> */}
        <HistoryTable rows={rows} columns={columns} />
      </Box>
    </>
  );
}
