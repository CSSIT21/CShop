import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Divider,
  Grid,
  Pagination,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { FilterAltOutlined } from '@mui/icons-material';
import CategoryHeader from '../components/CategoryHeader';

import CategoryFilterPrice from '../components/CategoryFilterPrice';
import CategoryFilterRate from '../components/CategoryFilterRate';
import CateGoryFilterService from '../components/CategoryFilterService';
import CategoryFilterAvailability from '../components/CategoryFilterAvailability';

import ProductCard from '../../common/components/ProductCard';
import { For, debounce } from '~/common/utils';
import qs from 'qs';

const Bestseller1 =
  'https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg';

const CategoryPage = () => {
  // http://localhost:3000/search/category/0 -> id
  // http://localhost:3000/search/category/1 -> id
  const { id } = useParams();
  const q =
    qs.parse(window.location.search, { ignoreQueryPrefix: true }).q || '';
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(12);
  const [totalPage, setTotalPage] = useState(0);
  
  /** filter */
  const [readyToShip, setReadyToShip] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [loading, setLoading] = useState(false);
  const MIN_PRICE = 0,
    MAX_PRICE = 1500;
  const [price, setPrice] = useState([MIN_PRICE, MAX_PRICE]);
  /**rate */
  const [rate, setRate] = useState(0);
  

  const fetchProducts = (
    page,
    readyToShip,
    outOfStock,
    price = [MIN_PRICE, MAX_PRICE]
  ) => {
    console.log('currentPage', page, readyToShip, outOfStock, price , rate);
    setLoading(true);
    axios
      .get(
        `http://localhost:8080/search?q=${q}&category=${id || 0}` +
          `&page=${page}&itemPerPage=${itemPerPage}&priceLow=${price[0]}` +
          `&priceHigh=${price[1]}&rate=${rate}` +
          `&readyToShip=${readyToShip}&outOfStock=${outOfStock}`
      )
      .then((response) => {
        console.log(response.data);
        setItems(response.data.products);
        setTotalPage(response.data.pageCount);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  };

  const debouncedFetching = useMemo(() => debounce(fetchProducts, 500), []);

  useEffect(() => {
    fetchProducts(page);
  }, []);

  useEffect(() => {
    console.log(q, page);
    debouncedFetching(page, readyToShip, outOfStock, price, rate);
  }, [page, readyToShip, outOfStock, price, rate]);

  const onFavourite = (e, idx) => {
    e.preventDefault();
    setItems((items) => {
      items[idx].favourite = !items[idx].favourite;
      return [...items];
    });
  };

  const onChangePage = (e, page) => {
    e.preventDefault();
    setPage(page);
  };

  return (
    <Box sx={{ padding: '25px 50px' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      {id && (
        <Box>
          <CategoryHeader style={{ width: '100%' }} />
        </Box>
      )}
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
          <CategoryFilterPrice
            setPrice={setPrice}
            price={price}
            MIN_PRICE={MIN_PRICE}
            MAX_PRICE={MAX_PRICE}
          />
          <CategoryFilterRate 
          setRate = {setRate}
          rate = {rate}
          />

          <CategoryFilterAvailability
            setReadyToShip={setReadyToShip}
            setOutOfStock={setOutOfStock}
          />
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
                <Grid item xs={6} md={3} mb={3} key={item.title}>
                  <ProductCard
                    product={item}
                    onFavourite={onFavourite}
                    to='/product/1'
                  />
                </Grid>
              )}
            />
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '20px 0px',
            }}
          >
            <Pagination
              count={totalPage}
              onChange={onChangePage}
              shape='rounded'
              size='large'
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryPage;
