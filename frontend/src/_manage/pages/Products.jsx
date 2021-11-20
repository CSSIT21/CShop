import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { List } from "@mui/material";
import { For } from "~/common/utils/index";
import { styled } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Grid } from '@mui/material';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material'
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { createTheme } from '@mui/material';
import CButton from "../../common/components/CButton";
import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Search } from '@mui/icons-material';
import { grey, red, amber, orange, pink, deepPurple, blue, lightGreen, brown } from '@mui/material/colors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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

let products = [
    {
        id: 786645,
        avatarInitials: 'SD',
        avatarColor: red[400],
        name: 'Sanguine Desire',
        price: '150.00$',
        stock: 5,
        sold: 2,
        shop: 'The Library',
        ratings: 3.8,
        comments: 30,
    },
    {
        id: 834535,
        avatarInitials: 'NH',
        avatarColor: grey[800],
        name: 'Nihil',
        price: '8500.00$',
        stock: 1,
        sold: 0,
        shop: 'The Library',
        ratings: 0,
        comments: 0,
    },
    {
        id: 756122,
        avatarInitials: 'FM',
        avatarColor: orange[500],
        name: 'Fourth Match Flame',
        price: '75.00$',
        stock: 10,
        sold: 4,
        shop: 'The Library',
        ratings: 4.75,
        comments: 65,
    },
];

let resId = 1000;

const ManageAccountPage = () => {
    const classes = useStyles();
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

    useLayoutEffect(() => {
        document.body.classList.add("gray");
        document.body.classList.add("no-scroll!important")
        return () => {document.body.classList.remove("gray")};
      }, []);

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
                              <MenuItem value={'name'}>Product Name</MenuItem>
                              <MenuItem value={'price'}>Price</MenuItem>
                              <MenuItem value={'stock'}>Stock</MenuItem>
                              <MenuItem value={'sold'}>Sold</MenuItem>
                              <MenuItem value={'shop'}>Shop Name</MenuItem>
                              <MenuItem value={'rating'}>Ratings</MenuItem>
                              <MenuItem value={'Comments'}>Comments</MenuItem>
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
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Picture ({products.filter(product => product.name.toUpperCase().includes(search.toUpperCase())).length})</Typography>
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
                        (products.filter(product => product.name.toUpperCase().includes(search.toUpperCase())).sort((a,b) => { 
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
                    <Pagination count={Math.ceil(products.filter(product => product.name.toUpperCase().includes(search.toUpperCase())).length - 1)/10} showFirstButton showLastButton color="primary" shape="rounded" onChange={handlePagination}/>
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
