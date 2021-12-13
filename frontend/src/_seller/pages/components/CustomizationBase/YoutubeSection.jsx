import { Box, TextField, Button } from "@mui/material";
import { useState, useLayoutEffect } from "react";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import InputAdornment from "@mui/material/InputAdornment";

function YoutubeSection({
  id = "0",
  videoLink = "UbYPG1GsZEI",
  information,
  setInformation = () => {},
  ...rest
}) {
  const [link, setLink] = useState();

  useLayoutEffect(() => {
    if (id in information) {
      setLink(information[id].img);
    } else {
      console.log("link not found");
      setLink(videoLink);
    }
  }, []);

  const handleChange = (e) => {
    setLink(e.target.value);
  };

  const confirmChange = () => {
    setInformation((info) => ({
      ...info,
      [id]: { ...(info[id] || videoLink), img: link },
    }));
  };
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
          src={`https://img.youtube.com/vi/${link}/hqdefault.jpg`}
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
          value={link}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InsertLinkIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          onClick={confirmChange}
          sx={{ marginLeft: "20px" }}
          variant="contained"
        >
          Confirm
        </Button>
      </Box>
    </>
  );
}

export default YoutubeSection;
