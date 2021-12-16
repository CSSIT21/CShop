import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SideImg from "./SideImg";
import { Fade } from "@mui/material";

const Image = ({ productPictures }) => {
  const [fade, setFade] = useState(true);
  const [main, setMain] = useState(null);
  const changeImage = (img) => {
    setFade(false);
    setTimeout(() => {
      setMain(img);
      setFade(true);
    }, 200);
  };

  console.log(main);
  return (
    <Box sx={{ display: "flex" }}>
      {productPictures.length == 1 ? (
        <></>
      ) : (
        <Box
          sx={{
            height: "580px",
          }}
        >
          {productPictures.map((pic, key) => (
            <SideImg
              img={pic.path}
              onClick={() => changeImage(pic.path)}
              key={pic.id}
            ></SideImg>
          ))}
        </Box>
      )}

      {/*displayImage*/}
      <Box sx={{ height: "580px", margin: "-1.8px 0px 0px 0px" }}>
        <Box
          sx={{
            width: "580px",
            height: "100%",

            borderRadius: "10px",

            backgroundColor: "#EFEFF1B2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            overflow: "hidden",
            position: "relative",
          }}
        >
          <Fade in={fade}>
            <img
              src={main || productPictures[0].path}
              style={imgStyle}
              alt="mainImage"
            />
          </Fade>
        </Box>
      </Box>
    </Box>
  );
};

const imgStyle = {
  width: "100%",

  position: "absolute",
  top: "50%",
  left: "50%",

  transform: "translate(-50%, -50%)",
};

export default Image;
