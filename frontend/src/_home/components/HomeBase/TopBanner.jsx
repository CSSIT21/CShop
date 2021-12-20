import { Box } from "@mui/system";
import { useState } from "react";
import Carousel from "~/common/components/Carousel";
import LazyImage from "~/common/components/LazyImage/LazyImage";
import { makeStyles } from '@mui/styles';
import CustomDot from "~/common/components/CarouselBase/CustomDot";

const Banner = () => {
  const classes = useStyles();
  const [banners, setBanners] = useState([]);
  const [page, setPage] = useState(0);

  return (
    <Box className={classes.bannerWrapper}>
      <Box className={classes.carouselStyle}>
        {banners.length > 0 &&
          <Carousel
            items={banners}
            pageState={page}
            setPageState={setPage}
            loop={true}
            itemsPerRow={1}
            hideArrow={false}
          >
            {(banner) => (
              <LazyImage
                src={banner.pictures.main.path}
                lazy="https://via.placeholder.com/1140x516.png"
                key={item.id}
              />
            )}
          </Carousel>}
      </Box>

      <CustomDot width={95} setPageState={setPage} currentPage={page} totalPage={3} />
    </Box >
  );
};

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

export default Banner;
