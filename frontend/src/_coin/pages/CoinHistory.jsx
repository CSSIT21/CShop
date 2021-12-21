import { useState, useEffect } from "react";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import CoinPic from '~/common/assets/images/coinpic.png';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import zIndex from '@mui/material/styles/zIndex';

import config from "~/common/constants";
import axios from "axios";

function createData(info, expire, coins) {
    return { info, expire, coins };
}

// const rows = [
//     createData('Login Reward', '20/3/2022', '10'),
//     createData('Used coins', '21/4/2022', '20'),
//     createData('Login Reward', '30/4/2022', '30'),
//     createData('Earned coins', '23/4/2022', '40'),
//     createData('Used coins', '4/4/2022', '50'),
//     createData('Login Reward', '20/3/2022', '10'),
//     createData('Used coins', '21/4/2022', '20'),
//     createData('Login Reward', '30/4/2022', '30'),
//     createData('Earned coins', '23/4/2022', '40'),
//     createData('Used coins', '4/4/2022', '50'),
// ];


const CoinHistoryPage = (coinhistory) => {
    const [coin,setCoin] = useState()

    const [array,setTheArray] = useState([])
    const [used,setUsed] = useState([])
    const [earned,setEarned] = useState([])


    // this.setState( prevState => ({
    //     userFavorites: [{id: 3, title: 'C'}, ...prevState.userFavourites]
    //  }));
    const fetchCoin= async ()=>{
        try {
            const coin = await axios.post(`${config.SERVER_URL}/coin/checkin`,{
                userId:1
            })
            setCoin(coin.data.ckeckin_coin[0].total_coin)
        } catch (e) {
            console.log(e)
        }
    }

   
    

    const fetchCoinTable= async ()=>{
        try {
            const history = await axios.get(`${config.SERVER_URL}/coin/showallcoin`,{
                userId:1
            })
            // console.log(history.data.recieve)
            const usedcoin = history.data.used.map((el)=>(createData(el.user_for,el.used_time,el.used_amount)))
            setUsed(usedcoin)
            
            const earnedcoin = history.data.recieve.map((el)=>(createData(el.get_from,el.got_date,el.amount)))
            setEarned(earnedcoin)
            
            setTheArray(usedcoin)
            setTheArray(usedcoin => [...usedcoin, ...earnedcoin])
    
           

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        fetchCoin()
        fetchCoinTable()
    },[])

    const classes = useStyles();

    function TabPanel(props) {
        const { children, value, index, ...other } = props;


        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className={classes.background}>
            <Box className={classes.header}>
                <Box className={classes.header2}> My</Box>
                <Box className={classes.header1}> CS</Box>
                <Box className={classes.header2}> Coin</Box>
            </Box>

            <Box className={classes.headercoin}>
                <img src={CoinPic} alt="pic" style={{ height: "60px", width: "60px", alignItem: "center", marginTop: "5px" }} />
                <Box className={classes.cointext}>{coin}</Box>
                <Box className={classes.cointext}><Link to="/coin" > ></Link></Box>
            </Box>

            <Box className={classes.headerexpire}>
                <Box className={classes.cointext2}>code expire: 31/01/2022</Box>
            </Box>

            <Box className={classes.codeField}>
                <Box sx={{ width: '1082.5px', alignItem: "center", height: "490px", position: "sticky", backgroundColor: "white", borderRadius: "10px" }}>
                    <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="All History" sx={{ width: "360px", fontSize: "13px" }}{...a11yProps(0)} />
                            <Tab label="Earned" sx={{ width: "360px", fontSize: "13px" }}{...a11yProps(1)} />
                            <Tab label="Used" sx={{ width: "360px", fontSize: "13px" }}{...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <Box className={classes.coinbox}>


                        <TabPanel value={value} index={0}>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableBody>
                                        {array.map((row) => (
                                            <TableRow
                                                key={row.info}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >

                                                <TableCell component="th" scope="row"  >

                                                    <Box sx={{ display: "flex", flexDirection: "colomn", fontSize: "15px", fontWeight: "500", }}>
                                                        <img src={CoinPic} alt="pic" style={{ height: "50px", width: "50px", marginLeft: "20px", marginRight: "15px" }} />
                                                        {row.info}<br></br>

                                                        {row.expire}</Box>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Box sx={{ marginRight: "30px", fontSize: "20px", color: "#FD6637", fontWeight: "500" }}>{row.coins}</Box></TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableBody>
                                        {earned.map((row) => (
                                            <TableRow
                                                key={row.info}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >

                                                <TableCell component="th" scope="row"  >

                                                    <Box sx={{ display: "flex", flexDirection: "colomn", fontSize: "15px", fontWeight: "500", }}>
                                                        <img src={CoinPic} alt="pic" style={{ height: "50px", width: "50px", marginLeft: "20px", marginRight: "15px" }} />
                                                        {row.info}<br></br>

                                                        {row.expire}</Box>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Box sx={{ marginRight: "30px", fontSize: "20px", color: "#FD6637", fontWeight: "500" }}>+{row.coins}</Box></TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>


                        <TabPanel value={value} index={2}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableBody>
                                        {used.map((row) => (
                                            <TableRow
                                                key={row.info}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >

                                                <TableCell component="th" scope="row"  >

                                                    <Box sx={{ display: "flex", flexDirection: "colomn", fontSize: "15px", fontWeight: "500", }}>
                                                        <img src={CoinPic} alt="pic" style={{ height: "50px", width: "50px", marginLeft: "20px", marginRight: "15px" }} />
                                                        {row.info}<br></br>

                                                        {row.expire}</Box>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Box sx={{ marginRight: "30px", fontSize: "20px", color: "#FD6637", fontWeight: "500" }}>-{row.coins}</Box></TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                    </Box>


                </Box>
            </Box>
        </Box>
    );
};

const useStyles = makeStyles({
    background: {
        backgroundColor: "#F2F2F4",
        width: "100%",
        height: "150vh",
        paddingTop: "50px",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "100px"
    },
    headercoin: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "15px"
    },
    headerexpire: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "50px"
    },
    header1: {
        display: "flex",
        fontWeight: "550",
        fontSize: "50px",
        color: " #FD6637",
        marginLeft: "15px"
    },
    header2: {
        display: "flex",
        fontWeight: "550",
        fontSize: "50px",
        color: "black",
    },
    coinbox: {
        backgroundColor: "white",
        overflow: "scroll",
        overflowX: "visible",
        display: "flex",
        flexDirection: "column",
        width: "1100px",
        borderRadius: "10px",
        height: "530px",
    },
    cointext: {
        Color: "black",
        marginLeft: "18px",
        fontSize: "50px",
        fontWeight: "450"
    },
    cointext2: {
        color: "#A0A3BD",
        marginLeft: "18px",
        fontSize: "16px",
        alignItem: "center",
        justifyContent: "center"
    },
    codeField: {
        backgroundColor: "#F2F2F4",
        height: "100px",
        width: "100%",
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
    },
});
export default CoinHistoryPage;
