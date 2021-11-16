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
import SellerCard from "../components/SellerCard";
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

let sellers = [
    {
        id: 2000,
        avatarInitials: 'LB',
        avatarColor: brown[600],
        name: 'The Library',
        productCount: 46,
        followers: 254685,
        joinDate: '15/05/2020',
        cancelRate: '2%',
        rating: 3.2,
        restrictions: [
            {id:2, type:'Nest Relocation', assigner:'CuteArbiterZena', startTime:'08/10/2020', endTime:'01/12/2021', desc:'Violating the AI Ethics Amendment'}
        ]
    },
    {
        id: 4444,
        avatarInitials: '死',
        avatarColor: red[800],
        name: 'Shi Association',
        productCount: 44,
        followers: 44444,
        joinDate: '04/04/2014',
        cancelRate: '4%',
        rating: 4.4,
        restrictions: []
    }
    ,
    {
        id: 1201,
        avatarInitials: 'LC',
        avatarColor: red[400],
        name: 'Lobotomy Corporation',
        productCount: 128,
        followers: 123463,
        joinDate: '12/07/2016',
        cancelRate: '21%',
        rating: 1.3,
        restrictions: [
            {id:24, type:'Transaction Restrictions', assigner:'AdminGarion', startTime:'22/11/2016', endTime:'22/12/2016', desc:'Improper Handling of Products'},
            {id:25, type:'Full Restrictions', assigner:'AdminGarion', startTime:'22/12/2016', endTime:'31/12/2999', desc:'Improper Handling of Products'}
        ]
    }
];

const ManageSellerAccountPage = () => {
    const classes = useStyles();
    const [sortBy, setSortBy] = React.useState('');
    const setSort = (event) => {
        setSortBy(event.target.value);
      };

    const [sortOrder, setSortOrder] = React.useState(false);
    const toggleSort = () => {
        setSortOrder(!sortOrder);
      }

    const [showRestricted, setShowRestricted] = React.useState(false);
    const toggleShowRestricted = () => {
        setShowRestricted(!showRestricted);
        setPage(1);
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
            <Box className={classes.topwrapper}>
                <Box className={classes.topright}>
                    <FormGroup>
                        <FormControlLabel onChange={toggleShowRestricted} control={<Checkbox />} label="Show Restricted Only" />
                    </FormGroup>
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
                              <MenuItem value={'name'}>Name</MenuItem>
                              <MenuItem value={'id'}>User ID</MenuItem>
                              <MenuItem value={'productCount'}>Products</MenuItem>
                              <MenuItem value={'followers'}>Followers</MenuItem>
                              <MenuItem value={'cancelRate'}>Cancel Rate</MenuItem>
                              <MenuItem value={'joinDate'}>Join Date</MenuItem>
                              <MenuItem value={'rating'}>Rating</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            <Card variant="outlined" sx={cardStyle}>
                <Card variant="outlined" style={{
                    backgroundColor: "#FDF4DD",
                    border: 'none',
                    margin: '25px',
                    marginBottom: '0px'}}>
                    <CardContent sx={{ padding: '15px', paddingBottom: '15px!important'}}>
                    <Box className={classes.header}>
                        <Box sx={{ width: '25%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Sellers ({(showRestricted ? (sellers.filter(function( obj ) {return obj.status == 'Restricted';})).length : sellers.length)})</Typography>
                        </Box>
                        <Box sx={{ width: '20%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Shop Name</Typography>
                        </Box>
                        <Box sx={{ width: '10%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Products</Typography>
                        </Box>
                        <Box sx={{ width: '10%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Followers</Typography>
                        </Box>
                        <Box sx={{ width: '14%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Cancelled Rate</Typography>
                        </Box>
                        <Box sx={{ width: '12%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Joined Date</Typography>
                        </Box>
                        <Box sx={{ width: '10%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Rating</Typography>
                        </Box>
                    </Box>
                    </CardContent>
                </Card>
            <List>
                <Card variant="outlined" sx={cardStyle}>
                    <CardContent>
                        {
                        (showRestricted ? 
                            (sellers.filter(seller => seller.name.toUpperCase().includes(search.toUpperCase())).sort((a,b) => { return (a[sortBy] > b[sortBy]) ? (sortOrder ? -1 : 1) : (sortOrder ? 1 : -1) ; }))
                            .filter(function( obj ) {
                                return obj.restrictions.length > 0;
                            })
                            : (sellers.filter(seller => seller.name.toUpperCase().includes(search.toUpperCase())).sort((a,b) => { return (a[sortBy] > b[sortBy]) ? (sortOrder ? -1 : 1) : (sortOrder ? 1 : -1) ; }))
                        ).slice((page -1)  * 10, (page - 1) * 10 + 10)
                        .map((key) => (
                            <li key={key.id.toString()}>
                                <div style={{ display:'flex', justifyContent:'center' }}>
                                    <SellerCard seller={key}/>
                                </div>
                            </li>
                        ))}
                    </CardContent>
                </Card>
            </List>
            </Card>
            <CardContent>
                <div style={{ display:'flex', justifyContent:'center' }}>
                    <Pagination count={Math.ceil(((showRestricted ? (sellers.filter(user => user.name.toUpperCase().includes(search.toUpperCase())).filter(function( obj ) {return obj.status == 'Restricted';})).length : sellers.filter(user => user.name.toUpperCase().includes(search.toUpperCase())).length - 1))/10)} showFirstButton showLastButton color="primary" shape="rounded" onChange={handlePagination}/>
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

export default ManageSellerAccountPage;
