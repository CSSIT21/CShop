import React from "react";
import TopProfile from "../components/TopProfile";
import { Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const FollowedShop = () => {
  const classes = useStyles();

  return (
    <>
      <TopProfile />
      <Box className={classes.container}>
        <Box className={classes.body}>
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "600",
              margin: "72px auto",
            }}
          >
            Following Shop
          </Typography>
        </Box>
      </Box>
    </>
  );
};
const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f4f5f6",
  },
  body: {
    display: "flex",

    width: "80%",
  },
});

export default FollowedShop;
