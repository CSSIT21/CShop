import { makeStyles, Box, TextField } from "@mui/material";
import { useState } from "react";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import InputAdornment from "@mui/material/InputAdornment";

function YoutubeSection({ vid: ID, ...rest }) {
  const [id, setId] = useState(ID);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#EFEFF1",
          width: "100%",
          padding: "2.5rem",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          borderRadius: "20px",
        }}
        {...rest}
      >
        <img
          src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
          alt="thumnail"
        ></img>
        <img
          src="https://cdn.icon-icons.com/icons2/2699/PNG/512/youtube_logo_icon_168737.png"
          style={{
            position: "absolute",
            width: "52px",
            height: "52px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      </Box>
      ฺ
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <TextField
          sx={{ width: "40%" }}
          value={id}
          onChange={(e) => setId(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InsertLinkIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
}

export default YoutubeSection;
