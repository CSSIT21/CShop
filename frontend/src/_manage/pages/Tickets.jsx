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
import { InputAdornment } from '@mui/material';
import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import TicketCard from "../components/TicketCard";
import { Search } from '@mui/icons-material';
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

/*let tickets = [
    {
        id: 89547,
        title: 'Missing Coffee',
        description: 'Binah replaced my coffee with tea. I swear to god that arbiter will pay for this.',
        type_title: 'User Report',
        customer_id: 'Daniel Chesed',
        target: 'Garion Binah',
        sent_date: '01/08/2020',
        admin_id: 'AdminAngela',
        status: 'Open',
        path: "https://via.placeholder.com/410x360"
    },
];*/

const ManageSellerAccountPage = () => {
    const classes = useStyles();

    const [tickets, setTicketsList] = React.useState([]);
    const setTickets = async () => {
        const fetchedData = await axios.get(
          "http://localhost:8080/manageaccount/tickets"
        );
        console.log(fetchedData.data)
        setTicketsList(fetchedData.data);
      };

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

    useEffect(()=>{
        setTickets(); 
    }, [])

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
                              <MenuItem value={'description'}>Content</MenuItem>
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
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Tickets ({(!showClosed ? (tickets.filter(ticket => ticket.description.toUpperCase().includes(search.toUpperCase())).filter(function( obj ) {return obj.status != 'Closed';})).length : tickets.filter(ticket => ticket.description.toUpperCase().includes(search.toUpperCase())).length)})</Typography>
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
                            (tickets.filter(ticket => ticket.description.toUpperCase().includes(search.toUpperCase())).sort((a,b) => { return (a[sortBy] > b[sortBy]) ? (sortOrder ? -1 : 1) : (sortOrder ? 1 : -1) ; }))
                            : (tickets.filter(ticket => ticket.description.toUpperCase().includes(search.toUpperCase())).sort((a,b) => { return (a[sortBy] > b[sortBy]) ? (sortOrder ? -1 : 1) : (sortOrder ? 1 : -1) ; }))
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
                    <Pagination count={Math.ceil(((showClosed ? (tickets.filter(ticket => ticket.description.toUpperCase().includes(search.toUpperCase())).filter(function( obj ) {return obj.status == 'Closed';})).length : tickets.filter(ticket => ticket.description.toUpperCase().includes(search.toUpperCase())).length - 1))/10)} showFirstButton showLastButton color="primary" shape="rounded" onChange={handlePagination}/>
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
