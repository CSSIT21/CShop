import { Box } from "@mui/system";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Typography, Button } from "@mui/material";
import CategoryPic1 from "~/common/assets/images/category-1.png";
import { makeStyles } from "@mui/styles";

const ImageBanner = ({
  id = "",
  type = 1,
  content = { img: CategoryPic1 },
  information,
  setInformation = () => {},
  order = 0,
  ...rest
}) => {
  const [image, setImage] = useState("");
  const classes = useStyles();
  useLayoutEffect(() => {
    if (id in information) {
      setImage(information[id].img);
    } else {
      console.log("image not found");
      setImage(content.img);
    }
  }, []);
  // useLayoutEffect(() => {
  //   setInformation(info => ({...info,
  //     [id]: content
  //   }));
  // },[order]);

  const uploadFile = (e, id) => {
    console.log(id);
    if (e.target.files.length) {
      const path = URL.createObjectURL(e.target.files[0]);
      setImage(path);
      setInformation((info) => ({
        ...info,
        [id]: { ...(info[id] || content), img: path },
      }));
    }
  };
  return (
    <Box
      sx={{
        padding: "70px",
        backgroundColor: "#EFEFF1",
        borderRadius: "20px",
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
      <img src={image} alt={type} width="100%" className={classes.img} />
      <label htmlFor={`outlined-button-file-${id}`}>
        <Button
          component="span"
          variant="outlined"
          sx={{ height: "42px", borderWidth: "2px" }}
        >
          <input
            accept="image/*"
            type="file"
            style={{ display: "none" }}
            id={`outlined-button-file-${id}`}
            onChange={(e) => {
              uploadFile(e, id);
            }}
          />
          Upload
        </Button>
      </label>
    </Box>
  );
};
const useStyles = makeStyles({
  img: {
    marginBottom: "50px",
  },
});
export default ImageBanner;
