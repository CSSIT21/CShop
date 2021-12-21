import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import ChoiceForPay from '../components/ChoiceForPay';
import { makeStyles } from '@mui/styles';
import OrderSummarize from '../components/OrderSummerize';
import  Axios  from 'axios';





const useStyles = makeStyles({
    
    boxLeft: {
        height: "100%",
        width: "50%",
        position: "fixed",
        left: "125px",
    },
    boxRight: {
        width: "45%",
        position: "static",
        float: 'right',
        marginTop: '100px',
    }
})



const Payment = () => {

    const classes = useStyles();
    
    const orderId ={"orderId": 238}

    return (
        <Box>
            <Box className = {classes.boxLeft}>
                <ChoiceForPay order_id={orderId} />
            </Box>
            <Box className = {classes.boxRight}>
                <OrderSummarize order_id={orderId} />
            </Box>
        </Box>
    )
}

export default Payment;
