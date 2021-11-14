
import { CheckCircleOutlined, CircleOutlined } from '@mui/icons-material'
import { Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import LazyImage from '../../common/components/LazyImage/LazyImage'
import CreditCard from '../assets/images/mc_vrt_pos.svg'
import VisaCard from '../assets/images/Visa_2021.svg'

const useStyles = makeStyles({
	checkBox: {
        width: '100%',
        height: 60,
        padding: '0 30px',
        justifyContent: 'left',
        alignItems: 'left',
    },
    boxStyle: {
        width: '75%',
        border: '1px solid #ccc',
        borderRadius: '20px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    boxIcon: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        left: '400px',
        top: '180px',

    },
    iconStyle: {
        height: '36px'
    }
});



const ChoiceForPay = () => {

    const classes = useStyles();

    return (
        <Box>
            <Grid item xs={6}>
                <Typography component="h3" fontSize="30px" fontWeight="bold">
                     Chosing payment gateway
                </Typography>
                <FormGroup>
                    <Box className={classes.boxStyle}>
                        <FormControlLabel className={classes.checkBox} label="Credit Card" control={
                            <Box>
                            <Checkbox icon={<CircleOutlined />}
                                    checkedIcon={<CheckCircleOutlined />} />
                            <Box className={ classes.boxIcon }>
                                    <LazyImage className={classes.iconStyle} src={CreditCard} lazy="https://via.placeholder.com/92x60.png" />
                                    <LazyImage className={classes.iconStyle} src={ VisaCard } lazy="https://via.placeholder.com/92x60.png"/>
                                </Box>
                            </Box>
                        } >
                           
                        </FormControlLabel>
                    </Box>
                </FormGroup>
            </Grid>
        </Box>
    )
}

export default ChoiceForPay
