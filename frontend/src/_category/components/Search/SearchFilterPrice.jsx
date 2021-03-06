import { Box, Slider, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const CategoryFilterPrice = () => {
  // const [value, setValue] = useState([0, 500000]);
  // function valuetext(value) {
  //   return `${value}°C`;
  // }
  const [min , setMin] = useState(0)
  const [max , setMax] = useState(500000)
  const handleChange = (event, newValue) => {
    setValue(newValue);
    
    
    

  };
  const valueChange = () =>{
    
    console.log('value has changed')
  }
  
  
   
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
            value={ min }
            min={0}
            max={500000}
            type='number'
            size='small'
            // onChange={(e) => setValue((value) => [e.target.value, value[1]])}
            onChange = {valueChange}
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
            min={0}
            max={500000}
            value={value[1]}
            size='small'
            onChange={(e) => setValue((value) => [value[0], e.target.value])}
          />
        </Box>
      </Box>

      <Slider
        getAriaLabel={() => 'Temperature range'}
        min={0}
        step={1000}
        max={500000}
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        getAriaValueText={valuetext}
      />
    </Box>
  );
};

export default CategoryFilterPrice;
