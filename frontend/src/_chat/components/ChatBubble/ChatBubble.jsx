import React, { useEffect } from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

import useStyles from './ChatBubble.styles'
import NotificationBubble from '../NotificationBubble/NotificationBubble'
import TextBubble from '../TextBubble/TextBubble'
import ImageBubble from '../ImageBubble/ImageBubble'
import VideoBubble from '../VideoBubble/VideoBubble'

function formatTime(time) {
    /* Format 2021-12-18T13:56:58.715+00:00 into 13:56 */
    return time === '' ? time : time.split('T')[1].split(':').slice(0, 2).join(':')
}

const ChatBubble = (props) => {
    const classes = useStyles()
    let bubble = null
    if (props.contentType === 'Notification') {
        return <></>
        // bubble = (
        //     <NotificationBubble
        //         text={props.content}
        //         actionUrl={props.contentExtra}
        //     />
        // )
    } else if (props.contentType === 'Text') {
        bubble = <TextBubble variant={props.variant} text={props.content} />
    } else if (props.contentType === 'Image') {
        bubble = (
            <ImageBubble
                variant={props.variant}
                src={props.content}
                openModal={() => props.openModal('media', props.messageId)}
            />
        )
    } else if (props.contentType === 'Video') {
        bubble = (
            <VideoBubble
                variant={props.variant}
                src={props.content}
                thumbnail={props.contentExtra}
                openModal={() => props.openModal('media', props.messageId)}
            />
        )
    }
    
    useEffect(() => {
        if(props.shouldScroll) props.forwardedRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [props.shouldScroll])

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
