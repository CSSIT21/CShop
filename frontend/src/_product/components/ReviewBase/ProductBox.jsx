import { Typography } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

const ProductBox = ({ img, productName, options }) => {
  return (
    <Box sx={container}>
      {/* อย่าลบลบborderออก */}
      <Box
        sx={{
          width: "100px",
          height: "100px",
          borderRadius: "10px",
          position: "relative",
          border: "1px solid #A0A3BD",
        }}
      >
        <img
          style={{
            top: "50%",
            left: "50%",
            width: "100%",
            position: "absolute",
            borderRadius: "10px",
            transform: "translate(-50%, -50%)",
          }}
          src={img}
          alt={productName}
          loading="lazy"
        />
      </Box>
      <Box sx={{ marginLeft: "18px" }}>
        <Typography
          sx={{ marginBottom: "8px", fontWeight: "500", fontSize: "18px" }}
        >
          {productName}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            fontWeight: "400",
            fontSize: "16px",
            color: "#A0A3BD",
          }}
        >
          {options ? "Option :" : "Option : none"}
          {options && (
            <>
              {options && (
                <Typography
                  sx={{ marginLeft: "5px", marginRight: "6px" }}
                  key={key}
                >
                  {options[0]} {options[1] && <>{options[1]}</>}{" "}
                </Typography>
              )}
            </>
          )}
          {/* {options && (
            <>
              {options?.slice(0, 5).map((e, key) => (
                <Typography
                  sx={{ marginLeft: "5px", marginRight: "6px" }}
                  key={key}
                >
                  {e.firstChoice} {e.secondChoice && <>{e.secondChoice}</>}{" "}
                  {key == options.length - 1 ? <> </> : " , "}
                </Typography>
              ))}
              {options.length > 5 && options ? "....." : " "}
            </>
          )} */}
        </Typography>
      </Box>
    </Box>
  );
};

const container = {
  width: "80%",
  height: "100px",
  display: "flex",
  marginTop: "45px",
};

export default ProductBox;
