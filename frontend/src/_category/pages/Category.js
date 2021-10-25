import React from 'react';

import { Box, Divider } from '@mui/material';
import { FilterAltOutlined } from '@mui/icons-material';
import CategoryHeader from '../components/CategoryHeader';
import { padding } from '@mui/system';
import CategoryFilterPrice from '../components/CategoryFilterPrice';
import CategoryFilterRate from '../components/CategoryFilterRate';

const CategoryPage = () => {
 

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
          <CategoryFilterPrice />
          <CategoryFilterRate />
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryPage;
