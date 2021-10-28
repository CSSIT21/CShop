import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const AddressDetail = ({ data }) => {
  const bgColor = data.id % 2 === 0 ? "#EFEFF1" : "white";
  return (
    <>
      <Grid
        item
        xs={1}
        sx={{ color: "#FD6637", padding: "20px 0px" }}
        style={{ backgroundColor: bgColor }}
      >
        {data.primary && <Typography>Primary</Typography>}
      </Grid>
      <Grid
        item
        xs={1}
        sx={gridPadding}
        style={{ backgroundColor: bgColor }}
      ></Grid>
      <Grid item xs={3} sx={gridPadding} style={{ backgroundColor: bgColor }}>
        {data.name}
      </Grid>
      <Grid
        item
        xs={1}
        sx={gridPadding}
        style={{ backgroundColor: bgColor }}
      ></Grid>
      <Grid item xs={3} sx={gridPadding} style={{ backgroundColor: bgColor }}>
        {data.address}
      </Grid>
      <Grid
        item
        xs={1}
        sx={gridPadding}
        style={{ backgroundColor: bgColor }}
      ></Grid>
      <Grid
        item
        xs={2}
        sx={gridPadding}
        style={{ backgroundColor: bgColor, paddingRight: "15px" }}
      >
        {data.phoneNumber}
      </Grid>
    </>
  );
};

const gridPadding = {
  padding: "20px 0px",
};
export default AddressDetail;
