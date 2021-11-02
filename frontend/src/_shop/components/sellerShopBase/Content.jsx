import { Box } from "@mui/system";
import React, {useState} from "react";
import { noot } from "~/common/utils";
import { makeStyles } from "@mui/styles";
import CarouselBanner from "./ContentBase/CarouselBanner";
import CarouselProduct from "./ContentBase/CarouselProduct";

const Content = ({ section = {}}) => {
  const classes = useStyles();
  const [items, setitems] = useState(section.page.content);
  const onFavourite = (index) => {
    setitems((items) => {
      const target = items[index];
      target.favourite = !target.favourite;
  
      return [...items];
    });
  };  
  const sections = [
    <img src={items.img} alt={section.page.type} width="100%" className={classes.img}  />,
    <CarouselBanner bannerItems={items} />,
    <CarouselProduct filterName={section.page.filter} items={items} onFavourite={onFavourite} />,
  ];
  return <Box sx={{width:"100%"}}>{sections[section.page.type- 1] || noot}</Box>;
};
const useStyles = makeStyles({
    img:{
        marginBottom: "50px",
    },

})
export default Content;
