
import { AccountBalance, CheckCircleOutlined, CircleOutlined, WindowRounded } from '@mui/icons-material'
import { Button, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import { useState, useEffect } from 'react'
import Baht from '../assets/images/baht.png'
import LazyImage from '../../common/components/LazyImage/LazyImage'
import CreditCardIcon from '../assets/images/mc_vrt_pos.svg'

import VisaCard from '../assets/images/Visa_2021.svg'
import { PayByInternetBanking } from '../pages/PayByInternetBanking'

import Axios from "axios";
import config from "~/common/constants";
import PaidByQr from '../pages/PaidByQr'


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
    textWallet: {
        fontSize: 'large',
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        right: "180px",
        bottom: "486px"
    }
    // fullBox: {
    //     display: 'flex',
    //     position: 'static',
    //     justify: "space-between",
    //     width: "50%",
    //     left: "0",
    // }
});



const ChoiceForPay = ({ order_id }) => {

    const classes = useStyles();
    const [value, setValue] = useState('');
    const [wallet, setWallet] = useState([]);
    const [order, setOrder] = useState([]);
    const [click, setClick] = useState(true)
    const orderId = { "orderId": order_id }
    
    useEffect(() => {
        getWallet()
    }, [])

  const getWallet = () => {
    Axios.post(`${config.SERVER_URL}/payment/mywallet`, orderId).then((res) => {
      if (res.data.success) {
          console.log(res.data)
        setWallet(res.data.walletOrder.wallet);

        setOrder(res.data.walletOrder.order);
      }
    }).catch((err) => console.log(err))
  }

  const paidByWallet = () => {
    Axios.post(`${config.SERVER_URL}/payment/wallet`, orderId).then((res) => {
      if (res.data.success) {
        console.log("Done");
      }
    }).catch((err) => console.log(err))
  }

    const route = (value) => {
        return window.location.href =`http://localhost:3000/payment/${value}`
    }
    
    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (value) => {
        if (value === 'creditcard' && click) {
            console.log("willy");
            return route(value)
        }
        if (value === 'banking' && click ) {
            return <PayByInternetBanking id={order_id} total_price='100' />
        }
        if (value === 'wallet' && click && wallet.balance >= order.total_price) {
            paidByWallet();
            return route("success")
        }
        if (value === 'paidbyqr' && click) {
            
            <PaidByQr orderId={ order_id }/>
           return route(value+"?orderId="+order_id)
        }
    }

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
                                        <LazyImage className={classes.creditCardIcon} src={CreditCardIcon} lazy="https://via.placeholder.com/92x60.png" />
                                        <LazyImage className={classes.creditCardIcon} src={ VisaCard } lazy="https://via.placeholder.com/92x60.png"/>
                                    </Box>
                                </Box>
                            } control={<Radio icon={<CircleOutlined />} checkedIcon={<CheckCircleOutlined />} />}
                            />
                        </Box>
                        <Box className={classes.boxStyle}>
                            <FormControlLabel className={classes.checkBox} value="banking" label={
                                <Box>
                                    Internet Banking
                                    <Box className={classes.internetBank}>
                                        <AccountBalance/>
                                    </Box>
                                </Box>
                            } control={ <Radio icon={<CircleOutlined />} checkedIcon={<CheckCircleOutlined />} /> }  
                            />
                        </Box>
                        <Box className={classes.boxStyle}>
                            <FormControlLabel className={classes.checkBox} value="wallet" label="Wallet" control={
                                    <Radio icon={<CircleOutlined />} checkedIcon={<CheckCircleOutlined />} /> 
                            } />
                            <Typography className={classes.textWallet} sx={{fontSize: "27px"}}>
                                {wallet.balance}
                                <LazyImage src={Baht} lazy="https://via.placeholder.com/20x20.png" />
                            </Typography>
                        </Box>
                        <Box className={classes.boxStyle}>
                            <FormControlLabel className={classes.checkBox} value="paidbyqr" label="QR Code" control={
                                    <Radio icon={<CircleOutlined />} checkedIcon={<CheckCircleOutlined />} />
                            }/>
                        </Box>
                    </RadioGroup>
                    <Box className={classes.boxButton}>
                        {/* <Link to={"/payment/" + value}> */}
                        {value === "banking"
                        ?   <PayByInternetBanking className={classes.confirmButton} color="primary"/> 
                        :   <Button className={classes.confirmButton} onClick={function (event) { setClick(true); handleSubmit(value); }} color="primary">
                                Confirm
                            </Button>
                        }
                        {/* </Link> */}
                    </Box>
                </FormGroup>
            </Grid>
        </Box>
    )
}

export default ChoiceForPay
