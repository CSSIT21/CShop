import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { styled } from "@mui/material/styles";

const StyledChip = styled(Chip)({
  ".MuiChip-root": {
    ".MuiChip-clickableColorPrimary": {
      color: "#FD6637",
    },
    ".css-1ncfxsu-MuiButtonBase-root-MuiChip-root:hover": {
      background: "#FD6637",
    },
  },
});

function GeneratedComments({ generatedComments, setChipData }) {
  const [active, setActive] = useState(false);

  const handleClick = (e) => {
    setChipData((data) =>
      data.map((el) => (el.key == e.key ? { ...el, clicked: !el.clicked } : el))
    );
  };

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
        {generatedComments.slice(0, 3).map((e) => (
          <StyledChip
            label={e.label}
            clickable
            color={e.clicked ? "primary" : "default"}
            onClick={() => handleClick(e)}
            key={e.key}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "25px 60px 0 60px",
        }}
      >
        {generatedComments.slice(3, 5).map((e) => (
          <StyledChip
            label={e.label}
            clickable
            color={e.clicked ? "primary" : "default"}
            onClick={() => handleClick(e)}
            key={e.key}
          />
        ))}
      </Box>
    </Box>
  );
}

export default GeneratedComments;
