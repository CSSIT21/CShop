import React, { useState } from "react";
import Box from "@mui/material/Box";
import SideImg from "./SideImg";
import { Fade } from "@mui/material";
import pic1 from "~/common/assets/images/iphone-black.png";
import pic2 from "~/common/assets/images/iphone-blue.png";
import pic3 from "~/common/assets/images/iphone-pink.png";
import pic4 from "~/common/assets/images/iphone-red.png";

const Image = ({ img }) => {
  const [fade, setFade] = React.useState(true);
  const [pictureList, setPictureList] = useState([
    {
      title: "pic1",
      link: pic1,
    },
    {
      title: "pic2",
      link: pic2,
    },
    {
      title: "pic3",
      link: pic3,
    },
    {
      title: "pic4",
      link: pic4,
    },
  ]);
  // const [main, setMain] = useState(pic1);
  const [main, setMain] = useState(pictureList[0].link);
  const changeImage = (img) => {
    setFade(false);
    setTimeout(() => {
      setMain(img);
      setFade(true);
    }, 200);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {pictureList.length == 1 ? (
        <></>
      ) : (
        <Box
          sx={{
            height: "580px",
          }}
        >
          {pictureList.slice(0, 4).map((pic, key) => (
            <SideImg
              img={pic.link}
              onClick={() => changeImage(pic.link)}
              key={key}
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
            <img src={main} style={imgStyle} alt="mainImage" />
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
