import React, { useState } from "react";
import Increase from "@mui/icons-material/KeyboardArrowUpRounded";
import Decrease from "@mui/icons-material/KeyboardArrowDownRounded";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
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

  const classes = useStyles();
  return (
    <Box
      // component="form"
      sx={{
        "& > :not(style)": { width: "116px", height: "44px" },
      }}
      // noValidate
      // autoComplete="off"
    >
      <input
        type="text"
        value={products.count}
        onChange={handleChange}
        className={classes.show}
        style={{
          width: "116px",
          height: "44px",
          border: "1px solid  #C4C4C4",
          borderRadius: "10px",
        }}
      />
      <input
        type="button"
        onClick={() => setProducts({ count: products.count + 1 })}
        style={{
          width: "20px",
          height: "15px",
          backgroundColor: "green",
        }}
      />
      <input
        type="button"
        onClick={decrease}
        style={{
          width: "20px",
          height: "15px",
          backgroundColor: "red",
        }}
      />
    </Box>
  );
};

const useStyles = makeStyles({
  show: {
    width: 20,
    height: 30,
  },
});

export default Products;

//  <input type="button" onClick={decrease} />
//         <input type="text" value={products.count} onChange={handleChange} />
//         <input
//           type="button"
//           onClick={() => setProducts({ count: products.count + 1 })}
//         />
