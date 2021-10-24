import React from 'react';
import { useState } from 'react';
import {
  Box,
  Slider,
  TextField,
  Divider,
  Typography,
  Rating,
  Tooltip,
  Grid,
  Button,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { FilterAltOutlined } from '@mui/icons-material';
import CategoryHeader from '../components/CategoryHeader';
import { padding } from '@mui/system';

const CategoryPage = () => {
  const [value, setValue] = useState([0, 500000]);
  const [valueFiveStar, setValueFiveStar] = React.useState(5);
  const [valueFourStar, setValueFourStar] = React.useState(4);
  const [valueThreeStar, setValueThreeStar] = React.useState(3);
  const [valueTwoStar, setValueTwoStar] = React.useState(2);
  const [valueOneStar, setValueOneStar] = React.useState(1);

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <Box sx={{ padding: '25px 50px' }}>
      <Box>
        <CategoryHeader style={{ width: '100%' }} />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '20%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '50px 0px 20px',
            }}
          >
            <b>Filter</b>
            <FilterAltOutlined size='large' />
          </Box>
          <Divider />
          <Box sx={{ padding: '10px 0px 0px' }}>
            <h3>Price</h3>
          </Box>
          <Box sx={{ display: 'flex', padding: '5px 0px  10px' }}>
            <Box sx={{ width: '40%' }}>
              <TextField
                variant='outlined'
                placeholder='Min cost'
                value={value[0]}
                min={0}
                max={500000}
                type='number'
                size='small'
                onChange={(e) =>
                  setValue((value) => [e.target.value, value[1]])
                }
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
                onChange={(e) =>
                  setValue((value) => [value[0], e.target.value])
                }
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

          <Box sx={{ padding: '25px 0px' }}>
            <Divider />
            <Box padding='10px 0px '>
              <h3>Rate</h3>
              <Grid item>
                <Tooltip disableHoverListener>
                  <Button>
                    <Rating value={valueFiveStar} readOnly />
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip disableHoverListener>
                  <Button>
                    <Rating value={valueFourStar} readOnly />
                    <Box sx={{ paddingLeft: '10px', paddingTop: '3px' }}>
                      Up
                    </Box>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip disableHoverListener >
                  <Button >
                    <Rating value={valueThreeStar} readOnly />
                    <Box sx={{ paddingLeft: '10px', paddingTop: '3px' }}>
                      Up
                    </Box>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip disableHoverListener>
                  <Button>
                    <Rating value={valueTwoStar} readOnly />
                    <Box sx={{ paddingLeft: '10px', paddingTop: '3px' }}>
                      Up
                    </Box>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip disableHoverListener>
                  <Button>
                    <Rating value={valueOneStar} readOnly />
                    <Box sx={{ paddingLeft: '10px', paddingTop: '3px' }}>
                      Up
                    </Box>
                  </Button>
                </Tooltip>
              </Grid>
              
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryPage;
