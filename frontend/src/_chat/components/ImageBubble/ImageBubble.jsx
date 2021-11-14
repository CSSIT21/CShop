import React from "react";
import { Box } from "@mui/system";
import { Card , CardActionArea, CardMedia } from "@mui/material"

import useStyles from "./ImageBubble.styles";

const ImageBubble = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.imageBubble}>
      <CardActionArea>
      <CardMedia component="img" image={props.src} alt="Image bubble" />
      </CardActionArea>
    </Card>
  );
};

export default ImageBubble;
