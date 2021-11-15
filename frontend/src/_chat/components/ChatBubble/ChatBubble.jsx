import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

import useStyles from './ChatBubble.styles'
import NotificationBubble from '../NotificationBubble/NotificationBubble'
import TextBubble from '../TextBubble/TextBubble'
import ImageBubble from '../ImageBubble/ImageBubble'
import VideoBubble from '../VideoBubble/VideoBubble'

function formatTime(time) {
    /* Format 2021-11-03 13:23:53.320758 into 13:23 */
    return time.split(' ')[1].split(':').slice(0, 2).join(':')
}

const ChatBubble = (props) => {
    const classes = useStyles()
    let bubble = null
    if (props.contentType === 'notification') {
        bubble = (
            <NotificationBubble
                text={props.content}
                actionUrl={props.contentExtra}
            />
        )
    } else if (props.contentType === 'text') {
        bubble = <TextBubble variant={props.variant} text={props.content} />
    } else if (props.contentType === 'image') {
        bubble = <ImageBubble variant={props.variant} src={props.content} />
    } else if (props.contentType === 'video') {
        bubble = (
            <VideoBubble
                variant={props.variant}
                src={props.content}
                thumbnail={props.contentExtra}
            />
        )
    }

    return (
        <Box
            className={[classes.chatBubble, classes[props.variant]].join(' ')}
            ref={props.forwardedRef}
        >
            {bubble}
            <Box className={classes.statusText}>
                <Typography variant="caption" component="span">
                    {props.read ? 'Read' : ''}
                </Typography>
                <Typography variant="caption" component="span">
                    {formatTime(props.time)}
                </Typography>
            </Box>
        </Box>
    )
}

export default ChatBubble
