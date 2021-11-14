import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import SellerSearch from "./components/SellerSearch";
import LogTable from "./components/LogTable";
import authState from "../../common/store/authState";
import { useRecoilValue } from "recoil";

function createData(
  id,
  avatar,
  products,
  customername,
  amount,
  totalprice,
  status,
  stdate,
  endate
) {
  return {
    id,
    avatar,
    products,
    customername,
    amount,
    totalprice,
    status,
    stdate,
    endate,
  };
}

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
  ].sort((a, b) => (a.id < b.id ? -1 : 1));
  // ------------------------------------

  const headerName = [
    "avatar",
    "products",
    "customername",
    "amount",
    "totalprice",
    "status",
    "stdate",
    "endate",
    "actions",
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
          <SellerSearch Pagename={Pagename} />
        </Box>
        <Box sx={{ mt: "4rem" }} />

        <LogTable rows={rows} headerName={headerName}/>
      </Box>
    </>
  );
}
