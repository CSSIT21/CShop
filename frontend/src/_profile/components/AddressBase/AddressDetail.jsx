import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, IconButton, Button } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
const AddressDetail = ({
  data,
  index,
  handleOpenDelete = () => {},
  handleSetPrimary = () => {},
}) => {
  const bgColor = index % 2 === 1 ? "#EFEFF1" : "white";
  return (
    <>
      <Grid
        item
        xs={2}
        sx={{ color: "#FD6637", padding: "20px 0px", textAlign: "center" }}
        style={{ backgroundColor: bgColor }}
      >
        {data.customer_address[0].primary ? (
          <Typography>Primary</Typography>
        ) : (
          <Button
            sx={{ textTransform: "capitalize", color: "#A0A3BD" }}
            onClick={handleSetPrimary}
          >
            Set Primary
          </Button>
        )}
      </Grid>
      <Grid item xs={2} sx={gridPadding} style={{ backgroundColor: bgColor }}>
        {data.recipient_name}
      </Grid>
      <Grid
        item
        xs={1}
        sx={gridPadding}
        style={{ backgroundColor: bgColor }}
      ></Grid>
      <Grid item xs={3} sx={gridPadding} style={{ backgroundColor: bgColor }}>
        {data.address_line}
        {", "}
        {data.sub_district}
        {", "}
        {data.district}
        {", "}
        {data.province}
        {", "}
        {data.postal_code}
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
        {data.phone_number}
      </Grid>
      <Grid
        item
        xs={1}
        sx={gridPadding}
        style={{ backgroundColor: bgColor, paddingRight: "15px" }}
      >
        {!data.customer_address[0].primary && (
          <IconButton color="primary" onClick={handleOpenDelete}>
            <DeleteRoundedIcon />
          </IconButton>
        )}
      </Grid>
    </>
  );
};

const gridPadding = {
  padding: "20px 0px",
  wordBreak: "break-word",
};
export default AddressDetail;
