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
import UserCard from "../components/UserCard";
import { Search } from '@mui/icons-material';
import { grey, red, amber, orange, pink, deepPurple, blue } from '@mui/material/colors';
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

let users = [
    {
        id: 24578,
        avatarInitials: 'HB',
        avatarColor: grey[400],
        name: 'Hokma Benjamin',
        address: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal: '10120',
        joinDate: '10/10/2020',
        birthDate: '02/08/1987',
        status: 'Restricted',
        restrictions: [
            {id:1, type:'Comment Restriction', assigner:'Admin007', startTime:'10/10/2020', endTime:'17/10/2020', desc:'Rude Comment'},
            {id:2, type:'Transaction Restriction', assigner:'muumel', startTime:'10/10/2020', endTime:'10/11/2020', desc:'Unexpected Chargeback'},
            {id:3, type:'Terms of Service Violation, Pretty much a War Crime', assigner:'IHateAyinSoMuchYouDontEvenKnow', startTime:'10/10/2020', endTime:'31/12/2999', desc:'Collaborated with Lady Dias, Leader of the Udjats to start the Smoke War, toppling the previous L Corp to establish Lobotomy Corporation'},
          ]
    },
    {
        id: 10695,
        avatarInitials: 'TA',
        avatarColor: amber[400],
        name: 'Lisa Tiphereth',
        address: 'Nest of former L Corp, District 12, The City',
        gender: 'Female',
        postal: '10120',
        joinDate: '02/03/2019',
        birthDate: '11/11/2004',
        status: 'Active',
        restrictions: [
          ]
    },
    {
        id: 10696,
        avatarInitials: 'TB',
        avatarColor: orange[400],
        name: 'Enoch Tiphereth',
        address: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal: '10120',
        joinDate: '02/03/2019',
        birthDate: '28/07/2004',
        status: 'Restricted',
        restrictions: [
            {id:10, type:'Full Restriction', assigner:'Admin007', startTime:'12/09/2014', endTime:'31/12/2999', desc:'Carmen is a coward'}
          ]
    },
    {
        id: 31237,
        avatarInitials: 'GB',
        avatarColor: red[500],
        name: 'Kali "The Red Mist" Gebura',
        address: 'Nest of former L Corp, District 12, The City',
        gender: 'Female',
        postal: '10120',
        joinDate: '12/01/2020',
        birthDate: '31/08/1998',
        status: 'Active',
        restrictions: [
          ]
    },
    {
        id: 64531,
        avatarInitials: 'CC',
        avatarColor: grey[700],
        name: 'Captain Catt',
        address: 'Wonderlab Branch, District 21, The City',
        gender: 'Female',
        postal: '10172',
        joinDate: '01/01/2021',
        birthDate: '13/03/2000',
        status: 'Active',
        restrictions: [
          ]
    },
    {
        id: 85411,
        avatarInitials: 'TA',
        avatarColor: pink[300],
        name: 'Taii',
        address: 'Wonderlab Branch, District 21, The City',
        gender: 'N/A',
        postal: '10172',
        joinDate: '12/9/2021',
        birthDate: '14/02/2001',
        status: 'Active',
        restrictions: [
          ]
    },
    {
        id: 12374,
        avatarInitials: 'EM',
        avatarColor: orange[800],
        name: 'Elijah Malkuth',
        address: 'Nest of former L Corp, District 12, The City',
        gender: 'Female',
        postal: '10120',
        joinDate: '08/11/2018',
        birthDate: '03/12/1998',
        status: 'Active',
        restrictions: [
          ]
    },
    {
        id: 25487,
        avatarInitials: 'YE',
        avatarColor: deepPurple[400],
        name: 'Gabriel Yesod',
        address: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal: '10120',
        joinDate: '06/02/2015',
        birthDate: '11/07/1996',
        status: 'Active',
        restrictions: [
          ]
    },
    {
        id: 31238,
        avatarInitials: 'CH',
        avatarColor: blue[500],
        name: 'Daniel Chesed',
        address: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal: '10120',
        joinDate: '21/08/2017',
        birthDate: '03/12/1992',
        status: 'Active',
        restrictions: [
          ]
    },
    {
        id: 97112,
        avatarInitials: 'OF',
        avatarColor: grey[900],
        name: 'Roland "The Black Slience"',
        address: 'Nest of former L Corp, District 12, The City',
        gender: 'Male',
        postal: '10120',
        joinDate: '10/11/2021',
        birthDate: '09/10/1992',
        status: 'Active',
        restrictions: [
          ]
    },
];

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
                              <MenuItem value={'address'}>Address</MenuItem>
                              <MenuItem value={'gender'}>Gender</MenuItem>
                              <MenuItem value={'postal'}>Postal Code</MenuItem>
                              <MenuItem value={'joinDate'}>Join Date</MenuItem>
                              <MenuItem value={'birthDate'}>Birthday</MenuItem>
                              <MenuItem value={'status'}>Status</MenuItem>
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
                        <Box sx={{ width: '27%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Users</Typography>
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
                            (users.sort((a,b) => { return (a[sortBy] > b[sortBy]) ? (sortOrder ? -1 : 1) : (sortOrder ? 1 : -1) ; }))
                            .filter(function( obj ) {
                                return obj.status == 'Restricted';
                            })
                            : (users.sort((a,b) => { return (a[sortBy] > b[sortBy]) ? (sortOrder ? -1 : 1) : (sortOrder ? 1 : -1) ; }))
                        )
                        .map((key) => (
                            <li key={key.id.toString()}>
                                <div style={{ display:'flex', justifyContent:'center' }}>
                                    <UserCard user={key}/>
                                </div>
                            </li>
                        ))}
                    </CardContent>
                </Card>
            </List>
            </Card>
            <CardContent>      
                <div style={{ display:'flex', justifyContent:'center' }}>
                    <Pagination count={10} showFirstButton showLastButton color="primary" shape="rounded"/>
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
