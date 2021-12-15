import { Box } from "@mui/system";
import { useState } from "react";
import Carousel from "~/common/components/Carousel";
import LazyImage from "~/common/components/LazyImage/LazyImage";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  bannerWrapper: {
    width: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#EFEFF1",
    marginBottom: "50px",
  },

  carouselStyle: {
    width: "100%",
    marginBottom: 25,
  },
});

const CarouselBanner = ({ bannerItems = [] }) => {
  const classes = useStyles();

  const [items, setItems] = useState(bannerItems);
  const [page, setPage] = useState(0);
  return (
    <Box className={classes.bannerWrapper}>
      <Box className={classes.carouselStyle}>
        <Carousel
          items={items}
          pageState={page}
          setPageState={setPage}
          loop={true}
          itemsPerRow={1}
          hideArrow={false}
        >
          {(item) => (
            <LazyImage
              src={item.path}
              lazy="https://via.placeholder.com/1140x516.png"
              key={item.id}
            />
          )}
        </Carousel>
      </Box>
    </Box>
  );
};

export default CarouselBanner;
