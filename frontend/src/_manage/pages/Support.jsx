import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { List } from "@mui/material";
import { For } from "~/common/utils/index";
import { styled } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material'
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import SupportMedia from "../components/SupportMedia";

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

const ManageSellerAccountPage = () => {
    const classes = useStyles();
    const [type, setType] = React.useState('');
    const setTicketType = (event) => {
        setType(event.target.value);
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

    const [picture, setPicture] = React.useState({title: 'fake support picture',
    image: "https://via.placeholder.com/410x360"});

    return (
        <Box sx={{ margin: '25px 0px' }}>
            <Card variant="outlined" style={{
                    backgroundColor: "rgba(239, 239, 241, 0.7)",
                    border: 'none',
                    margin: '40px 75px',
                    marginBottom: '0px'}}>
                <CardContent>
                    <Box sx={{ display:'flex', justifyContent:'center', margin:'20px'}}>
                        <Typography style={{ fontWeight: 700, fontSize: '40px' }} color="primary">File a Support Ticket</Typography>
                    </Box>
                    <Box sx={{ display:'flex', justifyContent:'left', marginLeft:'12%'}}>
                        <Typography style={{ fontWeight: 600, fontSize: '23px' }} color="primary">Problem Type</Typography>
                    </Box>
                    <Box sx={{ display:'flex', justifyContent:'space-between', width: '80%', marginLeft: '9.5%'}}>
                        <FormControl sx={{ m: '20px' }}>
                            <InputLabel id="ticket-label" sx={{ top: '-5px' }}>Problem Type</InputLabel>
                            <Select
                              labelId="ticket-label"
                              label="Problem Type"
                              id="ticket-id"
                              value={type}
                              className={classes.root}
                              onChange={setTicketType}
                            >
                              <MenuItem value={'user'}>User Report</MenuItem>
                              <MenuItem value={'seller'}>Seller Report</MenuItem>
                              <MenuItem value={'bug'}>Bug Report</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '40%' }}>
                            <TextField
                                align="center"
                                margin="dense"
                                label="What are you reporting?"
                                id="target"
                                fullWidth
                                placeholder="e.g., RudeUser, ScamSeller, Shop Bug..."
                                variant="outlined"
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display:'flex', justifyContent:'left', marginLeft:'12%'}}>
                        <Typography style={{ fontWeight: 600, fontSize: '23px' }} color="primary">Description</Typography>
                    </Box>
                    <Box sx={{display:'flex', justifyContent:'center', margin:'7px 15px'}}>
                        <TextField
                            align="center"
                            margin="dense"
                            id="desc"
                            multiline
                            fullWidth
                            rows={8}
                            placeholder="Describe your report"
                            variant="outlined"
                            sx={{width:'80%!important'}}
                        />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Box sx={{width:'25%', display:'flex', flexDirection: 'column', justifyContent: 'center', margin:'2.2% 10%'}}>
                            <SupportMedia image={picture.image} title={picture.title} />
                            <Box sx={{ margin:'15px 0px' }}>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    fullWidth
                                >
                                    Upload Picture
                                <input
                                    type="file"
                                    hidden
                                />
                                </Button>
                            </Box>
                        </Box>
                        <Box sx={{width: '20%', display:'flex', alignItems:'flex-end', margin: '27.5px'}}>
                            <Button variant="contained" size="large" sx={{margin:"10px"}}>Submit Ticket</Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
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
