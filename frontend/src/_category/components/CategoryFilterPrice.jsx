import { Box, Slider, TextField } from '@mui/material';
import { useState } from 'react';
const CategoryFilterPrice = ({ MIN_PRICE, MAX_PRICE, setPrice, price }) => {
  function valuetext(value) {
    return `${price}°C`;
  }

  // Max cost = value[1]
  // min cost = value[0]
  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };

  return (
    <Box>
      <Box sx={{ padding: '10px 0px 0px' }}>
        <h3>Price</h3>
      </Box>
      <Box sx={{ display: 'flex', padding: '5px 0px  10px' }}>
        <Box sx={{ width: '40%' }}>
          <TextField
            variant='outlined'
            placeholder='Min cost'
            value={price[0]}
            min={MIN_PRICE}
            max={MAX_PRICE}
            type='number'
            size='small'
            onChange={(e) => setPrice((value) => [e.target.value, price[1]])}
          />
        </Box>

        <Box
          sx={{
            width: '20%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          -
        </Box>
        <Box sx={{ width: '40%' }}>
          {' '}
          <TextField
            type='number'
            placeholder='Max cost'
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={price[1]}
            size='small'
            onChange={(e) => setPrice((value) => [price[0], e.target.value])}
          />
        </Box>
      </Box>

      <Slider
        getAriaLabel={() => 'Price range'}
        min={MIN_PRICE}
        step={MAX_PRICE / 100}
        max={MAX_PRICE}
        value={price}
        onChange={handleChange}
        valueLabelDisplay='auto'
        getAriaValueText={valuetext}
      />
    </Box>
  );
};

export default CategoryFilterPrice;
