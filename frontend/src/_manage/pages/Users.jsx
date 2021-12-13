import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
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
import React from "react";
import UserCard from "../components/UserCard";
import { Search } from '@mui/icons-material';
import { grey, red, amber, orange, pink, deepPurple, blue, lightGreen, brown } from '@mui/material/colors';
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

let users = [
    {
        id: 24578,
        avatarInitials: 'HB',
        avatarColor: grey[400],
        path: '',
        name: 'Hokma Benjamin',
        address_line: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal_code: '10120',
        date: '10/10/2020',
        birthdate: '02/08/1987',
        restrictions: [],
    },
    {
        id: 24571,
        avatarInitials: 'HB',
        avatarColor: grey[400],
        path: '',
        name: 'Hokma Benjamin',
        address_line: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal_code: '10120',
        date: '10/10/2020',
        birthdate: '02/08/1987',
        restrictions: [],
    },
    {
        id: 24572,
        avatarInitials: 'HB',
        avatarColor: grey[400],
        path: '',
        name: 'Hokma Benjamin',
        address_line: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal_code: '10120',
        date: '10/10/2020',
        birthdate: '02/08/1987',
        restrictions: [],
    },
    {
        id: 24573,
        avatarInitials: 'HB',
        avatarColor: grey[400],
        path: '',
        name: 'Hokma Benjamin',
        address_line: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal_code: '10120',
        date: '10/10/2020',
        birthdate: '02/08/1987',
        restrictions: [],
    },
    {
        id: 24574,
        avatarInitials: 'HB',
        avatarColor: grey[400],
        path: '',
        name: 'Hokma Benjamin',
        address_line: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal_code: '10120',
        date: '10/10/2020',
        birthdate: '02/08/1987',
        restrictions: [],
    },
    {
        id: 24575,
        avatarInitials: 'HB',
        avatarColor: grey[400],
        path: '',
        name: 'Hokma Benjamin',
        address_line: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal_code: '10120',
        date: '10/10/2020',
        birthdate: '02/08/1987',
        restrictions: [],
    },
    {
        id: 24576,
        avatarInitials: 'HB',
        avatarColor: grey[400],
        path: '',
        name: 'Hokma Benjamin',
        address_line: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal_code: '10120',
        date: '10/10/2020',
        birthdate: '02/08/1987',
        restrictions: [],
    },
    {
        id: 34578,
        avatarInitials: 'HB',
        avatarColor: grey[400],
        path: '',
        name: 'Hokma Benjamin',
        address_line: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal_code: '10120',
        date: '10/10/2020',
        birthdate: '02/08/1987',
        restrictions: [],
    },
    {
        id: 24278,
        avatarInitials: 'HB',
        avatarColor: grey[400],
        path: '',
        name: 'Hokma Benjamin',
        address_line: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal_code: '10120',
        date: '10/10/2020',
        birthdate: '02/08/1987',
        restrictions: [],
    },
    {
        id: 24518,
        avatarInitials: 'HB',
        avatarColor: grey[400],
        path: '',
        name: 'Hokma Benjamin',
        address_line: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal_code: '10120',
        date: '10/10/2020',
        birthdate: '02/08/1987',
        restrictions: [],
    },
    {
        id: 24378,
        avatarInitials: 'HB',
        avatarColor: grey[400],
        path: '',
        name: 'Hokma Benjamin',
        address_line: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal_code: '10120',
        date: '10/10/2020',
        birthdate: '02/08/1987',
        restrictions: [],
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

    const deleteRestriction = (userid, restrictionid) => {
        users.filter(user => user.id === userid)[0].restrictions = users.filter(user => user.id === userid)[0].restrictions.filter(res => res.id != restrictionid);
    }

    const addRestriction = (userid, type, desc, date) => {
        users.filter(user => user.id === userid)[0].restrictions.push(
            {id:resId, type:type, assigner:'CurrentUser', startTime:'11/18/2021', endTime:date, desc:desc}
        );
        resId++;
    }

    return (
        <div>
            <Box className={classes.topwrapper} sx={{ margin:'30px 30px'}}>
                <Box className={classes.topright}>
                    <FormGroup>
                        <FormControlLabel onChange={toggleShowRestricted} control={<Checkbox />} label="Show Restricted Only" />
                    </FormGroup>
                </Box>
                <Box className={classes.topright}>
                    <Box>
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
                              <MenuItem value={'address_line'}>Address</MenuItem>
                              <MenuItem value={'gender'}>Gender</MenuItem>
                              <MenuItem value={'postal_code'}>Postal Code</MenuItem>
                              <MenuItem value={'date'}>Join Date</MenuItem>
                              <MenuItem value={'birthdate'}>Birthday</MenuItem>
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
                        <Box sx={{ width: '27%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Users ({(showRestricted ? (users.filter(user => user.name.toUpperCase().includes(search.toUpperCase())).filter(function( obj ) {return obj.restrictions.length > 0;})).length : users.filter(user => user.name.toUpperCase().includes(search.toUpperCase())).length)})</Typography>
                        </Box>
                        <Box sx={{ width: '20%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Address</Typography>
                        </Box>
                        <Box sx={{ width: '10%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Gender</Typography>
                        </Box>
                        <Box sx={{ width: '10%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Postal</Typography>
                        </Box>
                        <Box sx={{ width: '14%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Joined Date</Typography>
                        </Box>
                        <Box sx={{ width: '13%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Birth Date</Typography>
                        </Box>
                        <Box sx={{ width: '10%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Status</Typography>
                        </Box>
                    </Box>
                    </CardContent>
                </Card>
            <List>
                <Card variant="outlined" sx={cardStyle}>
                    <CardContent>
                        {
                        (showRestricted ? 
                            (users.filter(user => user.name.toUpperCase().includes(search.toUpperCase())).sort((a,b) => { return (a[sortBy] > b[sortBy]) ? (sortOrder ? -1 : 1) : (sortOrder ? 1 : -1) ; }))
                            .filter(function( obj ) {
                                return obj.restrictions.length > 0;
                            })
                            : (users.filter(user => user.name.toUpperCase().includes(search.toUpperCase())).sort((a,b) => { return (a[sortBy] > b[sortBy]) ? (sortOrder ? -1 : 1) : (sortOrder ? 1 : -1) ; }))
                        ).slice((page -1)  * 10, (page - 1) * 10 + 10)
                        .map((key) => (
                            <li key={key.id.toString()}>
                                <div style={{ display:'flex', justifyContent:'center' }}>
                                    <UserCard user={key} deleteRestriction={deleteRestriction} addRestriction={addRestriction}/>
                                </div>
                            </li>
                        ))}
                    </CardContent>
                </Card>
            </List>
            </Card>
            <CardContent>
                <div style={{ display:'flex', justifyContent:'center' }}>
                    <Pagination count={Math.ceil(((showRestricted ? (users.filter(user => user.name.toUpperCase().includes(search.toUpperCase())).filter(function( obj ) {return obj.restrictions.length > 0;})).length : users.filter(user => user.name.toUpperCase().includes(search.toUpperCase())).length))/10)} showFirstButton showLastButton color="primary" shape="rounded" onChange={handlePagination}/>
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
