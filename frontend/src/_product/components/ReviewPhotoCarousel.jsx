import React, { useState } from "react";
import ReviewPhoto from "./ReviewPhoto";
import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import Carousel from "../../common/components/Carousel";
import { Fab } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const ReviewPhotoCarousel = ({ reviewPhoto, loop = false }) => {
  const [photoList, setphotoList] = useState(reviewPhoto);
  const [page, setPage] = useState(0);
  const photoPerRow = 6;
  const totalPage = Math.ceil(photoList.length / photoPerRow);

  const onPrev = () => {
    if (page === 0) {
      setPage(totalPage - 1);
    } else {
      setPage(page - 1);
    }
  };

  const onNext = () => {
    if (totalPage - 1 === page) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };
  return (
    <Box sx={carouselContainer}>
      <Box sx={carouselWrapper}>
        <Carousel
          items={photoList}
          pageState={page}
          setPageState={setPage}
          itemsPerRow={6}
        >
          {(item, idx) => <ReviewPhoto id={idx} img={item.reviewPhoto} />}
        </Carousel>
      </Box>
      <Box sx={buttonContainer}>
        <Button
          sx={buttonWrapperLeft}
          disabled={!loop && page === 0}
          onClick={onPrev}
        >
          <ChevronLeft sx={buttonStyle} />
        </Button>
        <Button
          sx={buttonWrapperRight}
          onClick={onNext}
          disabled={!loop && page === totalPage - 1}
        >
          <ChevronRight sx={buttonStyle} />
        </Button>
      </Box>
    </Box>
  );
};

const buttonStyle = {
  width: "20px",
  height: "20px",
};

const carouselContainer = {
  width: "100%",
};
const carouselWrapper = { width: "48%" };

const buttonContainer = {
  width: "48%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const buttonWrapper = {
  width: "81px",
  height: "20px",
  padding: "2px 0",
  borderRadius: "0",

  display: "flex",
  alignItems: "center",
  justifyContent: "end",
};
const buttonWrapperLeft = {
  width: "81px",
  height: "20px",
  borderRadius: "0",

  display: "flex",
  alignItems: "center",
  justifyContent: "start",
};
const buttonWrapperRight = {
  width: "81px",
  height: "20px",
  borderRadius: "0",

  display: "flex",
  alignItems: "center",
  justifyContent: "end",
};

export default ReviewPhotoCarousel;
