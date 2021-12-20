<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> payment-2
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


<<<<<<< HEAD

const payment = ({ orderId }) => {

    const classes = useStyles();
    
    

=======
const Payment = () => {

    const classes = useStyles();

>>>>>>> payment-2
    return (
        <Box>
            <Box className = {classes.boxLeft}>
                <ChoiceForPay order_id={orderId} />
            </Box>
            <Box className = {classes.boxRight}>
                <OrderSummarize />
            </Box>
        </Box>
    )
}

export default Payment;
