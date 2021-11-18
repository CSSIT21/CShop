import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";

const CarouselBanner = ({
  section = {
    id: "0",
    page: {
      type: 2,
      id: 1,
      content: [],
    },
  },
  order = 0,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <>
      <Box
        sx={{
          padding: "70px",
          backgroundColor: "#EFEFF1",
          borderRadius: "20px",
        }}
        {...rest}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            component="span"
            color="#000000"
            fontSize="24px"
            fontWeight={600}
          >
            Banner#{order}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{ backgroundColor: "#FFFFFF" }}
              className={classes.iconStyle}
            >
              <ChevronLeftIcon style={{ color: "#000000" }} />
            </Box>
            <Box
              sx={{ backgroundColor: "#FD6637" }}
              className={classes.iconStyle}
            >
              <ChevronRightIcon style={{ color: "#FFFFFF" }} />
            </Box>
          </Box>
        </Box>

        <Grid container spacing={2} sx={{width: "100%"}}>
          {Array(5).map((id, idx) => {
            <Grid item xs={2.4}>
              <Box sx={{ backgroundColor: "#000000" }}>id</Box>
            </Grid>;
          })}
        </Grid>
      </Box>
    </>
  );
};
const useStyles = makeStyles({
  iconStyle: {
    borderRadius: "50%",
    backgroundColor: "#FD6637",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 7.5px",
  },
});
export default CarouselBanner;
