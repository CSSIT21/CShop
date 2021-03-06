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
import { Fragment, useEffect, useState, useLayoutEffect } from "react";
import SupportMedia from "../components/SupportMedia";
import axios from "axios";
import authState from '../../common/store/authState';
import { useRecoilValue } from "recoil";
import configC from '../../common/constants';

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
    const [type, setType] = useState(0);
    const setTicketType = (event) => {
        setType(event.target.value);
      };

    const [desc, setDesc] = useState('');
    const setDescription = (event) => {
          setDesc(event.target.value);
        };

    const [title, setTitle] = useState('');
    const setTicketTitle = (event) => {
            setTitle(event.target.value);
        };

    const [target, setTarget] = useState('');
    const setTicketTarget = (event) => {
            setTarget(event.target.value);
        };

    const [picture, setPicture] = useState("https://via.placeholder.com/410x360");
    const setPictureUpload = (event) => {
        console.log(event.target.value);
        setPicture(event.target.value);
      };

    const [picture64, setPicture64] = useState('');
    const setPictureUpload64 = (ba) => {
        setPicture64(ba);
      };

    const [submitstatus, setStatus] = useState('');
    const setSubmitStatus = (sa) => {
        setStatus(sa);
      };

    const config = {
        headers: { Authorization: `Bearer abcd1234cs21` }
    };

    const bodyParameters = {
        "payload": picture64,
	    "mime": "png"
     };

    const submitTicket = async () => {
        const res = await axios.post(
            "https://drive.cshop.cscms.ml/api/upload/base64",
            bodyParameters,
            config
          );
          const path = res.data.original_link;
          if(res != null){
          const res = await axios.post(
              configC.SERVER_URL + "/manageaccount/tickets/create",
            {
                "title":title,
                "description":desc,
                "target":target,
                "admin_id":1111,
                "customer_id":auth.user.id,
                "support_type_id":type,
                "day": 1,
                "month": 1,
                "year": 1,
                "path":path
            }
          );
          if(res){
              setSubmitStatus('Ticket Submitted!');
          }
          else{
            setSubmitStatus('Ticket Submission Failed! Try Again Later.');
          }
        }
    };

    const onImageChange = (event) => {
        setPicture(URL.createObjectURL(event.target.files[0]));
        encodeImageFileAsURL(event.target);
    }

    const auth = useRecoilValue(authState);

    function encodeImageFileAsURL(element) {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
          setPictureUpload64(reader.result.split(",")[1])
        }
        reader.readAsDataURL(file);
      }

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
                              <MenuItem value={0}>Select Type</MenuItem>
                              <MenuItem value={1}>User Report</MenuItem>
                              <MenuItem value={2}>Seller Report</MenuItem>
                              <MenuItem value={3}>Bug Report</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '40%' }}>
                            <TextField
                                align="center"
                                margin="dense"
                                label="What are you reporting?"
                                id="target"
                                fullWidth
                                placeholder="e.g., RudeUser145, ScamSeller495, Shop Bug..."
                                variant="outlined"
                                onChange={setTicketTarget}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display:'flex', justifyContent:'left', marginLeft:'12%'}}>
                        <Typography style={{ fontWeight: 600, fontSize: '23px' }} color="primary">Title</Typography>
                    </Box>
                    <Box sx={{display:'flex', justifyContent:'center', margin:'7px 15px'}}>
                        <TextField
                            align="center"
                            margin="dense"
                            id="desc"
                            fullWidth
                            onChange={setTicketTitle}
                            placeholder="Set your ticket's title"
                            variant="outlined"
                            sx={{width:'80%!important'}}
                        />
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
                            onChange={setDescription}
                            placeholder="Describe your report"
                            variant="outlined"
                            sx={{width:'80%!important'}}
                        />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Box sx={{width:'25%', display:'flex', flexDirection: 'column', justifyContent: 'center', margin:'2.2% 10%'}}>
                            <SupportMedia image={picture} title={picture.title} />
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
                                    onChange={onImageChange}
                                />
                                </Button>
                            </Box>
                        </Box>
                        <Box sx={{width: '20%', display:'flex', alignItems:'flex-end', margin: '27.5px'}}>
                            <Button variant="contained" size="large" sx={{margin:"10px"}} onClick={submitTicket}>Submit Ticket</Button>
                        </Box>
                    </Box>
                </CardContent>
                    <Box sx={{display:'flex', justifyContent:'center', margin:'15px'}}>
                        <Typography style={{ fontWeight: 600, fontSize: '32px' }} color="primary">{submitstatus}</Typography>
                    </Box>
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
