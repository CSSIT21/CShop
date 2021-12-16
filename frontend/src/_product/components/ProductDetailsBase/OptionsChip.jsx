import { useState } from "react";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function OptionsChip({ handleClick, list, name, selected }) {
  return (
    <>
      <Typography fontSize="16px" fontWeight="400" marginBottom="6px">
        {name}
      </Typography>
      <Grid container spacing={0.5}>
        {list.map((e) => (
          <Grid item xs={4} key={e.id}>
            <Chip
              label={e.name}
              clickable
              onClick={() => handleClick(e)}
              key={e.id}
              variant="outlined"
              sx={{
                backgroundColor: `${selected == e.id ? "#FFF1EC" : "default"}`,
                color: `${selected == e.id ? "#FD6637" : "#A0A3BD"}`,
                borderColor: `${selected == e.id ? "#FD6637" : "#A0A3BD"}`,
                width: "110px",
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default OptionsChip;
