import React, { useState } from "react";
import { For } from "~/common/utils";
import OrderCard from "./OrderCard";
import Pagination from "@mui/material/Pagination";

const CardWrapper = ({ items = [], status }) => {
  const filteredItems = items.filter((item) => item.status === status);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      <For each={filteredItems}>
        {(item, idx) => <OrderCard data={item} key={idx} />}
      </For>
      <Pagination
        count={items.length / 10}
        shape="rounded"
        page={page}
        onChange={handleChange}
      />
    </>
  );
};

export default CardWrapper;
