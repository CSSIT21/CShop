import React from 'react';
import { useState } from 'react';
import { Box, Slider, TextField, Divider } from '@mui/material'
import { FilterAltOutlined } from '@mui/icons-material';
import CategoryHeader from '../components/CategoryHeader'

const CategoryPage = () => {
  const [value, setValue] = useState([0, 500000]);

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{padding: "25px 50px"}}>
      <Box>
        <CategoryHeader style={{width: '100%'}}/>
      </Box>
      <Box sx={{display: "flex"}}>
        <Box sx={{width: "20%"}}>
          <Box sx={{display: 'flex',justifyContent: 'space-between', alignItems: 'center', padding: '20px 0px'}}>
          <b>Filter</b><FilterAltOutlined size="large"/> 
          </Box>
          <Divider/>
          <Box sx={{display: "flex", padding: '30px 0px'}}>
            <Box sx={{width: "40%"}}><TextField 
            variant="outlined"
            placeholder="Min cost"
            value={value[0]}
            min={0}
            max={500000}
            type="number"
            size="small"
            onChange={(e) => setValue(value => [e.target.value, value[1]])}
          /></Box>
            <Box sx={{width: "20%", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>-</Box>
            <Box sx={{width: "40%"}}> <TextField 
            type="number"
            placeholder="Max cost"
            min={0}
            max={500000}
            value={value[1]}
            size="small"
            onChange={(e) => setValue(value => [value[0],e.target.value ])}
          /></Box>
          </Box>
          
         
          <Slider
          getAriaLabel={() => 'Temperature range'}
          min={0}
          step={1000}
          max={500000}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
        </Box>
        <Box sx={{width: "80%"}}>

        </Box>
      </Box>
    </Box>
  );
};

export default CategoryPage;
