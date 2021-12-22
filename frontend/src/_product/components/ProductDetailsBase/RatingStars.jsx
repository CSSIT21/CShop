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
          value={value}
          // defaultValue={value}
          precision={0.5}
          icon={<StarRateRounded style={iconStyle} />}
          emptyIcon={<StarOutlineRounded style={iconStyle} />}
          onChange={() => {}}
          readOnly
        />
        {isComment ? (
          <></>
        ) : (
          <Box>
            {value && (
              <Typography
                sx={{
                  marginTop: 0.7,
                  fontSize: "18px",
                  fontWeight: 600,
                }}
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
