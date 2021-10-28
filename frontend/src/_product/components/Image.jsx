import React, { useState } from "react";
import Box from "@mui/material/Box";
import Sideimg from "./SideImg";
import pic1 from "../../common/assets/images/iphone-black.png";
import pic2 from "../../common/assets/images/iphone-blue.png";
import pic3 from "../../common/assets/images/iphone-pink.png";
import pic4 from "../../common/assets/images/iphone-red.png";

const Image = ({ img }) => {
    const [main, setMain] = useState(pic1);

    const changeImage = (img) => {
        setMain(img);
    };
    return (
        <Box sx={{ display: "flex" }}>
            <Box>
                <Sideimg img={pic1} onClick={() => changeImage(pic1)} />
                <Sideimg img={pic2} onClick={() => changeImage(pic2)} />
                <Sideimg img={pic3} onClick={() => changeImage(pic3)} />
                <Sideimg img={pic4} onClick={() => changeImage(pic4)} />
            </Box>
            {/*displayImage*/}
            <Box sx={{ marginTop: "8px" }}>
                <Box
                    className="display"
                    sx={{
                        width: "512px",
                        height: "512px",
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
                    <img src={main} style={imgStyle} alt="" />
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
