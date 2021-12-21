import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import fakeProducts from "~/common/faker/fakeProducts";
import Carousel from "~/common/components/Carousel";
import ProductCard from "~/common/components/ProductCard";
import { makeStyles } from "@mui/styles";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import { Typography } from "@mui/material";
import CarouselButton from "~/common/components/CarouselButton";
import LinearProgress from "@mui/material/LinearProgress";

const progressBar = () => <LinearProgress />;

const FlashSale = ({ flashSale, flashSaleItems, onFavourite }) => {
  const [page, setPage] = useState(0);
  const classes = useStyles();
  const productsPerRow = 5;
  const totalPage = Math.ceil(flashSale.products.length / productsPerRow);
  const curDate = new Date().getTime();
  const endDate = new Date(flashSale.ended_date).getTime();
  const [timeLeft, settimeLeft] = useState(endDate - curDate);
  const hours = useMemo(() => Math.floor(timeLeft / 3600000), [curDate]);
  const mins = useMemo(
    () => Math.floor((timeLeft - hours * 3600000) / 60000),
    [curDate]
  );
  const secs = useMemo(
    () => Math.floor((timeLeft - mins * 60000 - hours * 3600000) / 1000),
    [curDate]
  );
  const [rotateSecs, setrotateSecs] = useState(false);
  const [s, setS] = useState(0);
  const [rotateMins, setrotateMins] = useState(false);
  const [rotateHours, setrotateHours] = useState(false);
  const unmountedStyle = {
    transition: "0.4s",
  };

  useEffect(() => {
    const timeLeftInterval = setInterval(() => {
      setrotateSecs(true);

      if (secs == 59) {
        setrotateMins(true);
      }
      if (mins == 59 && secs == 59) {
        setrotateHours(true);
      }
      setTimeout(() => {
        setS((s) => s + 1);
        settimeLeft((timeLeft) => timeLeft - 1000);
      }, 195);
      setTimeout(() => {
        setrotateSecs(false);
        setrotateMins(false);
        setrotateHours(false);
      }, 400);
    }, 1000);
    return () => clearInterval(timeLeftInterval);
  }, []);

  if (endDate - curDate > 0)
    return (
      <Box className={classes.bestsellerWrapper}>
        <Box className={classes.bestsellerContent}>
          <Box className={classes.bestsellerHeader}>
            <Box className={classes.text}>
              <FlashOnRoundedIcon
                style={{ fontSize: "24px", color: "#FD6637" }}
              />
              <Typography
                component="span"
                color="#FD6637"
                fontSize="24px"
                fontWeight={600}
                sx={{ marginRight: "20px" }}
              >
                Flash Sale
              </Typography>
              <Box className={classes.timer} sx={rotateHours && unmountedStyle}>
                <Typography color="#FFFFFF" fontSize="11px" fontWeight={400}>
                  {("0" + hours).slice(-2)}
                </Typography>
              </Box>
              <Box className={classes.timer} sx={rotateMins && unmountedStyle}>
                <Typography color="#FFFFFF" fontSize="11px" fontWeight={400}>
                  {("0" + mins).slice(-2)}
                </Typography>
              </Box>
              <Box
                className={classes.timer}
                sx={{
                  transform: `rotatex(${(s * 180) % 360}deg)`,
                  ...unmountedStyle,
                }}
              >
                <Typography
                  color="#FFFFFF"
                  fontSize="11px"
                  fontWeight={400}
                  sx={{
                    "&": s % 2 === 1 && {
                      transform: "rotateX(180deg)",
                    },
                  }}
                >
                  {("0" + secs).slice(-2)}
                </Typography>
              </Box>
            </Box>

            <CarouselButton
              pageHandle={setPage}
              currentPage={page}
              totalPage={totalPage}
            />
          </Box>

          <Box className={classes.bestsellerCarousel}>
            <Carousel
              items={flashSaleItems}
              pageState={page}
              setPageState={setPage}
              itemsPerRow={productsPerRow}
              gap={20}
            >
              {(product, idx) => (
                <ProductCard
                  product={product}
                  onFavourite={onFavourite}
                  to="/product/1"
                  key={product.id}
                />
              )}
            </Carousel>
          </Box>
        </Box>
      </Box>
    );
  return <></>;
};
const useStyles = makeStyles({
  bestsellerWrapper: {
    width: "100%",
    backgroundColor: "#EFEFF1",
  },

  bestsellerContent: {
    width: "86%",
    margin: "0 auto",
    padding: "40px 80px",

    borderRadius: "20px",
    marginBottom: "40px",
  },

  bestsellerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  text: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timer: {
    backgroundColor: "#323232",
    color: "white",
    width: "32px",
    height: "25px",
    margin: "0 3px",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default FlashSale;
