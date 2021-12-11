import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { For } from "~/common/utils";
import OrderCard from "./OrderCard";
import Pagination from "@mui/material/Pagination";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import { Typography } from "@mui/material";

const CardWrapper = ({ items = [], status }) => {
  const [page, setPage] = useState(1);
  const filteredItems = items.filter((item) => item.status === status);
  const [order, setOrder] = useState(filteredItems.slice(0, 10));
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    setOrder(filteredItems.slice(10 * (page - 1), 10 * page));
    window.scrollTo(0, 0);
  }, [page]);

  if (filteredItems.length !== 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <For each={order}>
            {(item, idx) => <OrderCard data={item} key={idx} />}
          </For>
          <Pagination
            count={Math.ceil(filteredItems.length / 10)}
            shape="rounded"
            size="large"
            page={page}
            // color="primary"

            onChange={handleChange}
          />
        </Box>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        weight: "100%",
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#A0A3BD",
        marginTop: "60px",
      }}
    >
      <DoDisturbAltRoundedIcon sx={{ fontSize: 100, marginBottom: "30px" }} />
      <Typography fontWeight={500} fontSize="40px">
        Order history not found
      </Typography>
    </Box>
  );
};

export default CardWrapper;
