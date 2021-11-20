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
import TicketCard from "../components/TicketCard";
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

let tickets = [
    {
        id: 89547,
        name: 'Missing Coffee',
        desc: 'Binah replaced my coffee with tea. I swear to god that arbiter will pay for this.',
        type: 'User Report',
        filer: 'Daniel Chesed',
        target: 'Garion Binah',
        filedDate: '01/08/2020',
        assignee: 'AdminAngela',
        status: 'Open',
        title: 'fake product',
        image: "https://via.placeholder.com/410x360"
    },
    {
        id: 89548,
        name: 'Missing Tea',
        desc: 'That blue nobel boy spiked my perfectly good tea with coffee. Maybe I should do a Daniel on him once more.',
        type: 'User Report',
        filer: 'Garion Binah',
        target: 'Daniel Chesed',
        filedDate: '02/08/2020',
        assignee: 'AdminAngela',
        status: 'Open',
        title: 'fake product',
        image: "https://via.placeholder.com/410x360"
    },
    {
        id: 89429,
        name: 'Missing Category',
        desc: 'I cant seem to buy the things I want from CShop? There isnt a category for weapons of mass destruction on here. Is this a bug?',
        type: 'Bug Report',
        filer: 'Lisa Tiphereth',
        target: 'Category System',
        filedDate: '10/06/2020',
        assignee: 'AdminAngela',
        status: 'Closed',
        title: 'fake product',
        image: "https://via.placeholder.com/410x360"
    },
    {
        id: 87429,
        name: 'Lorem ipsum dolor sit amet',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ornare erat accumsan justo tempor efficitur. Donec convallis libero sit amet odio auctor, luctus auctor est euismod. Etiam in sem at lectus consectetur laoreet venenatis eget lacus. Donec quis turpis laoreet, aliquam diam eu, molestie leo. Nunc dapibus sapien id ornare fringilla. Fusce tempor pulvinar dolor, vitae condimentum felis bibendum nec. Quisque facilisis congue pulvinar. Praesent ut massa pulvinar, ullamcorper elit sed, egestas tortor. Mauris nec sollicitudin lorem. Vestibulum quis eleifend nibh.',
        type: 'Seller Report',
        filer: 'Don Quixote',
        target: 'The Library',
        filedDate: '21/02/2020',
        assignee: 'Vergilius',
        status: 'Open',
        title: 'fake product',
        image: "https://via.placeholder.com/410x360"
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

    const [showClosed, setShowClosed] = React.useState(false);
    const toggleShowClosed = () => {
        setShowClosed(!showClosed);
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

    const setStatus = (ticketid, status) => {
        tickets.filter(ticket => ticket.id === ticketid)[0].status = status;
    }

    return (
        <div>
            <Box className={classes.topwrapper} sx={{ margin:'30px 30px'}}>
                <Box className={classes.topright}>
                    <FormGroup>
                        <FormControlLabel onChange={toggleShowClosed} control={<Checkbox />} label="Show Closed Tickets" />
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
                              label="Sort By"
                              id="sort-by"
                              value={sortBy}
                              className={classes.root}
                              onChange={setSort}
                            >
                              <MenuItem value={'desc'}>Content</MenuItem>
                              <MenuItem value={'type'}>Type</MenuItem>
                              <MenuItem value={'filer'}>Filer</MenuItem>
                              <MenuItem value={'target'}>Target</MenuItem>
                              <MenuItem value={'filedDate'}>Filed Date</MenuItem>
                              <MenuItem value={'assignee'}>Assingee</MenuItem>
                              <MenuItem value={'status'}>Status</MenuItem>
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
                        <Box sx={{ width: '50%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Tickets ({(!showClosed ? (tickets.filter(ticket => ticket.desc.toUpperCase().includes(search.toUpperCase())).filter(function( obj ) {return obj.status != 'Closed';})).length : tickets.filter(ticket => ticket.desc.toUpperCase().includes(search.toUpperCase())).length)})</Typography>
                        </Box>
                        <Box sx={{ width: '16%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Type</Typography>
                        </Box>
                        <Box sx={{ width: '16%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Filer</Typography>
                        </Box>
                        <Box sx={{ width: '16%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Target</Typography>
                        </Box>
                        <Box sx={{ width: '16%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Filed Date</Typography>
                        </Box>
                        <Box sx={{ width: '16%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Assigned To</Typography>
                        </Box>
                        <Box sx={{ width: '14%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Status</Typography>
                        </Box>
                        <Box sx={{ width: '5%' }} className={classes.header}>
                        </Box>
                    </Box>
                    </CardContent>
                </Card>
            <List>
                <Card variant="outlined" sx={cardStyle}>
                    <CardContent>
                        {
                        (showClosed ? 
                            (tickets.filter(ticket => ticket.desc.toUpperCase().includes(search.toUpperCase())).sort((a,b) => { return (a[sortBy] > b[sortBy]) ? (sortOrder ? -1 : 1) : (sortOrder ? 1 : -1) ; }))
                            : (tickets.filter(ticket => ticket.desc.toUpperCase().includes(search.toUpperCase())).sort((a,b) => { return (a[sortBy] > b[sortBy]) ? (sortOrder ? -1 : 1) : (sortOrder ? 1 : -1) ; }))
                            .filter(function( obj ) {
                                return obj.status != 'Closed';
                            })
                        ).slice((page -1)  * 10, (page - 1) * 10 + 10)
                        .map((key) => (
                            <li key={key.id.toString()}>
                                <div style={{ display:'flex', justifyContent:'center' }}>
                                    <TicketCard ticket={key} setStatus={setStatus}/>
                                </div>
                            </li>
                        ))}
                    </CardContent>
                </Card>
            </List>
            </Card>
            <CardContent>
                <div style={{ display:'flex', justifyContent:'center' }}>
                    <Pagination count={Math.ceil(((showClosed ? (tickets.filter(ticket => ticket.desc.toUpperCase().includes(search.toUpperCase())).filter(function( obj ) {return obj.status == 'Closed';})).length : tickets.filter(ticket => ticket.desc.toUpperCase().includes(search.toUpperCase())).length - 1))/10)} showFirstButton showLastButton color="primary" shape="rounded" onChange={handlePagination}/>
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
