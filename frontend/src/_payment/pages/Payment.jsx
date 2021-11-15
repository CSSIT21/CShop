import React, { useState } from 'react';
import Axios from 'axios';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import ChoiceForPay from '../components/ChoiceForPay';
import { makeStyles } from '@mui/styles';
import PaidByQr from '../components/PaidByQr';

const useStyles = makeStyles({
    confirmButton: {
        fontWeight: 'bold',
		textTransform: 'capitalize',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxButton: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        whiteSpace: 'normal',
        border: '1px solid #ccc',
        borderRadius: '20px',
        width: '10%',
        top: '610px',
        left: '230px',
    },
    showQr: {
        position: 'absolute',
        top: '200px',
        right: '300px'
    }
})


const payment = () => {

    const classes = useStyles();

    const [qrCode, setqrCode] = useState("")

    const getQrCode = async () => {
        // const qrRaw = await Axios.get('http://localhost:8080/payment/qrcode');
            // setqrCode(qrRaw.data)
        setqrCode("0002010102123032011563959634889012902091234678325204701153037645406100.005802TH5905CShop6007BANGKOK62340523202111151028050140000000703CMQ630447C0")
    }

    return (
        <Box>
            <Box>
                <ChoiceForPay/>
            </Box>
            <Box className={classes.boxButton}>
                <Button className={classes.confirmButton} onClick={getQrCode} color="primary">
                    Confirm
                </Button>
            </Box>
            <Box className={classes.showQr}>
                <PaidByQr qrCode={ qrCode }/>
            </Box>
        </Box>
    )
}

export default payment
