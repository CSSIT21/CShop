import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { StarOutlineRounded, StarRateRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";

const RatingStars = ({ value, iconStyle, isComment, padding }) => {
  return (
    <>
      <Box sx={container}>
        <Rating
          sx={padding}
          defaultValue={value}
          precision={0.5}
          readOnly
          icon={<StarRateRounded style={iconStyle} />}
          emptyIcon={<StarOutlineRounded style={iconStyle} />}
        />
        {isComment ? (
          <></>
        ) : (
          <Box>
            {value !== null && (
              <Typography
                sx={{ marginTop: 1 }}
                fontSize="1.4rem"
                color="#FD6637"
              >
                {value}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

const container = {
  width: 200,
  display: "flex",
  alignItems: "center",
};

export default RatingStars;
