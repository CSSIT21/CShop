import { CheckCircleOutlined } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { margin } from '@mui/system'
import React, {useState} from 'react'
import CButton from '../../common/components/CButton'


const useStyles = makeStyles({
    cardStyle: {
        display: 'flex',
        justifyContent: 'center',
        width: '40% ',
        top: '300px',
        padding: '40px 0px',
        borderRadius: '40px !important'
    },
    boxStyle: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        top: '50px',
        
    },
    iconStyle: {
        display: 'flex',
        justifyContent: 'center',
        color: 'green',
        margin: '20px 0px 50px 0px'
    },
    contentStyle: {
        width: '100%',
        display: 'flex',
        alignContent: "center",
        justifyContent: "space-between",
        margin: '10px 0px',
    },


})

const Success = ({orderId}) => {
    const classes = useStyles();

    const [name, setName] = useState("")
    const [transId, setTransId] = useState(0)
    const [paymentType, setPaymentType] = useState("")
    const [amount, setAmount] = useState(0)

    return (
        <Box className={classes.boxStyle}>
            <Card  className={classes.cardStyle}>
                <CardContent>
                    <Typography color="#4caf50" sx={{ fontSize: 30 }}>Payment Successful</Typography>
                    <Box className={classes.iconStyle}>
                        <CheckCircleOutlined sx={{ fontSize: 50 }} />
                    </Box>
                
                    <Box className={classes.contentStyle}>    
                        Transaction id<Typography>238</Typography>
                    </Box>
                    <Box className={classes.contentStyle}>
                        Payment type <Typography>Wallet</Typography>
                    </Box>
                    <Box className={classes.contentStyle}>    
                        Name <Typography>Jirasin Jarethammajit</Typography>
                    </Box>
                    <Box marginTop={2} fontWeight={600} className={classes.contentStyle}>    
                        Amount paid<Typography fontWeight={600} fontSize={20}>24 ฿</Typography>
                    </Box>
                    <Box marginTop={5} >
                        <CButton title="Close" className={classes.contentStyle}/>
                    </Box>
                    
                </CardContent>
            </Card>
        </Box>
    )
}

export default Success;
