
import LazyImage from "../../common/components/LazyImage/LazyImage";
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import Axios from 'axios';
import config from "~/common/constants";
import OrderSummarize from '../components/OrderSummerize';
import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CButton from '../../common/components/CButton';
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'


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




const PaidByQr = () => {
    const classes = useStyles();
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(5);
    const [display, setDisplay] = useState("none")
    const [qrCode, setQrCode] = useState("");

    const { search } = useLocation()
    const { orderId } = queryString.parse(search)
    const order_id = { "orderId" : parseInt(orderId) };
    

    useEffect(() => {
        getQr(); 
    },[])
    

    const getQr = () => {
        Axios.post(`${config.SERVER_URL}/payment/qrcode`, order_id).then(({ data }) => {
        console.log(data);
        if (data.success) {
                setQrCode(data.rawQr)
            } 
        }).catch((err) => {return Promise.reject(err)})
    }

    const getStatus = () => {
        Axios.get(`${config.SERVER_URL}/payment/status`).then((res) => {
            console.log(res.data);
            if (res.data.success === true) {
                
                return window.location.href =`http://localhost:3000/payment/success`
            }
        })
    }
    

    

    function updateTime() {
    if (minutes === 0 && seconds === 0) {
        setSeconds(0);
        setMinutes(5);
        setDisplay("")
        //set time out qr not valid 
        //click to be defualt state
    } else {
        if (seconds === 0) {
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
            {getStatus()}
            <Box className={classes.BoxLeft}>
                <OrderSummarize order_id={238}/>
            </Box>
            <Box className={classes.BoxRight}>
                <Box className={classes.boxHead}>
                    <Typography>Qrcode</Typography>
                </Box>
                <Box className={classes.boxDetail}>
                    <Typography>Please, capture the screen below</Typography>
                    <Typography>scan and pay via your mobile banking application</Typography>
                </Box>
                <Box className={classes.sizeQr}>
                    {qrCode.length > 1 ? (
                        <LazyImage src={`https://chart.googleapis.com/chart?cht=qr&chs=512x512&chl=${qrCode}`}/>
                    ) : null}
                </Box>
                <Box className={classes.boxDetail}>
                    <Typography>QRcode valid until {time} </Typography>
                    <Typography marginBottom={2}>time remaining {minutes} minutes {seconds} seconds</Typography>
                    <CButton sx={{display : display}} title="generate new qr" height="38px"/>
                </Box>
            </Box>
        </Box> 
    )
}

export default PaidByQr;