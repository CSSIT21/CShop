import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { List } from "@mui/material";
import { For } from "~/common/utils/index";
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
import { FormHelperText } from '@mui/material';
import { InputAdornment } from '@mui/material';
import CButton from "../../common/components/CButton";
import React, { Fragment, useEffect, useLayoutEffect } from "react";
import UserCard from "../components/UserCard";
import { Search } from '@mui/icons-material';

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

let users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ManageAccountPage = () => {
    const classes = useStyles();
    const [sortBy, setSortBy] = React.useState('');
    const handleChange = (event) => {
        setSortBy(event.target.value);
      };

    useLayoutEffect(() => {
        document.body.classList.add("gray");
        return () => {document.body.classList.remove("gray")};
      }, []);

    return (
        <div>
            <Box className={classes.topwrapper}>
                <Box className={classes.topright}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Show Restricted Only" />
                    </FormGroup>
                </Box>
                <Box className={classes.topright}>
                    <Box sx={{ margin: '10px'}}>
                        <TextField
                        className={classes.root2}
                        id="search-field"
                        label="Search"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <Search/>
                            </InputAdornment>
                            ),
                        }}
                        variant="filled"
                        />
                    </Box>
                    <Box sx={{ marginTop: '25px' }}>
                        <FormControl sx={{ m: 1, left: '140px'}}>
                            <InputLabel id="sort-by-select-label" sx={{ top: '-5px' }}>Sort By</InputLabel>
                            <Select
                              labelId="sort-by-label"
                              id="sort-by"
                              value={sortBy}
                              label="Sort By"
                              className={classes.root}
                              onChange={handleChange}
                            >
                              <MenuItem value={10}>Name</MenuItem>
                              <MenuItem value={20}>Address</MenuItem>
                              <MenuItem value={30}>Postal Code</MenuItem>
                              <MenuItem value={40}>Join Date</MenuItem>
                              <MenuItem value={50}>Birthday</MenuItem>
                              <MenuItem value={60}>User Status</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            <List>
                <Card variant="outlined" sx={cardStyle}>
                    <CardContent>
                        {users.map((key) => (
                            <li key={key.toString()}>
                                <div style={{ display:'flex', justifyContent:'center' }}>
                                    <UserCard/>
                                </div>
                            </li>
                        ))}
                    </CardContent>
                </Card>
            </List>
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
        width: "350px",
        height: "40px"
    },
});

export default ManageAccountPage;
