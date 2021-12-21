import React from 'react'
import { Box, Button } from '@mui/material'
import useStyles from './AutomatedChat.styles'

const AutomatedChat = (props) => {
    const classes = useStyles()
    const quickReply = [
        'How much',
        'Where is your shop located?',
        'Is the shirt number xxx available?',
        'Hello'
    ]

    return (
        <Box className={classes.automatedContainer}>
            {quickReply.map((e) => (
                <Button className={classes.automatedButton}>{e}</Button>
            ))}
        </Box>
    )
}

export default AutomatedChat
