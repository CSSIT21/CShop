import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import CoinPic from '~/common/assets/images/coinpic.png';
import { Link } from 'react-router-dom';

const CoinHistoryPage = (coinhistory) => {
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
            <img src={CoinPic} alt="pic" style={{ height: "60px", width: "60px", alignItem: "center" ,marginTop:"5px"}} />
            <Box className={classes.cointext}>1.11</Box>
            <Box className={classes.cointext}><Link to="/coin" > ></Link></Box>
            </Box>

            <Box className={classes.headerexpire}>
            <Box className={classes.cointext2}>code expire: 31/01/2022</Box>
            </Box>

            <Box className={classes.codeField}>

                <Box className={classes.coinbox}>

                    <Box sx={{ width: '1080px', alignItem: "center", height: "480px" }}>
                        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="All History" sx={{ width: "360px" }}{...a11yProps(0)} />
                                <Tab label="Earned" sx={{ width: "360px" }}{...a11yProps(1)} />
                                <Tab label="Used" sx={{ width: "360px" }}{...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            Item One
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
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
        width: "auto",
        height: "105vh",
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
        display: "flex",
        flexDirection: "column",
        width: "1080px",
        borderRadius: "10px",
        height: "530px",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingBottom: "100px"
    },
    cointext: {
        Color: "black",
        marginLeft: "18px",
        fontSize: "50px",
        fontWeight:"450"
    },
    cointext2: {
        color:"#A0A3BD",
        marginLeft: "18px",
        fontSize: "16px",
        alignItem:"center",
        justifyContent:"center"
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
