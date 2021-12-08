import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { styled } from "@mui/material/styles";

// ให้ธันช่วยแก้
const StyledChip = styled(Chip)({
  // ".MuiChip-root": {
  //   ".MuiChip-clickableColorPrimary": {
  //     color: "#FD6637",
  //   },
  //   ".css-1ncfxsu-MuiButtonBase-root-MuiChip-root:hover": {
  //     background: "#FD6637",
  //   },
  // },
});

function GenaratedComments({ handleClick }) {
  const [chipData, setChipData] = useState([
    { key: 0, label: "Good Quality" },
    { key: 1, label: "Worth Buying" },
    { key: 2, label: "Fast Shipping" },
    { key: 3, label: "Good Shop Services" },
    { key: 4, label: "Good Ship Services" },
  ]);

  return (
    <Box
      sx={{ width: "65%", padding: "30px 50px 20px 50px", marginLeft: "163px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <StyledChip
          sx={chipStyle}
          label="Good Quality"
          clickable
          //   onClick={handleClick("Good Quality")}
        />
        <Chip
          sx={chipStyle}
          label="Worth Buying"
          clickable
          //   onClick={handleClick("Worth Buying")}
        />
        <Chip
          sx={chipStyle}
          label="Fast Shipping"
          clickable
          //   onClick={handleClick("Fast Shipping")}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "25px 60px 0 60px",
        }}
      >
        <Chip
          sx={chipStyle}
          label="Good Shop Services"
          clickable
          //   onClick={handleClick("Good Shop Services")}
        />
        <Chip
          sx={chipStyle}
          label="Good Ship Services"
          clickable
          //   onClick={handleClick("Good Ship Services")}
        />
      </Box>
    </Box>
  );
}

const chipStyle = {
  color: "#A0A3BD",
  background: "rgba(33, 33, 33, 0.08)",
};

export default GenaratedComments;
