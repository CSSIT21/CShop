import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import BottomCardContent from "./ProductCardBase/BottomCardContent";
import TopCardContent from "./ProductCardBase/TopCardContent";
import Link from "@mui/material/Link";

const ProductCard = ({
  image = "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
  title = "Product name",
  price = 1000,
  status = "sold out",
  favourite = false,
  margin = 10,
  to,
  ...rest
}) => {
  const onFavourite = (idx) => {
    setItems((items) => {
      items[idx].favourite = !items[idx].favourite;
      return [...items];
    });
  };

  return (
    <Card
      sx={{
        height: "285px",
        maxWidth: "250px",
        borderRadius: "15px",
        margin: { margin },
        "&:hover": {
          transform: "scale(1.02)",
        },
        transition: "all ease 0.125s",
      }}
      {...rest}
    >
      <CardMedia
        component="img"
        sx={{
          margin: "10px 10px",
          maxWidth: "230px",
          height: "180px",
          borderRadius: "15px",
        }}
        image={image}
        alt={title}
      />
      <CardContent>
        <TopCardContent title={title} price={price} />
        <BottomCardContent
          status={status}
          favourite={favourite}
          onFavourite={onFavourite}
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
