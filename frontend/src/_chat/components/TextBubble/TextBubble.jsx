import React from 'react'
import { Box } from '@mui/system'

import useStyles from './TextBubble.styles'
import { Typography } from '@mui/material'

const TextBubble = (props) => {
    const classes = useStyles()

    return (
        <Box
            className={
                props.variant === 'right'
                    ? classes.textBubbleRight
                    : classes.textBubbleLeft
            }
        >
            <Typography>{props.text}</Typography>
        </Box>
    )
}

export default TextBubble
