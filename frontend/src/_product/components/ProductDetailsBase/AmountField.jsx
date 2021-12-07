import React, { useState } from "react";
import Increase from "@mui/icons-material/KeyboardArrowUpRounded";
import Decrease from "@mui/icons-material/KeyboardArrowDownRounded";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

const AmountField = ({stock= 0}) => {
  const [products, setProducts] = useState({
    count: 1,
  });

  const handleChange = (e) => {
    setProducts({ count: e.target.value || 1 });
  };

  // Decrease
  const decrease = (e) => {
    if (products.count <= 1) {
      return;
    }
    setProducts({ count: products.count - 1 });
  };

  // Increase
  const increase = (e) => {
    if (products.count >= stock) {
      return;
    }
    setProducts({ count: products.count + 1 });
  };

  const IncreaseButton = () => (
    <IconButton
      sx={{ width: "10px", height: "10px" }}
      onClick={increase}
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
      className={classes.wrapper}
    >
      <TextField
        type="text"
        value={products.count}
        onChange={handleChange}
        className={classes.show}
        InputProps={{
            readOnly: true,
          }}
      ></TextField>
      <Box
        className={classes.button}
        
      >
        <IncreaseButton />
        <DecreaseButton />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  wrapper: {
    width: "116px",
    height: "56px",
    
    position: "relative",
  },
  show: {
    width: "100%",
    position: "absolute",
  },
  button: {
    position: "absolute",
    top: "13px",
    right: "8px",
    
    display: "flex",
    flexDirection: "column",
  }
});

export default AmountField;
