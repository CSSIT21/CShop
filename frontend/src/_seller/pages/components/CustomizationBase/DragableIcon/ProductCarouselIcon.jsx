import { Box } from "@mui/system";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PreviewProductCard from "./PreviewProductCard";

const ProductCategoryIcon = ({ ...rest }) => {
  const classes = useStyles();
  return (
    <Box {...rest}>
      <Typography fontSize="18px">Product Category</Typography>
      <Box
        sx={{
          backgroundColor: "#F4F5F6",
          height: "90px",
          marginTop: "10px",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              marginTop: "10px",
              marginRight: "0.5rem",
              marginBottom: "0.2rem",
            }}
          >
            <Box
              sx={{ backgroundColor: "#FFFFFF" }}
              className={classes.iconStyle}
            >
              <ChevronLeftIcon
                style={{ color: "#000000", width: "15px", height: "15px" }}
              />
            </Box>
            <Box
              sx={{ backgroundColor: "#FD6637" }}
              className={classes.iconStyle}
            >
              <ChevronRightIcon
                style={{ color: "#FFFFFF", width: "15px", height: "15px" }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {[...Array(4)].map((id, idx) => (
            <PreviewProductCard key={idx} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
const useStyles = makeStyles({
  iconStyle: {
    borderRadius: "50%",
    backgroundColor: "#FD6637",
    width: "15px",
    height: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 0.2rem",
  },
});

export default ProductCategoryIcon;
