import React, { useState } from 'react';
import Axios from 'axios';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import ChoiceForPay from '../components/ChoiceForPay';
import { makeStyles } from '@mui/styles';
import PaidByQr from './PaidByQr';
import OrderSummarize from '../components/OrderSummerize';

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


const payment = () => {

    const classes = useStyles();



    return (
        <Box>
            <Box className = {classes.boxLeft}>
                <ChoiceForPay />
            </Box>
            <Box className = {classes.boxRight}>
                <OrderSummarize />
            </Box>
        </Box>
    )
}

export default payment
