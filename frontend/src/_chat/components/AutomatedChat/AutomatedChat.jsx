import React from 'react'
import { Box, Button } from '@mui/material'
import useStyles from './AutomatedChat.styles'

const AutomatedChat = (props) => {
    const classes = useStyles()
    const quickReply = [
        'Hello',
        'Where is your shop located?',
        'Can you provide a full invoice?',
        'How much?'
    ]

    return (
        <Box className={classes.automatedContainer}>
            {quickReply.map((e, i) => (
                <Button key={i} className={classes.automatedButton} onClick={() => props.handleSubmitMessage(e)}>{e}</Button>
            ))}
        </Box>
    )
}

export default AutomatedChat
