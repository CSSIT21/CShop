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
import React, { useEffect } from "react";
import config from '../../common/constants';
import UserCard from "../components/UserCard";
import { Search } from '@mui/icons-material';
import { Button } from '@mui/material';
import axios from "axios";
import authState from '../../common/store/authState';
import { useRecoilValue } from "recoil";

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

/*let users = [
    {
        id: 24578,
        path: '',
        customer_info:{
            firstname: 'Hokma',
            lastname: 'Benjamin',
            gender: 'Male',
            birthdate: '02/08/1987',
        },
        customer_address:{
            address_line: 'Nest of former L Corp, District 12, The City',
            postal_code: '10120',
        },
        date: '10/10/2020',
        admin_customer_suspensions: 
        {
            suspension_type_id: 1,
            admin_id: 1,
            start_date: '15/05/2020',
            end_date: '15/05/2020',
            description: 'Test'
        },
    },
];*/

let resId = 1000;

const ManageAccountPage = () => {
    const classes = useStyles();

    const [users, setUsersList] = React.useState([]);
    const setUsers = async () => {
        const fetchedData = await axios.get(
            config.SERVER_URL + "/manageaccount/users"
        );
        fetchedData.data.forEach((u) => {u["name"] = u.customer_info.firstname + " " + u.customer_info.lastname; u["gender"] = u.customer_info.gender; u["birthdate"] = u.customer_info.birthdate})
        setUsersList(fetchedData.data);
      };

    const [sortBy, setSortBy] = React.useState('');
    const setSort = (event) => {
        setSortBy(event.target.value);
        console.log(sortBy);
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

    const deleteRestriction = async (userid) => {
        const res = await axios.post(
            config.SERVER_URL + "/manageaccount/suspension/users/delete?id=" + userid
          );

        const fetchedData = await axios.get(
            config.SERVER_URL + "/manageaccount/users/id?id=" + userid
        );

        await axios.post(
            config.SERVER_URL + "/manageaccount/audit/create?id=" + auth.user.id + "&log=" + 'Removed suspension from ' + fetchedData.data.customer_info.firstname + " " + fetchedData.data.customer_info.lastname
        );
        
        document.location.reload();
    }

    useEffect(async ()=>{
        setUsers();
    }, [])

    const auth = useRecoilValue(authState);

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
                              <MenuItem value={'gender'}>Gender</MenuItem>
                              <MenuItem value={'date'}>Join Date</MenuItem>
                              <MenuItem value={'birthdate'}>Birthday</MenuItem>
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
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Users ({(showRestricted ? (users.filter(user => (user.customer_info.firstname + " " + user.customer_info.lastname).toUpperCase().includes(search.toUpperCase())).filter(function( obj ) {return obj.admin_customer_suspensions != null;})).length : users.filter(user => (user.customer_info.firstname + " " + user.customer_info.lastname).toUpperCase().includes(search.toUpperCase())).length)})</Typography>
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
                            (users.filter(user => (user.customer_info.firstname + " " + user.customer_info.lastname).toUpperCase().includes(search.toUpperCase())).sort((a,b) => {return (a[sortBy] > b[sortBy]) ? (sortOrder ? -1 : 1) : (sortOrder ? 1 : -1) ; }))
                            .filter(function( obj ) {
                                return obj.admin_customer_suspensions != null;
                            })
                            : (users.filter(user => (user.customer_info.firstname + " " + user.customer_info.lastname).toUpperCase().includes(search.toUpperCase())).sort((a,b) => { return (a[sortBy] > b[sortBy]) ? (sortOrder ? -1 : 1) : (sortOrder ? 1 : -1) ; }))
                        ).slice((page -1)  * 10, (page - 1) * 10 + 10)
                        .map((key) => (
                            <li key={key.id.toString()}>
                                <div style={{ display:'flex', justifyContent:'center' }}>
                                    <UserCard user={key} deleteRestriction={deleteRestriction} auth={auth}/>
                                </div>
                            </li>
                        ))}
                    </CardContent>
                </Card>
            </List>
            </Card>
            <CardContent>
                <div style={{ display:'flex', justifyContent:'center' }}>
                    <Pagination count={Math.ceil(((showRestricted ? (users.filter(user => (user.customer_info.firstname + " " + user.customer_info.lastname).toUpperCase().includes(search.toUpperCase())).filter(function( obj ) {return obj.admin_customer_suspensions != null;})).length : users.filter(user => (user.customer_info.firstname + " " + user.customer_info.lastname).toUpperCase().includes(search.toUpperCase())).length))/10)} showFirstButton showLastButton color="primary" shape="rounded" onChange={handlePagination}/>
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
