import React, { useState } from 'react';
import Axios from 'axios';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import ChoiceForPay from '../components/ChoiceForPay';
import { makeStyles } from '@mui/styles';
import PaidByQr from './PaidByQr';
import OrderSummarize from '../components/OrderSummerize';

const useStyles = makeStyles({
    
    boxStyle: {
        position: 'static',
    }
})


const payment = () => {

    const classes = useStyles();



    return (
        <Box>
            <Box className = {classes.boxStyle}>
                <ChoiceForPay />
            </Box>
            <Box className = {classes.boxStyle}>
                <OrderSummarize />
            </Box>
        </Box>
    )
}

export default payment
