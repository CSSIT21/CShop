import { useState } from "react";
import Carousel from "../../common/components/Carousel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProductCard from "../../common/components/ProductCard";

const Banner = () => {
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
    <>
      <Button variant="contained" onClick={() => setPage(page - 1)}>
        &larr;
      </Button>
      <Button variant="contained" onClick={() => setPage(page + 1)}>
        &rarr;
      </Button>
      <Carousel
        items={items}
        pageState={page}
        setPageState={setPage}
        loop={true}
        itemsPerRow={2}
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
    </>
  );
};

export default Banner;
