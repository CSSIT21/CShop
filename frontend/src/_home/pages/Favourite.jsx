import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeaderWithIcon from "../components/commonBase/HeaderWithIcon";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import CardAndPagination from "../components/commonBase/CardAndPagination";
import axios from "axios";
import config from "~/common/constants";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";

const FavouritePage = () => {
  const classes = useStyles();
  const { isLoggedIn, user } = useRecoilValue(authState);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(1);

  const onFavorite = () => {};

  const onPageChange = (e, value) => {
    setPage(value);
  };

  const getData = () => {
    if (isLoggedIn) {
      setSkip((page - 1) * 16);
      axios
        .get(
          `${config.SERVER_URL}/home/favorites/${user.id}?take=16&skip=${skip}`
        )
        .then(({ data }) => {
          if (data.success) {
            setCount(data.favorites.count);
            return setProducts(data.favorites.products);
          } else {
            return console.log(data);
          }
        })
        .catch((err) => {
          return console.log(err.message);
        });
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <Box className={classes.FavoriteWrapper}>
      <Box className={classes.content}>
        <HeaderWithIcon title="Wish list" ItemIcon={FavoriteIcon} />
        {products.length > 0 ? (
          <CardAndPagination
            products={products}
            onPageChange={onPageChange}
            count={count}
            page={page}
            onFavorite={onFavorite}
          />
        ) : (
          <Typography
            textAlign="center"
            fontSize={16}
            fontWeight={400}
            color="gray"
          >
            No products in your wish list
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  FavoriteWrapper: {
    width: "100%",
    minHeight: "100vh",

    display: "flex",
    justifyContent: "center",

    backgroundColor: "#FDF4DD",
  },
  content: {
    maxWidth: "1100px",
    padding: "50px 0",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavouritePage;
