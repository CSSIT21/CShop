import React, { useState } from 'react';

import { Box, Divider, Grid, Pagination } from '@mui/material';
import { FilterAltOutlined } from '@mui/icons-material';
import CategoryHeader from '../components/CategoryHeader';
import CategoryFilterPrice from '../components/CategoryFilterPrice';
import CategoryFilterRate from '../components/CategoryFilterRate';
import CateGoryFilterService from '../components/CategoryFilterService';
import CategoryFilterAvailability from '../components/CategoryFilterAvailability';
import ProductCard from '../../common/components/ProductCard';
import { For } from '~/common/utils';

const Bestseller1 =
  'https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg';

const CategoryPage = () => {
  const itemsData = [
    {
      id: 0,
      title: 'Cheese Pizza very อร่อย มากๆๆๆ',
      price: '500',
      status: 'Hot sale',
      favourite: true,
      image: Bestseller1,
    },
    {
      id: 1,
      title: 'Cheese Pizza',
      price: '500',
      status: 'Hot sale',
      favourite: false,
      image: Bestseller1,
    },
    {
      id: 2,
      title: 'Cheese Pizza',
      price: '500',
      status: 'Hot sale',
      favourite: false,
      image: Bestseller1,
    },
    {
      id: 3,
      title: 'Cheese Pizza',
      price: '500',
      status: 'Hot sale',
      favourite: false,
      image: Bestseller1,
    },
    {
      id: 4,
      title: 'Cheese Pizza',
      price: '500',
      status: 'Hot sale',
      favourite: true,
      image: Bestseller1,
    },
    {
      id: 5,
      title: 'Cheese Pizza',
      price: '500',
      status: 'Hot sale',
      favourite: true,
      image: Bestseller1,
    },
    {
      id: 6,
      title: 'Cheese Pizza',
      price: '500',
      status: 'Hot sale',
      favourite: false,
      image: Bestseller1,
    },
  ];

  const [items, setItems] = useState(itemsData);
  const onFavourite = (e, idx) => {
    e.preventDefault();
    setItems((items) => {
      items[idx].favourite = !items[idx].favourite;
      return [...items];
    });
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
          <CategoryFilterPrice />
          <CategoryFilterRate />
          <CateGoryFilterService />
          <CategoryFilterAvailability />
        </Box>

        <Box sx={{ width: '80%' }}>
          <Grid
            container
            spacing={2}
            sx={{ paddingLeft: '30px', paddingTop: '30px' }}
          >
            <For
              each={items}
              children={(item) => (
                <Grid item xs={6} md={3} mb={3}>
                  <ProductCard
                    product={item}
                    onFavourite={onFavourite}
                    to='/product/1'
                  />
                </Grid>
              )}
            />
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding:'20px 0px' }}>
            <Pagination count={10} shape='rounded' size='large' />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryPage;
