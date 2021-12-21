import { Box } from "@mui/system";
import React, { useState } from "react";
import { noot } from "~/common/utils";
import { makeStyles } from "@mui/styles";
import CarouselBanner from "./ContentBase/CarouselBanner";
import CarouselProduct from "./ContentBase/CarouselProduct";

const Content = ({ section = {} }) => {
  const classes = useStyles();

  const sections = [
    <img
      src={section.path}
      alt={section.title}
      width="100%"
      className={classes.img}
    />,
    <CarouselBanner bannerItems={section.banners} />,
    <CarouselProduct
      filterName={section.filter_name ? section.filter_name : section.category}
      items={section.products}
    />,
    <iframe
      style={{ margin: "20px 0px" }}
      width="1120"
      height="630"
      src={`https://www.youtube.com/embed/${section.path}`}
    ></iframe>,
  ];
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {sections[section.type - 1] || noot}
    </Box>
  );
};
const useStyles = makeStyles({
  img: {
    marginBottom: "50px",
  },
});
export default Content;
