import { Box } from '@mui/system'
import LazyImage from '../../common/components/LazyImage/LazyImage'
import { CheckCircleOutline, RadioButtonUnchecked,  } from '@mui/icons-material'
import { Checkbox, FormControlLabel } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles({
    boxStyle: {
        width: '100%',
		padding: '30px 10px',
		backgroundColor: '#EFEFF1',
        borderRadius: '20px',
        
    },
    imageStyle: {
        width: '92px',
        zIndex: '2',
    }
    
});


const CreditCard = () => {
    const classes = useStyles();
    return (
        <Box>
            
            
        </Box>
    )
}

export default CreditCard
