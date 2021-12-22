import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { StarOutlineRounded, StarRateRounded } from "@mui/icons-material";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#FD6637",
  },
  "& .MuiRating-iconHover": {
    color: "#FD6637",
  },
});
function StarBox({ starScore, setStarScore }) {
  // value = -1 --> change to 0
  const [hover, setHover] = useState(-1);

  return (
    <Box sx={container}>
      <StyledRating
        name="rating-star"
        value={starScore}
        defaultValue={0}
        precision={0.5}
        onChange={(event, newValue) => {
          setStarScore(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        icon={<StarRateRounded sx={starStyle} />}
        emptyIcon={<StarOutlineRounded sx={starStyle} />}
      />
      {/* {starScore !== null && <Box sx={{ ml: 2 }}>{starScore}</Box>} */}
    </Box>
  );
}

const starStyle = {
  color: "#FD6637",
  fontSize: "55px",
  margin: "0 5px 0 5px",
};
const container = {
  width: "100%",
  height: "90px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default StarBox;
