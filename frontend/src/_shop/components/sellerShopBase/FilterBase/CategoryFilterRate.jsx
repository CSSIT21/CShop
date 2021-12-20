import { Box, Divider, Rating, Tooltip, Grid, Button } from "@mui/material";
import React from "react";
const CategoryFilterRate = ({ setrating }) => {
  return (
    <Box sx={{ padding: "25px 0px" }}>
      <Divider />
      <Box padding="10px 0px ">
        <h3>Rate</h3>
        <Grid item>
          <Tooltip disableHoverListener>
            <Button
              onClick={() => {
                setrating(5);
              }}
            >
              <Rating value={5} readOnly />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip disableHoverListener>
            <Button
              onClick={() => {
                setrating(4);
              }}
            >
              <Rating value={4} readOnly />
              <Box sx={{ paddingLeft: "10px", paddingTop: "3px" }}>Up</Box>
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip disableHoverListener>
            <Button
              onClick={() => {
                setrating(3);
              }}
            >
              <Rating value={3} readOnly />
              <Box sx={{ paddingLeft: "10px", paddingTop: "3px" }}>Up</Box>
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip disableHoverListener>
            <Button
              onClick={() => {
                setrating(2);
              }}
            >
              <Rating value={2} readOnly />
              <Box sx={{ paddingLeft: "10px", paddingTop: "3px" }}>Up</Box>
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip disableHoverListener>
            <Button
              onClick={() => {
                setrating(1);
              }}
            >
              <Rating value={1} readOnly />
              <Box sx={{ paddingLeft: "10px", paddingTop: "3px" }}>Up</Box>
            </Button>
          </Tooltip>
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoryFilterRate;
