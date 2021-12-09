import React, { useState } from 'react';
import Axios from 'axios';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import ChoiceForPay from '../components/ChoiceForPay';
import { makeStyles } from '@mui/styles';
import PaidByQr from './PaidByQr';

const useStyles = makeStyles({
    
    SomeCssExample: {
        position: 'absolute',
        top: '200px',
        right: '300px'
    }
})


const payment = () => {

    const classes = useStyles();



    return (
        <Box>
            <Box>
                <ChoiceForPay/>
            </Box>
        </Box>
    )
}

export default payment
