import React from "react";
import { Typography, Grid } from "@mui/material";

const GridTitle = ({ title }) => {
  return (
    <>
      <Grid item xs={4}>
        <Typography
          color="primary"
          sx={{
            fontSize: "24px",
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
      </Grid>
    </>
  );
};

export default GridTitle;
