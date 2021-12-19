
import { AccountBalance, CheckCircleOutlined, CircleOutlined } from '@mui/icons-material'
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
        margin: '15px 30px'
    },
    creditCard: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        left: '430px',
        top: '110px',
    },
    creditCardIcon: {
        height: '36px'
    },
    internetBank: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        left: '515px',
        top: '210px',
    },
    confirmButton: {
        width: '200px',
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
        paddingLeft: '100px',
        paddingRight: '100px',
        width: '10%',
        top: '500px',
        left: '200px',
        alignItems: 'center',
    },
    // fullBox: {
    //     display: 'flex',
    //     position: 'static',
    //     justify: "space-between",
    //     width: "50%",
    //     left: "0",
    // }
});



const ChoiceForPay = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState('');
    
    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

    // const handleSubmit = (event) => {
    //     if (value === 'creditCard') {
    //         console.log("CreditCard");
    //     }
    //     if (value === 'InBanking') {
    //         console.log("Banking");
    //     }
    //     if (value === 'wallet') {
    //         console.log("wallet");
    //     }
    //     if (value === 'qr') {
    //         console.log("qr");
    //     }
    // }

    return (
        <Box>
            <Grid>
                <Typography component="h3" fontSize="30px" fontWeight="bold" sx={{margin: '20px'}}>
                    Chosing payment gateway
                </Typography>
                <FormGroup>
                    <RadioGroup row aria-label="way" name="way" value={value} onChange={handleRadioChange}>
                        <Box className={classes.boxStyle}> 
                            <FormControlLabel className={classes.checkBox} value="creditcard" label={
                                <Box>
                                    Credit Card
                                    <Box className={classes.creditCard}>
                                        <LazyImage className={classes.creditCardIcon} src={CreditCard} lazy="https://via.placeholder.com/92x60.png" />
                                        <LazyImage className={classes.creditCardIcon} src={ VisaCard } lazy="https://via.placeholder.com/92x60.png"/>
                                    </Box>
                                </Box>
                            } control={<Radio icon={<CircleOutlined />} checkedIcon={<CheckCircleOutlined />} />}
                            />
                        </Box>
                        <Box className={classes.boxStyle}>
                            <FormControlLabel className={classes.checkBox} value="banking" label={
                                <Box>
                                    Internet Bnaking
                                    <Box className={classes.internetBank}>
                                        <AccountBalance />
                                    </Box>
                                </Box>
                            } control={ <Radio icon={<CircleOutlined />} checkedIcon={<CheckCircleOutlined />} /> }  
                            />
                        </Box>
                        <Box className={classes.boxStyle}>
                            <FormControlLabel className={classes.checkBox} value="wallet" label="Wallet" control={
                                    <Radio icon={<CircleOutlined />} checkedIcon={<CheckCircleOutlined />} />
                            }/>
                        </Box>
                        <Box className={classes.boxStyle}>
                            <FormControlLabel className={classes.checkBox} value="paidbyqr" label="QR Code" control={
                                    <Radio icon={<CircleOutlined />} checkedIcon={<CheckCircleOutlined />} />
                            }/>
                        </Box>
                    </RadioGroup>
                    <Box className={classes.boxButton}>
                        <Link to={"/payment/"+value}>
                            <Button className={classes.confirmButton} color="primary">
                                Confirm
                            </Button>
                        </Link>
                    </Box>
                </FormGroup>
            </Grid>
        </Box>
    )
}

export default ChoiceForPay
