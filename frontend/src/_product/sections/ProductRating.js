import React, { Component } from "react";
import RatingStars from "../components/RatingStars";
import ShowMoreButton from "../../common/components/CButton";
import Comments from "../components/Comments";
import { makeStyles } from "@mui/styles";
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { ExpandLessRounded, ExpandMoreRounded } from "@mui/icons-material";

const ProductRating = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Box>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Product Rating" />
          <RatingStars></RatingStars>
          {/* <Typography>Product Rating</Typography> */}
          {open ? <ExpandLessRounded /> : <ExpandMoreRounded />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Comments></Comments>
          </List>
        </Collapse>
        <Divider />
        {/* <Box className={classes.box}>
          <Box>
            <Typography>Product Rating</Typography>
            <RatingStars></RatingStars>
          </Box>
        </Box> */}
      </Box>
      <ShowMoreButton title="Show more comments"></ShowMoreButton>
    </Box>
  );
};

const useStyles = makeStyles({
  box: {
    display: "flex",
  },
});

export default ProductRating;
