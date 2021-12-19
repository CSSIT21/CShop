import React from 'react';
import LazyImage from "../../common/components/LazyImage/LazyImage";
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import OrderSummarize from '../components/OrderSummerize';
import { Button, ButtonBase, ButtonGroup, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import CButton from '../../common/components/CButton';

const useStyles = makeStyles({
    
    BoxLeft: {
        width: "30%",
        position: "absolute",
        margin: "30px 150px 0px 150px"
    },
    sizeQr: {
        width: "300px",
        height: "300px",
        marginLeft: "30%",
        marginTop: "-10px"
    },
    BoxRight: {
        width: "50%",
        display: "inline-block",
        border: "1px solid #ccc",
        margin: "30px 0px 0px 600px",
        paddingBottom: "30px"
      },
      boxDetail: {
        width: "100%",
        padding: "10px 20px 10px 20px",
        textAlign: "center",
        alignItems: "center",
      },
      boxHead: {
        width: "100%",
        padding: "10px 20px 10px 20px",
        justifyContent: "left",
        alignItems: "left",
        fontWeight: "bolder",
        background: "#ccc",
      },
      
})
const qrCode = "0002010102123032011563959634889012902091234678325204701153037645406100.005802TH5905CShop6007BANGKOK62340523202111151028050140000000703CMQ630447C0";


const [Qr, setQr] = useState(0)
const getData = () => {
    axios
     .get(`${config.SERVER_URL}/qrcode`)
     .then(({data}) => {
      if (data.success) {
       return setQr(data.rawQr);
      }
      else {
       return console.log(data);
      }
     })
     .catch((err) => {
      return console.log(err.message);
     })
   };
  
   useEffect(() => {
    getData();
   }, [])

const PaidByQr = () => {
    const classes = useStyles();
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(5);

    function updateTime() {
    if (minutes == 0 && seconds == 0) {
        setSeconds(0);
        setMinutes(5);
        //set time out qr not valid 
        //click to be defualt state
    } else {
        if (seconds == 0) {
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
        } else {
        setSeconds((seconds) => seconds - 1);
        }
    }
    }

    useEffect(() => {
    const token = setTimeout(updateTime, 1000);

    return function cleanUp() {
        clearTimeout(token);
    };
    });

    const today = new Date();
    const min = today.getMinutes() + 5 ;
    const time = today.getHours() + ':' + ('0'+min).slice(-2) ;
    
    
    return (
        <Box>
            <Box className={classes.BoxLeft}>
                <OrderSummarize/>
            </Box>
            <Box className={classes.BoxRight}>
                <Box className={classes.boxHead}>
                    <Typography>Qrcode</Typography>
                </Box>
                <Box className={classes.boxDetail}>
                    <Typography>Please, capture the screen below</Typography>
                    <Typography>scan and pay via your mobile banking application</Typography>
                </Box>
                <Box className = {classes.sizeQr}>
                    {qrCode.length > 1 ? (
                        <LazyImage src={`https://chart.googleapis.com/chart?cht=qr&chs=512x512&chl=${Qr}`}/>
                    ) : null}
                </Box>
                <Box className={classes.boxDetail}>
                    <Typography>QRcode valid until {time} </Typography>
                    <Typography marginBottom={2}>time remaining {minutes} minutes {seconds} seconds</Typography>
                    <CButton title="generate new qr" height="38px"/>
                </Box>
            </Box>
        </Box> 
    )
}

export default PaidByQr;
