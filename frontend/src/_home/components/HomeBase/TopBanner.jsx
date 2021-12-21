import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import Carousel from "~/common/components/Carousel";
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import CustomDot from "~/common/components/CarouselBase/CustomDot";
import LazyImage from "~/common/components/LazyImage/LazyImage";
import axios from "axios";
import config from "~/common/constants";
import { Link } from "react-router-dom";

const Banner = () => {
  const classes = useStyles();
  const [banners, setBanners] = useState([]);
  const [page, setPage] = useState(0);
  const productsPerRow = 1;
  const totalPage = Math.ceil(banners.length / productsPerRow);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    axios
      .get(`${config.SERVER_URL}/home/banner/homepage`)
      .then(({ data }) => {
        if (data.success) {
          return setBanners(data.banners);
        }
        else {
          return console.log(data);
        }
      })
      .catch((err) => {
        return console.log(err.message);
      })
  };

  return (
    <Box className={classes.bannerWrapper}>
      {banners.length > 0
        ? (<>
          <Box className={classes.carouselStyle}>
            <Carousel
              items={banners}
              pageState={page}
              setPageState={setPage}
              loop={true}
              itemsPerRow={1}
              hideArrow={false}
            >
              {(banner) => (
                <Link to={`/search?q=${banner.keywords[0]}`}>
                  <LazyImage
                    src={banner.pictures.main.path}
                    lazy="https://via.placeholder.com/1140x516.png"
                    key={banner.id}
                  />
                </Link>
              )}
            </Carousel>

          </Box>
          <CustomDot width={95} setPageState={setPage} currentPage={page} totalPage={totalPage} />
        </>)
        : <Typography
          textAlign="center"
          fontSize={16}
          fontWeight={400}
          color="gray">
          No banners to show
        </Typography>}
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
