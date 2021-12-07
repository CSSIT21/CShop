import { Box } from "@mui/system";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const CarouselBannerIcon = ({ ...rest }) => {
  const classes = useStyles();
  return (
    <Box
      sx={{
        position: "relative",
      }}
      {...rest}
    >
      <Typography fontSize="18px">Banner Carousel</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E9EEF1",
          height: "90px",
          marginTop: "10px",
        }}
      >
        <PhotoSizeSelectActualOutlinedIcon style={{ color: "#ACACAC" }} />
        <Box className={classes.nextIcon} sx={{ right: "10px" }}>
          <ChevronRightIcon
            style={{ textAlign: "center", width: "15px", height: "15px" }}
          />
        </Box>
        <Box className={classes.nextIcon} sx={{ left: "10px" }}>
          <ChevronLeftIcon
            style={{ textAlign: "center", width: "15px", height: "15px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  nextIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20px",
    height: "20px",
    backgroundColor: "#FFFFFF",
    borderRadius: "50%",
    position: "absolute",
  },
});

export default CarouselBannerIcon;
