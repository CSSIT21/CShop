import React, { useState } from "react";
import Increase from "@mui/icons-material/KeyboardArrowUpRounded";
import Decrease from "@mui/icons-material/KeyboardArrowDownRounded";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, ButtonGroup, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { width } from "@mui/system";

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
    <IconButton sx={{ width: "10px", height: "10px" }}>
      <Increase
        style={{ fontSize: "22px" }}
        onClick={() => setProducts({ count: products.count + 1 })}
      />
    </IconButton>
  );

  const DecreaseButton = () => (
    <IconButton sx={{ width: "10px", height: "10px" }}>
      <Decrease style={{ fontSize: "22px" }} onClick={decrease} />
    </IconButton>
  );

  const classes = useStyles();
  return (
    <Box
      // component="form"
      sx={{
        width: "116px",
        height: "56px",
        position: "relative",
      }}
      // noValidate
      // autoComplete="off"
    >
      <TextField
        type="text"
        value={products.count}
        onChange={handleChange}
        className={classes.show}
        //
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
  buttonStyle: {},
});

export default Products;

//  <input type="button" onClick={decrease} />
//         <input type="text" value={products.count} onChange={handleChange} />
//         <input
//           type="button"
//           onClick={() => setProducts({ count: products.count + 1 })}
//         />
