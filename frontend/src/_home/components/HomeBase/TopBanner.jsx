import { Box } from "@mui/system";
import { useState } from "react";
import Carousel from "~/common/components/Carousel";
import LazyImage from "~/common/components/LazyImage/LazyImage";
import { makeStyles } from '@mui/styles';
import CustomDot from "~/common/components/CarouselBase/CustomDot";
import BannerImage from "../../assets/images/TopBanner.png"

const useStyles = makeStyles({
  bannerWrapper: {
    width: '100%',
    padding: '40px 0',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#F4F5F6',
  },

  carouselStyle: {
    width: "75%",
    marginBottom: 25,
  }
});

const Banner = () => {
  const bannerItems = [
    {
      id: 0,
      url: BannerImage,
    },
    {
      id: 1,
      url: BannerImage,

    },
    {
      id: 2,
      url: BannerImage,
    },
  ];

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
              src={item.url}
              lazy="https://via.placeholder.com/1140x516.png"
              key={item.id}
            />
          )}
        </Carousel>
      </Box>

      <CustomDot width={95} setPageState={setPage} currentPage={page} totalPage={3} />
    </Box >
  );
};

export default Banner;
