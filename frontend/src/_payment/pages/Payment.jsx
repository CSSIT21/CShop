import React, { useState } from 'react';
import Axios from 'axios';
import { Button } from '@mui/material';
import PaidByQr from '../components/PaidByQr';
import { Box } from '@mui/system';
import ChoiceForPay from '../components/ChoiceForPay';



const payment = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [qrCode, setqrCode] = useState("")

    const getQrCode = async () => {
        const qrRaw = await Axios.get('http://localhost:8080/payment/qrcode');
            setqrCode(qrRaw.data)
    }

    return (
        <Box>
            <Box>
                <ChoiceForPay/>
            </Box>
            <Box>
                <Button onClick={getQrCode}>
                    getQr
                </Button>
                    <PaidByQr qrCode={qrCode} />
            </Box>
            <Box>
                <Button>
                    Show credit card pop up
                </Button>
            </Box>
        </Box>
    )
}

export default payment
