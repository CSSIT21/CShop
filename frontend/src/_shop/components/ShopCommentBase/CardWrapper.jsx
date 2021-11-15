import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { For } from "~/common/utils";
import Comment from "./Comment";
import Pagination from "@mui/material/Pagination";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import { Typography } from "@mui/material";

const CardWrapper = ({ items = [], type }) => {
  const [page, setPage] = useState(1);
  const filteredItems = items.filter((item) => item.type === type);
  const [comments, setComments] = useState(items.slice(0, 10));
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    setComments(items.slice(10 * (page - 1), 10 * page));
    window.scrollTo(0, 0);
  }, [page]);

  if (filteredItems.length !== 0) {
    return (
      <Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <For each={comments}>
            {(item, idx) => (
              <Comment
                imageURL={item.imageURL}
                username={item.username}
                rating={item.rating}
                comment={item.comment}
                key={idx}
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
        No comment found
      </Typography>
    </Box>
  );
};

export default CardWrapper;
