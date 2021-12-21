import Paper from '@mui/material/Paper';
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { List } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material'
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputAdornment } from '@mui/material';
import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import config from '../../common/constants';
import ProductCard from "../components/ProductCard";
import { Search } from '@mui/icons-material';
import { grey, red, orange } from '@mui/material/colors';
import axios from "axios";

const cardStyle = {
    width: '100%',
    padding: '0px',
    margin: '0px',
  
    border: 'none',
    transition: "all ease 0.125s",
  };

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


/*let products = [
    {
        id: 12,
        avatarInitials: 'SD',
        avatarColor: red[400],
        path: '',
        title: 'Sanguine Desire',
        price: 150,
        quantity: 5,
        sold: 2,
        shop_id: 1,
        rating: 3.8,
        comments: 30,
    },
    {
        id: 13,
        avatarInitials: 'SD',
        avatarColor: red[400],
        path: '',
        title: 'Furioso',
        price: 300,
        quantity: 9,
        sold: 3,
        shop_id: 2,
        rating: 4.2,
        comments: 35,
    },
    {
        id: 1412,
        avatarInitials: 'SD',
        avatarColor: red[400],
        path: '',
        title: 'Paradise Lost',
        price: 666,
        quantity: 6,
        sold: 6,
        shop_id: 6,
        rating: 0.6,
        comments: 66,
    },
];*/

let resId = 1000;

const ManageAccountPage = () => {
    const classes = useStyles();
    
    const [products, setProductsList] = React.useState([]);
    const setProducts = async () => {
        const fetchedData = await axios.get(
          config.SERVER_URL + "/manageaccount/products"
        );
        setProductsList(fetchedData.data);
      };
    
    const [sortBy, setSortBy] = React.useState('');
    const setSort = (event) => {
        setSortBy(event.target.value);
      };

    const [sortOrder, setSortOrder] = React.useState(false);
    const toggleSort = () => {
        setSortOrder(!sortOrder);
      }

    const [page, setPage] = React.useState(1);
    const handlePagination = (event) => {
        setPage(event.target.textContent);
    }

    const [search, setSearch] = React.useState('');
    const handleSearch = (event) => {
        setSearch(event.target.value);
    }
    
    useEffect(()=>{
        setProducts();
    }, [])

    return (
        <div>
            <Box className={classes.topwrapper} sx={{ margin:'30px 30px'}}>
                <Box className={classes.topright}>
                </Box>
                <Box className={classes.topright}>
                    <Box sx={{ margin: '8px'}}>
                        <TextField
                        hiddenLabel
                        id="search-field"
                        placeholder="Search"
                        variant="filled"
                        size="small"
                        onChange={handleSearch}
                        className={classes.root2}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <Search color="primary"/>
                                </InputAdornment>
                                ),
                                className: classes.input,
                            }}
                        />
                    </Box>
                    <Box sx={{ marginTop: '10px', marginBottom: '10px', display:'flex', justifyContent: 'flex-end'}}>
                        <FormGroup sx={{ margin: '6px'}}>
                            <FormControlLabel onChange={toggleSort} control={<Checkbox />} label="Sort by Ascending"/>
                        </FormGroup>
                        <FormControl sx={{ m: 1 }}>
                            <InputLabel id="sort-by-select-label" sx={{ top: '-5px' }}>Sort By</InputLabel>
                            <Select
                              labelId="sort-by-label"
                              id="sort-by"
                              value={sortBy}
                              label="Sort By"
                              className={classes.root}
                              onChange={setSort}
                            >
                              <MenuItem value={'title'}>Product Name</MenuItem>
                              <MenuItem value={'price'}>Price</MenuItem>
                              <MenuItem value={'quantity'}>Stock</MenuItem>
                              <MenuItem value={'sold'}>Sold</MenuItem>
                              <MenuItem value={'shop_id'}>Shop Name</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            <Card variant="outlined" sx={cardStyle} sx={{ margin:'0px 45px'}}>
                <Card variant="outlined" style={{
                    backgroundColor: "#FDF4DD",
                    border: 'none',
                    margin: '25px',
                    marginBottom: '0px'}}>
                    <CardContent sx={{ padding: '15px', paddingBottom: '15px!important'}}>
                    <Box className={classes.header}>
                        <Box sx={{ width: '12%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Products ({products.filter(product => product.title.toUpperCase().includes(search.toUpperCase())).length})</Typography>
                        </Box>
                        <Box sx={{ width: '18%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Name</Typography>
                        </Box>
                        <Box sx={{ width: '10%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Price</Typography>
                        </Box>
                        <Box sx={{ width: '10%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }} sx={{ marginLeft: '30%' }}>Stock</Typography>
                        </Box>
                        <Box sx={{ width: '10%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }} sx={{ marginLeft: '30%' }}>Sold</Typography>
                        </Box>
                        <Box sx={{ width: '16%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }} sx={{ marginLeft: '40%' }}>Shop</Typography>
                        </Box>
                        <Box sx={{ width: '10%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }} sx={{ marginLeft: '40%' }}>Ratings</Typography>
                        </Box>
                        <Box sx={{ width: '10%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }} sx={{ marginLeft: '34%' }}>Comments</Typography>
                        </Box>
                    </Box>
                    </CardContent>
                </Card>
            <List>
                <Card variant="outlined" sx={cardStyle}>
                    <CardContent>
                        {
                        (products.filter(product => product.title.toUpperCase().includes(search.toUpperCase())).sort((a,b) => { 
                            return (a[sortBy] > b[sortBy]) ? (sortOrder ? -1 : 1) : (sortOrder ? 1 : -1) ; }))
                            .slice((page -1)  * 10, (page - 1) * 10 + 10)
                        .map((key) => (
                            <li key={key.id.toString()}>
                                <div style={{ display:'flex', justifyContent:'center' }}>
                                    <ProductCard product={key}/>
                                </div>
                            </li>
                        ))}
                    </CardContent>
                </Card>
            </List>
            </Card>
            <CardContent>
                <div style={{ display:'flex', justifyContent:'center' }}>
                    {
                        products.length > 0 ?
                        <Pagination count={Math.ceil((products.filter(product => product.title.toUpperCase().includes(search.toUpperCase())).length)/10)} showFirstButton showLastButton color="primary" shape="rounded" onChange={handlePagination}/>:
                        <Pagination count={1}/>
                    }
                </div>
            </CardContent>
        </div>
    );
};

const useStyles = makeStyles({
    topwrapper: {
        display:'flex',
        justifyContent: "space-between",
        alignItems: "center",
        margin: "5px",
    },
    topright: {
        display:'inline-block',
        justifyContent: "right",
        marginLeft: "15px",
    },
    root: {
        width: "200px",
        height: "40px"
    },
    root2: {
        width: "450px"
    },
    input: {
        color: 'white'
    },
    header: {
        display:'flex',
        flexDirection: 'row',
    }
});

export default ManageAccountPage;
