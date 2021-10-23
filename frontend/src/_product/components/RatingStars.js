// import { StarRateRounded } from "@mui/icons-material";
import React, { Component } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { StarOutlineRounded, StarRateRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { fontSize } from "@mui/system";
const customIcons = {
  0: {
    icon: <StarRateRounded />,
    label: "Very Dissatisfied",
  },
  0.5: {
    icon: <StarRateRounded />,
    label: "Dissatisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

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
            padding: "0 0 0 50px",
          }}
          defaultValue={value}
          precision={0.5}
          readOnly
          icon={<StarRateRounded style={iconStyle} />}
          emptyIcon={<StarOutlineRounded style={iconStyle} />}
        />
        {value !== null && (
          <Box>
            <Typography fontSize="1.4rem" color="#FD6637">
              {value}
            </Typography>
          </Box>
        )}
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
