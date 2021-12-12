import React, { useLayoutEffect } from "react";
import TopProfile from "../components/TopProfile";
import { Typography, Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import ShopImg from "../assets/shop.png";
import { For } from "~/common/utils";
import Pagination from "@mui/material/Pagination";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";

const shop = [
  {
    name: "muumel shop",
    img: ShopImg,
  },
  {
    name: "Tiffany&Co.",
    img: ShopImg,
  },
  {
    name: "SAMSONG",
    img: ShopImg,
  },
  {
    name: "Tiffany&Co.",
    img: ShopImg,
  },
  {
    name: "Tiffany&Co.",
    img: ShopImg,
  },
  {
    name: "Tiffany&Co.",
    img: ShopImg,
  },
];
const FollowedShop = () => {
  const classes = useStyles();
  useLayoutEffect(() => {
    document.body.classList.add("gray");
    return () => document.body.classList.remove("gray");
  }, []);
  return (
    <>
      <TopProfile />
      <Box className={classes.container}>
        <Box className={classes.body}>
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "600",
              margin: "60px auto",
            }}
          >
            Following Shop
          </Typography>
          <Box className={classes.searchBox}>
            <SearchIcon className={classes.searchIcon} />
            <input
              className={classes.searchInput}
              placeholder="Search for shop"
            />
          </Box>
          {shop.length === 0 ? (
            <Box className={classes.noShopFollow}>
              <DoDisturbAltRoundedIcon
                sx={{ fontSize: 100, marginBottom: "30px" }}
              />

              <Typography fontSize="40px">No following shop</Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container columns={10}>
                <For each={shop}>
                  {(item, idx) => (
                    <Grid item xs={2} key={idx} sx={{ marginBottom: "80px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          wordBreak: "break-word",
                        }}
                      >
                        <img src={item.img} alt="Shop Img" width="125px" />
                        <Typography
                          sx={{
                            textAlign: "center",
                            marginTop: "15px",
                            padding: "0 20px",
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </For>
              </Grid>
              <Pagination
                count={10}
                shape="rounded"
                size="large"
                page={1}
                sx={{
                  marginTop: "60px",
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f4f5f6",
  },
  body: {
    display: "flex",
    width: "70%",
    flexDirection: "column",
  },
  searchBox: {
    width: "100%",
    height: 46,
    position: "relative",
    padding: "0px 6px 0px 24px",
    marginBottom: "100px",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    transition: "all ease 0.125s",
    "&:focus-within": {
      boxShadow: "1px 2px 4px rgb(0,0,0,0.2)",
    },
  },
  searchInput: {
    width: "100%",
    padding: 5,
    color: "#A0A3BD",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "15px",
    "&:focus": {
      outline: "none",
      color: "black",
    },
  },
  searchIcon: {
    color: "#A0A3BD",
    cursor: "pointer",
    "&:hover": {
      color: "#6e6e6e",
    },
  },
  shop: {
    display: "flex",
    justifyContent: "center",
  },
  noShopFollow: {
    color: "#A0A3BD",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default FollowedShop;
