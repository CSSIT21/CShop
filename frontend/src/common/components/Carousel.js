import { For } from "../utils/index";
import { useState } from "react";
import CarouselBase from "./CarouselBase";
import CustomDot from "./CarouselBase/CustomDot";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";

const style = {
  width: "80vw",
  margin: "0px auto",
};

const Carousel = ({
  items = [],
  itemsPerRow = 1,
  rows = 1,
  gap = 10,
  loop = false,
  pageState = 0,
  setPageState = void 0,
  children,
  ...rest
}) => {
  const itemsNumber = items.length;
  const totalPage = Math.ceil(itemsNumber / itemsPerRow);

  return (
    <Box sx={style}>
      <CarouselBase
        cols={itemsPerRow}
        rows={rows}
        gap={gap}
        loop={loop}
        pageState={pageState}
        setPageState={setPageState}
        hideArrow
        {...rest}
      >
        {items.map((item, idx) => (
          <CarouselBase.Item key={idx}>{children(item, idx)}</CarouselBase.Item>
        ))}
      </CarouselBase>
      <CustomDot
        width="10%"
        currentPage={pageState}
        totalPage={totalPage}
        setPageState={setPageState}
      />
    </Box>
  );
};

export default Carousel;
