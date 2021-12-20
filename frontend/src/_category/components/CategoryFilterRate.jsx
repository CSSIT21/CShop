import { Box, Divider, Rating, Tooltip, Grid, Button } from '@mui/material';
import React from 'react';

const CategoryFilterRate = ({ setRate, rate }) => {
  const handleClick = (_rate) => {
    if(rate == _rate) setRate(0);
    else setRate(_rate);
  };

  return (
    <Box sx={{ padding: '25px 0px' }}>
      <Divider />
      <Box padding='10px 0px '>
        <h3>Rate</h3>
        <Grid item>
          <Tooltip disableHoverListener title='Greater than 5 stars'>
            <Button
              onClick={() => handleClick(5)}
              sx={rate == 5 ? { background: '#e1e1e1' } : {} }
            >
              <Rating value={5} readOnly />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip disableHoverListener title='Greater than 4 stars'>
            <Button onClick={() => handleClick(4)} sx={rate == 4 ? { background: '#e1e1e1' } : {} }>
              <Rating value={4} readOnly />
              <Box sx={{ paddingLeft: '10px', paddingTop: '3px' }}>Up</Box>
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip disableHoverListener title='Greater than 3 stars'>
            <Button onClick={() => handleClick(3)} sx={rate == 3 ? { background: '#e1e1e1' } : {} }>
              <Rating value={3} readOnly />
              <Box sx={{ paddingLeft: '10px', paddingTop: '3px' }}>Up</Box>
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip disableHoverListener title='Greater than 2 stars'>
            <Button onClick={() => handleClick(2)} sx={rate == 2 ? { background: '#e1e1e1' } : {} }>
              <Rating value={2} readOnly />
              <Box sx={{ paddingLeft: '10px', paddingTop: '3px' }}>Up</Box>
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip disableHoverListener title='Greater than 1 stars'>
            <Button onClick={() => handleClick(1)} sx={rate == 1 ? { background: '#e1e1e1' } : {} }>
              <Rating value={1} readOnly />
              <Box sx={{ paddingLeft: '10px', paddingTop: '3px' }}>Up</Box>
            </Button>
          </Tooltip>
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoryFilterRate;
