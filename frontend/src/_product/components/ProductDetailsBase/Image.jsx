import React, { useState } from "react";
import Box from "@mui/material/Box";
import SideImg from "./SideImg";
import {
  Fade
} from "@mui/material";
import pic1 from "~/common/assets/images/iphone-black.png";
import pic2 from "~/common/assets/images/iphone-blue.png";
import pic3 from "~/common/assets/images/iphone-pink.png";
import pic4 from "~/common/assets/images/iphone-red.png";

const Image = ({ img }) => {
  const [fade, setFade] = React.useState(true);
  // const [pictureList, setPictureList] = useState([{ title: "pic1", link: "https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg" }, { title: "pic2", link: "https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg" }, { title: "pic3", link: "https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg" }, { title: "pic4", link: "https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg" }]);
  const [main, setMain] = useState(pic1);
  // const [main, setMain] = useState(pictureList[0].link);
  const changeImage = (img) => {
    setFade(false);
    setTimeout(() => {
      setMain(img);
      setFade(true);
    }, 200);
  };

  return (
    <Box sx={{ display: "flex"}}>
      <Box sx={{
        height: "512px",
      }}>
        {/* {pictureList.map((pic, key) => (<SideImg img={pic.link} onClick={() => changeImage(pic.link)} key={ key}></SideImg>))} */}
        <SideImg img={pic1} onClick={() => changeImage(pic1)} />
        <SideImg img={pic2} onClick={() => changeImage(pic2)} />
        <SideImg img={pic3} onClick={() => changeImage(pic3)} />
        <SideImg img={pic4} onClick={() => changeImage(pic4)} />
      </Box>

      {/*displayImage*/}
      <Box sx={{height: "512px", margin: "-1.8px 0px 0px 0px" }}>
        <Box
          sx={{
            width: "512px",
            height: "100%",

            border: "1px solid #EFF0F6",
            borderRadius: "10px",

            backgroundColor: "#EFF0F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            overflow: "hidden",
            position: "relative",
          }}
        >
          <Fade in={fade} >
            <img src={main} style={imgStyle} alt="mainImage" />
          </Fade>
        </Box>
        </Box>
        </Box>
    );
};

const imgStyle = {
  width:"100%",

  position: "absolute",
  top: "50%",
  left: "50%",
  
  transform: "translate(-50%, -50%)",
};

export default Image;