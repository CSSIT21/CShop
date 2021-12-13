import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { For } from "~/common/utils";
import Comment from "./Comment";
import Pagination from "@mui/material/Pagination";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import { Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";

const CardWrapper = ({ type }) => {
  const [items, setitems] = useState([]);
  const { id, cateId } = useParams();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (type == "shop") {
      axios
        .get(`http://localhost:8080/sellershop/${id}/shopcomments?page=${page}`)
        .then(({ data }) => {
          setitems(data.shopcomments);
        });
    }
    if (type == "product") {
      axios
        .get(
          `http://localhost:8080/sellershop/${id}/shopproductscomments?page=${page}`
        )
        .then(({ data }) => {
          setitems(data.shopproductscomments);
        });
    }
    window.scrollTo(0, 0);
  }, [page]);

  if (items.length !== 0) {
    return (
      <Box>
        <Box
          sx={{
            width: "100%",
            minHeight: "50vh",
          }}
        >
          <For each={items}>
            {(item, idx) => (
              <Comment
                imageURL={item.customer_picture}
                username={
                  item.customer_id_from_shop_comment.customer_info.firstname
                }
                rating={item.rating}
                comment={item.comment}
                productDetail={item.productDetail}
                key={item.id}
              />
            )}
          </For>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Pagination
              sx={{ margin: "20px" }}
              count={Math.ceil(items.length / 10)}
              shape="rounded"
              size="large"
              page={page}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        weight: "100%",
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#A0A3BD",
      }}
    >
      <DoDisturbAltRoundedIcon sx={{ fontSize: 100, marginBottom: "30px" }} />
      <Typography fontWeight={500} fontSize="40px">
        No comment found
      </Typography>
    </Box>
  );
};

export default CardWrapper;
