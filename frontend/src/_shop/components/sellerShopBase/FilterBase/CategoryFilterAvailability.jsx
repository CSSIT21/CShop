import React from "react";
import {
  Box,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
const CategoryFilterAvailability = ({
  setreadyToShip,
  setoutOfStock,
  outOfStock,
  readyToShip,
}) => {
  return (
    <Box sx={{ padding: "10px 0px 0px" }}>
      <Divider />
      <Box sx={{ padding: "10px 0px 0px" }}>
        <h3>Availability</h3>
        <Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    setreadyToShip(!readyToShip);
                  }}
                  checked={readyToShip}
                />
              }
              label="Ready to Ship"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    setoutOfStock(!outOfStock);
                  }}
                  checked={outOfStock}
                />
              }
              label="Include Out of Stock"
            />
          </FormGroup>{" "}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryFilterAvailability;
