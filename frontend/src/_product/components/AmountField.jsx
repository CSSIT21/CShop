import React, { useState } from "react";
import Increase from "@mui/icons-material/KeyboardArrowUpRounded";
import Decrease from "@mui/icons-material/KeyboardArrowDownRounded";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

const Products = () => {
  const [products, setProducts] = useState({
    count: 1,
  });

  const handleChange = (e) => {
    setProducts({ count: e.target.value || 1 });
  };

  const decrease = (e) => {
    if (products.count <= 1) {
      return;
    }
    setProducts({ count: products.count - 1 });
  };

  const IncreaseButton = () => (
    <IconButton
      sx={{ width: "10px", height: "10px" }}
      onClick={() => setProducts({ count: products.count + 1 })}
    >
      <Increase style={{ fontSize: "22px" }} />
    </IconButton>
  );

  const DecreaseButton = () => (
    <IconButton sx={{ width: "10px", height: "10px" }} onClick={decrease}>
      <Decrease style={{ fontSize: "22px" }} />
    </IconButton>
  );

  const classes = useStyles();
  return (
    <Box
      sx={{
        width: "116px",
        height: "56px",
        position: "relative",
      }}
    >
      <TextField
        type="text"
        value={products.count}
        onChange={handleChange}
        className={classes.show}
      ></TextField>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          top: "11px",
          right: "5px",
        }}
      >
        <IncreaseButton />
        <DecreaseButton />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  show: {
    position: "absolute",
    width: "116px",
  },
});

export default Products;
