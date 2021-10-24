import { Box } from "@mui/system";
import React, { useState } from "react";
import CustomDot from "../../common/components/CarouselBase/CustomDot";
import Carousel from "../../common/components/Carousel";
import ProductCard from "../../common/components/ProductCard";
import CarouselButton from "../../common/components/CarouselButton";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const ProductSuggestion = ({}) => {
  const classes = useStyles();

  const itemsAxios = [
    {
      id: 0,
      title: "item1",
      favourite: false,
      description: "werewrwerwe",
    },
    {
      id: 1,
      title: "item2",
      favourite: true,
      description: "pytuiui",
    },
    {
      id: 2,
      title: "item3",
      favourite: false,
      description: "pytuiui",
    },
    {
      id: 3,
      title: "item4",
      favourite: true,
      description: "pytuiui",
    },
    {
      id: 4,
      title: "item5",
      favourite: false,
      description: "pytuiui",
    },
    {
      id: 5,
      title: "item6",
      favourite: false,
      description: "pytuiui",
    },
    {
      id: 6,
      title: "item7",
      favourite: false,
      description: "pytuiui",
    },
    {
      id: 7,
      title: "item8",
      favourite: false,
      description: "pytuiui",
    },
    {
      id: 8,
      title: "item9",
      favourite: false,
      description: "pytuiui",
    },
    {
      id: 9,
      title: "item10",
      favourite: false,
      description: "pytuiui",
    },
    {
      id: 10,
      title: "item11",
      favourite: false,
      description: "pytuiui",
    },
  ];

  const [items, setItems] = useState(itemsAxios);
  const [page, setPage] = useState(0);

  const onFavouriteHandler = (idx) => {
    setItems((items) => {
      items[idx].favourite = !items[idx].favourite;
      return [...items];
    });
  };

  return (
    <Box sx={{ margin: "50px 0px" }}>
      <Box className={classes.frame}>
        <Box className={classes.container}>
          <Typography sx={{ fontSize: "30px", fontWeight: 600 }}>
            Suggestions
          </Typography>
          <CarouselButton
            pageHandle={setPage}
            currentPage={page}
            totalPage={Math.ceil(items.length / 4)}
          />
        </Box>
        <Carousel
          items={items}
          pageState={page}
          setPageState={setPage}
          loop={true}
          itemsPerRow={4}
        >
          {(item, idx) => (
            <ProductCard
              title={item.title}
              favourite={item.favourite}
              onFavourite={() => {
                onFavouriteHandler(idx);
              }}
              to={`/product/${item.id}`}
            />
          )}
        </Carousel>
          <CustomDot currentPage={page} totalPage={Math.ceil(items.length / 4)} setPageState={setPage} width="75px" />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  frame: {
    width: "100%",
    height: "483px",
    borderRadius: "20px",
    background: "rgba(239, 239, 241, 0.7)",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ProductSuggestion;
