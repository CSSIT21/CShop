import React, { useState } from 'react'
import Axios from 'axios'
import { Box } from '@mui/system'
import { Button } from '@mui/material'

const Qrcode = () => {

    const [qrCode, setqrCode] = useState("")

    const getQrCode = async () => {
        const qrRaw = await Axios.get('http://localhost:8080/payment/qrcode');
            setqrCode(qrRaw.data)
        
    }

    console.log("Fuck u");

    return (
        <div>
        <Box>
            <Button onClick={getQrCode}>
                getQr
                </Button>
            {qrCode.length > 1 ? (
                    <img src={`https://chart.googleapis.com/chart?cht=qr&chs=512x512&chl=${qrCode}`} alt="QrCode" />
                ) : null}
        </Box>
        </div>
    )
}

export default Qrcode;
