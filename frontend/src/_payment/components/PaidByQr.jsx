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

const paidByQr = ({qrCode}) => {
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
