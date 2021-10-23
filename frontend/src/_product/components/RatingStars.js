import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { StarOutlineRounded, StarRateRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
function IconContainer(props) {

const RatingStars = ({ value = null }) => {
  return (
    <>
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          sx={{
            padding: "0 25px 0 50px",
          }}
          defaultValue={value}
          precision={0.5}
          readOnly
          icon={<StarRateRounded style={iconStyle} />}
          emptyIcon={<StarOutlineRounded style={iconStyle} />}
        />{" "}
        <Box>
          {value !== null && (
            <Typography sx={{ marginTop: 1 }} fontSize="1.4rem" color="#FD6637">
              {value}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RatingStars;

const iconStyle = {
  width: "40px",
  height: "40px",
  color: "#FD6637",
};
