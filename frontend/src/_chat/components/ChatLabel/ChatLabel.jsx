import React from 'react'
import { Box, Typography } from '@mui/material'
import useStyles from './ChatLabel.styles'
import CircleIcon from '@mui/icons-material/Circle'
import CancelIcon from '@mui/icons-material/Cancel'
import { IconButton } from '@mui/material'

const ChatLabel = (props) => {
    const classes = useStyles()

    return (
        <Box className={classes.label}>
            <IconButton>
            <CircleIcon className={classes.colorLabel} />
            </IconButton>
            <Typography>New customer</Typography>
            <IconButton>
                <CancelIcon className={classes.cancelButton} />
            </IconButton>
        </Box>
    )
}
export default ChatLabel
