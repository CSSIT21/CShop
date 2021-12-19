import React from 'react';
import {
  Box,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useState } from 'react';

const CategoryFilterAvailability = ({ setReadyToShip, setOutOfStock }) => {

  const handleReadyToShipClick = () => {
    setReadyToShip((readyToShip) => !readyToShip);
  };

  const handleOutOfStockClick = () => {
    setOutOfStock((outOfStock) => !outOfStock);
  };

  return (
    <Box sx={{ padding: '5px 0px 0px' }}>
      <Divider />
      <Box sx={{ padding: '10px 0px 0px' }}>
        <h3>Availability</h3>
        <Box>
          <FormGroup>
            <FormControlLabel
              onClick={handleReadyToShipClick}
              control={<Checkbox />}
              label='Ready to Ship'
            />
            <FormControlLabel
              onClick={handleOutOfStockClick}
              control={<Checkbox />}
              label='Include Out of Stock'
            />
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryFilterAvailability;
