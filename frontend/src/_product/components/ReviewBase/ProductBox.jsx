import { Typography } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

const ProductBox = ({
  // img = "https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg",
  img = "https://offautan-uc1.azureedge.net/-/media/images/off/ph/products-en/products-landing/landing/off_overtime_product_collections_large_2x.jpg?la=en-ph",
  productName = "Product Name",
  options,
  // options = [
  //   { option: "Black", choice: "XL" },
  //   { option: "Pink", choice: "L" },
  //   { option: "Red", choice: "M" },
  //   { option: "Black", choice: "XL" },
  //   { option: "Pink", choice: "L" },
  //   { option: "Red", choice: "M" },
  // ],
}) => {
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

          {/* เชื่อมbackendแล้วเช็คและแก้ตัวแปรoption and choiceอีกรอบนะ */}
          {options && (
            <>
              {options.slice(0, 5).map((e, key) => (
                <Typography
                  sx={{ marginLeft: "5px", marginRight: "6px" }}
                  key={key}
                >
                  {e.option} {e.choice}{" "}
                  {key == options.length - 1 ? <> </> : " , "}
                </Typography>
              ))}
              {options.length > 5 ? "....." : " "}
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

const container = {
  width: "80%",
  height: "100px",
  display: "flex",
  marginTop: "50px",
};

export default ProductBox;
