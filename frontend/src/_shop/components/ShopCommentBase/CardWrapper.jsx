import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { For } from "~/common/utils";
import Comment from "./Comment";
import Pagination from "@mui/material/Pagination";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import { Typography, Dialog, CircularProgress } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from "~/common/constants";

const CardWrapper = ({ type }) => {
  const [items, setitems] = useState([]);
  const { id, cateId } = useParams();
  const [onLoad, setonLoad] = useState(false);
  const [count, setcount] = useState(0);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setonLoad(true);
    if (type == "shop") {
      axios
        .get(`${config.SERVER_URL}/sellershop/${id}/shopcomments?page=${page}`)
        .then(({ data }) => {
          setitems(data.comments);
          setcount(data.count);
          setonLoad(false);
        });
    }
    if (type == "product") {
      axios
        .get(
          `${config.SERVER_URL}/sellershop/${id}/shopproductscomments?page=${page}`
        )
        .then(({ data }) => {
          setitems(data.comments);
          setcount(data.count);
          setonLoad(false);
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
                imageURL={
                  type == "shop"
                    ? item.customer_id_from_shop_comment.customer_picture
                        .picture_id_from_customer_picture.path
                    : item.customer_id_from_product_reviews.customer_picture
                        .picture_id_from_customer_picture.path
                }
                username={
                  type == "shop"
                    ? item.customer_id_from_shop_comment.customer_info.firstname
                    : item.customer_id_from_product_reviews.customer_info
                        .firstname
                }
                rating={item.rating}
                comment={item.comment}
                productDetail={item.product_id_from_product_reviews}
                review_time={item.review_time ? item.review_time : item.date}
                key={item.id}
              />
            )}
          </For>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Pagination
              sx={{ margin: "20px" }}
              count={Math.ceil(count / 10)}
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
    <>
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
      <Dialog open={onLoad} aria-describedby="alert-dialog-slide-description">
        <Box
          sx={{
            height: "250px",
            width: "500px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress size={70} sx={{ marginTop: "1rem" }} />
          <Typography
            fontWeight="600"
            fontSize="20px"
            color="#FD6637"
            sx={{ padding: "0 2rem", marginTop: "50px" }}
          >
            Loading
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};

export default CardWrapper;
