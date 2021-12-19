import { CheckCircleOutlined } from '@mui/icons-material'
import { Box, Card, CardActions, CardContent, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles({
    cardStyle: {
        display: 'flex',
        justifyContent: 'center',
        width: '50% ',
        top: '300px',
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
        position: 'relative',
        top: '50px',
    }
})

const Success = () => {

    const classes = useStyles();

    return (
        <Box className={classes.boxStyle}>
            <Card  className={classes.cardStyle}>
                <CardContent>
                    <Typography color="#4caf50" sx={{ fontSize: 30 }}>Payment Successful</Typography>
                    <Box className={classes.iconStyle}>
                        <CheckCircleOutlined color="#4caf50" sx={{ fontSize: 50 }} />
                    </Box>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </Box>
    )
}

export default Success
