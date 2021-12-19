import { Box, Slider, TextField } from "@mui/material";
import { useState, useEffect } from "react";
const CategoryFilterPrice = ({ setpriceLow, setpriceHigh }) => {
  const [value, setValue] = useState([0, 5000]);
  function valuetext(value) {
    return `${value}°C`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setpriceLow(value[0]);
    setpriceHigh(value[1]);
  }, [value]);

  return (
    <Box>
      <Box sx={{ padding: "10px 0px 0px" }}>
        <h3>Price</h3>
      </Box>
      <Box sx={{ display: "flex", padding: "5px 0px  10px" }}>
        <Box sx={{ width: "40%" }}>
          <TextField
            variant="outlined"
            placeholder="Min cost"
            value={value[0]}
            min={0}
            max={5000}
            type="number"
            size="small"
            onChange={(e) => setValue((value) => [e.target.value, value[1]])}
          />
        </Box>

        <Box
          sx={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          -
        </Box>
        <Box sx={{ width: "40%" }}>
          {" "}
          <TextField
            type="number"
            placeholder="Max cost"
            min={0}
            max={5000}
            value={value[1]}
            size="small"
            onChange={(e) => setValue((value) => [value[0], e.target.value])}
          />
        </Box>
      </Box>

      <Slider
        getAriaLabel={() => "Temperature range"}
        min={0}
        step={100}
        max={5000}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
};

export default CategoryFilterPrice;
