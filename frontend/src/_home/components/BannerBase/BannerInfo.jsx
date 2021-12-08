import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { ClassNames } from "@emotion/react";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

const useStyles = makeStyles({
    bannerInfoWrapper: {
    	margin: '40px 165px',
		padding: '40px 60px',
    },
    bannerHeader: {

    },


});

const BannerInfo = () => {

    return (
        <Box className={ClassNames.bannerInfoWrapper}>
            <Box className={className.bannerHeader}>
                <HeaderWithArrow
                    colors="black"
					headerName="Banner Information"
                />
            
            
            
            </Box>
            <Box>

                
                </Box>
                


           

        </Box>
    );



};
 


export default BannerInfo ;