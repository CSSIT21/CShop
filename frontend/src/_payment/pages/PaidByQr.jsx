import React from 'react';
import LazyImage from "../../common/components/LazyImage/LazyImage";
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    sizeQr: {
        height: '300px'
    },
    sizeBox: {
        width: '300px'
    }
})
const qrCode = "0002010102123032011563959634889012902091234678325204701153037645406100.005802TH5905CShop6007BANGKOK62340523202111151028050140000000703CMQ630447C0";

const paidByQr = () => {
    const classes = useStyles();
    
    return (
        <Box className={classes.sizeBox}>
            {qrCode.length > 1 ? (
                    <LazyImage className = {classes.sizeQr}
              src={`https://chart.googleapis.com/chart?cht=qr&chs=512x512&chl=${qrCode}`}
            />
            ) : null}
            
        </Box>   
        
    )
}

export default paidByQr;
