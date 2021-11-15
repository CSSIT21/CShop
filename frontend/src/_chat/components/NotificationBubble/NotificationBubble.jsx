import React from 'react'
import { Box } from '@mui/system'

import useStyles from './NotificationBubble.styles'

const NotificationBubble = (props) => {
    const classes = useStyles()

    return (
        <Box className={classes.container}>Chat bubble for notifications</Box>
    )
}

export default NotificationBubble
