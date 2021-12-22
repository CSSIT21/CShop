import React from 'react';
import { Box } from '@mui/system';
import ChoiceForPay from '../components/ChoiceForPay';
import { makeStyles } from '@mui/styles';
import OrderSummarize from '../components/OrderSummerize';
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'





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

    const { search } = useLocation();
    const { orderId: orderID, cuponID, addressID } = queryString.parse(search)
    const orderId = parseInt(orderID)
    


    const classes = useStyles();
    
 

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
