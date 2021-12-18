import React from 'react';
import {
  Box,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const handleChange=()=>{
   console.log('checkbox is toggled');
};
const SearchFilterAvailability = () => {
  return (
    <Box sx={{ padding: '10px 0px 0px' }}>
      <Divider />
      <Box sx={{ padding: '10px 0px 0px' }}>
        <h3>Availability</h3>
        <Box>
          <FormGroup>
            <FormControlLabel 
            control={<Checkbox />} 
            onChange={} label='Ready to Ship' />
            <FormControlLabel
              control={<Checkbox />}
              onChange={} label='Include Out of Stock'
            />
          </FormGroup>{' '}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchFilterAvailability;
