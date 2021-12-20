import React from 'react'
import { Box, Typography } from '@mui/material'
import useStyles from './ChatLabelPure.styles'
import CircleIcon from '@mui/icons-material/Circle'


const ChatLabelPure = (props) => {
    const classes = useStyles()

    return (
        <Box className={classes.label}>
            <CircleIcon className={classes.colorLabel} />

            <Typography>New customer</Typography>
        </Box>
    )
}
export default ChatLabelPure
