import Paper from '@mui/material/Paper';
import { Button, Typography } from "@mui/material";
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
import { Fragment, useEffect, useState, useLayoutEffect } from "react";
import config from '../../common/constants';
import AuditCard from "../components/AuditCard";
import { Search } from '@mui/icons-material';
import { grey, red, orange } from '@mui/material/colors';
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


/*let audits = [
    {
        id: 1110,
        admin_id: 1,
        login_date: '2021-12-20 23:02:20.154000',
        action: 'TEST'
    },
    {
        id: 1110,
        admin_id: 2,
        login_date: '2021-11-30 23:02:20.154000',
        action: 'TEST2'
    },
    {
        id: 1,
        admin_id: 3,
        login_date: '2021-10-20 23:02:20.154000',
        action: 'TEST3 TEST3 TEST3, TEST3 TEST3 TEST3 TEST3 TEST3TEST3 TEST3 ,TEST3TEST3'
    },
];*/

const ManageAccountPage = () => {
    const classes = useStyles();
    
    const [audits, setAuditList] = useState([]);
    const setAudits = async () => {
        const fetchedData = await axios.get(
            config.SERVER_URL + "/manageaccount/audit"
        );
        setAuditList(fetchedData.data);
      };

    const [page, setPage] = useState(1);
    const handlePagination = (event) => {
        setPage(event.target.textContent);
    }
    
    useEffect(()=>{
        setAudits();
    }, [])

    return (
        <div>
            <Box className={classes.topwrapper} sx={{ margin:'30px 30px'}}>
            </Box>
            <Card variant="outlined" sx={{cardStyle}} sx={{ margin:'0px 45px'}}>
                <Card variant="outlined" style={{
                    backgroundColor: "#FDF4DD",
                    border: 'none',
                    margin: '25px',
                    marginBottom: '0px'}}>
                    <CardContent sx={{ padding: '15px', paddingBottom: '15px!important'}}>
                    <Box className={classes.header}>
                        <Box sx={{ width: '12%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Admin ID</Typography>
                        </Box>
                        <Box sx={{ width: '22%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Admin Name</Typography>
                        </Box>
                        <Box sx={{ width: '12%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }}>Time</Typography>
                        </Box>
                        <Box sx={{ width: '40%' }} className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: '15px' }} sx={{ marginLeft: '65%' }}>Log</Typography>
                        </Box>
                    </Box>
                    </CardContent>
                </Card>
            <List>
                <Card variant="outlined" sx={{cardStyle}}>
                    <CardContent>
                        {
                        audits.reverse().slice((page -1)  * 10, (page - 1) * 10 + 10)
                        .map((key) => (
                            <li key={key.id.toString()}>
                                <div style={{ display:'flex', justifyContent:'center' }}>
                                    <AuditCard audit={key}/>
                                </div>
                            </li>
                        ))}
                    </CardContent>
                </Card>
            </List>
            </Card>
            <CardContent>
                <div style={{ display:'flex', justifyContent:'center' }}>
                    {
                        audits.length > 0 ?
                        <Pagination count={Math.ceil((audits.length)/10)} showFirstButton showLastButton color="primary" shape="rounded" onChange={handlePagination}/>:
                        <Pagination count={1}/>
                    }
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
