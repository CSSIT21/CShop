import { Box } from "@mui/system";
import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import CategoryPic1 from "~/common/assets/images/category-1.png";
import { makeStyles } from "@mui/styles";

const ImageBanner = ({
  section = {
    id: "0",
    page: {
      type: 1,
      id: "1",
      content: { img: CategoryPic1 },
    },
  },
  order = 0,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Box
      sx={{
        padding: "30px",
        backgroundColor: "#EFEFF1",
        margin: "20px 0",
      }}
      {...rest}
    >
      <Typography
        component="span"
        color="#000000"
        fontSize="24px"
        fontWeight={600}
      >
        Banner#{order}
      </Typography>
      <img
        src={section.page.content.img}
        alt={section.page.type}
        width="100%"
        className={classes.img}
      />
      <TextField type="file" sx={{ maxWidth: "35%", color: "#FD6637" }} />
    </Box>
  );
};
const useStyles = makeStyles({
  img: {
    marginBottom: "50px",
  },
});
export default ImageBanner;
