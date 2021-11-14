import React from 'react';
import LazyImage from "../../common/components/LazyImage/LazyImage";
import { Box } from '@mui/system';

const paidByQr = ({qrCode}) => {
    
    return (
        <Box>
            {qrCode.length > 1 ? (
                    <LazyImage
              src={`https://chart.googleapis.com/chart?cht=qr&chs=512x512&chl=${qrCode}`}
              lazy="https://via.placeholder.com/1140x516.png"
            />
            ) : null}
            
        </Box>   
        
    )
}

export default paidByQr;
