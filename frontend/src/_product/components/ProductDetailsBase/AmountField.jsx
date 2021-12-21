import React, { useState } from "react";
import Increase from "@mui/icons-material/KeyboardArrowUpRounded";
import Decrease from "@mui/icons-material/KeyboardArrowDownRounded";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

const AmountField = ({ stock = 0, count, setCount }) => {
  const handleChange = (e) => {
    setCount(e.target.value || 1);
  };

  // Decrease
  const decrease = (e) => {
    if (count <= 1) {
      return;
    }
    setCount(count - 1);
  };

  // Increase
  const increase = (e) => {
    if (count >= stock) {
      return;
    }
    setCount(count + 1);
  };

  const IncreaseButton = () => (
    <IconButton sx={{ width: "10px", height: "10px" }} onClick={increase}>
      <Increase style={{ fontSize: "20px" }} />
    </IconButton>
  );
  const DecreaseButton = () => (
    <IconButton sx={{ width: "10px", height: "10px" }} onClick={decrease}>
      <Decrease style={{ fontSize: "20px" }} />
    </IconButton>
  );

  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <TextField
        type="text"
        value={count}
        onChange={handleChange}
        className={classes.show}
        InputProps={{
          readOnly: true,
        }}
        size="small"
      ></TextField>
      <Box className={classes.button}>
        <IncreaseButton />
        <DecreaseButton />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  wrapper: {
    width: "116px",
    height: "44px",
    paddingTop: "2.5px",

    position: "relative",
  },
  show: {
    width: "100%",
    position: "absolute",
  },
  button: {
    position: "absolute",
    top: "7px",
    right: "8px",

    display: "flex",
    flexDirection: "column",
  },
});

export default AmountField;
