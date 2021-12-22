import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import {
    Typography,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material'

import useStyles from './ChatBubble.styles'
import NotificationBubble from '../NotificationBubble/NotificationBubble'
import TextBubble from '../TextBubble/TextBubble'
import ImageBubble from '../ImageBubble/ImageBubble'
import VideoBubble from '../VideoBubble/VideoBubble'
import { MoreVert, Delete, ContentPaste } from '@mui/icons-material'

function formatTime(time) {
    /* Format 2021-12-18T13:56:58.715+00:00 into 13:56 */
    return time === ''
        ? time
        : time.split('T')[1].split(':').slice(0, 2).join(':')
}

const ChatBubble = (props) => {
    const classes = useStyles()
    const [hover, setHover] = useState(false)
    const [anchor, setAnchor] = useState(null)
    const [open, setOpen] = useState(false)
    let bubble = null
    if (props.contentType === 'Notification') {
        return <></>
    } else if (props.contentType === 'Text') {
        bubble = <TextBubble variant={props.variant} text={props.content} />
    } else if (props.contentType === 'Image') {
        bubble = (
            <ImageBubble
                variant={props.variant}
                src={Number.isInteger(props.messageId) ? props.content : null}
                openModal={() => {
                    if (Number.isInteger(props.messageId)) {
                        props.openModal(
                            'media',
                            props.currentConversation,
                            props.messageId
                        )
                    } else {
                        props.openSnackbar()
                    }
                }}
            />
        )
    } else if (props.contentType === 'Video') {
        bubble = (
            <VideoBubble
                variant={props.variant}
                src={props.content}
                thumbnail={props.contentExtra}
                isUploading={Number.isInteger(props.messageId)}
                openModal={() => {
                    if (Number.isInteger(props.messageId)) {
                        props.openModal(
                            'media',
                            props.currentConversation,
                            props.messageId
                        )
                    } else {
                        props.openSnackbar()
                    }
                }}
            />
        )
    }

    function handleOpen(e) {
        setAnchor(e.target)
        setOpen(true)
    }

    function deleteMessage() {
        setOpen(false)
        if(Number.isInteger(props.messageId)) props.onDelete(props.messageId)
    }

    useEffect(() => {
        if (props.shouldScroll)
            props.forwardedRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [props.shouldScroll])

    useEffect(() => {
        console.log(props.read, props.fromCustomer, props.isCustomerView)
<<<<<<< HEAD
        if (
            !props.read &&
            ((!props.fromCustomer && props.isCustomerView) ||
                (props.fromCustomer && !props.isCustomerView))
        ) {
=======
        if(!props.read && ((!props.fromCustomer && props.isCustomerView) || (props.fromCustomer && !props.isCustomerView)))
        {
>>>>>>> e6d1778afc25ba9872981e9480dc73e0717f9068
            props.onRead(props.messageId)
        }
    }, [props.read])

    return (
        <Box
            className={[classes.chatBubble, classes[props.variant]].join(' ')}
            ref={props.forwardedRef}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {bubble}
            <Box className={classes.statusText}>
                <Typography variant="caption" component="span">
                    {(props.fromCustomer &&
                        props.isCustomerView &&
                        props.read) ||
                    (!props.fromCustomer && !props.isCustomerView && props.read)
                        ? 'Read'
                        : ''}
                </Typography>
                <Typography variant="caption" component="span">
                    {formatTime(props.time)}
                </Typography>
            </Box>
            {hover &&
            ((props.fromCustomer && props.isCustomerView) ||
                (!props.fromCustomer && !props.isCustomerView)) ? (
                <IconButton onClick={handleOpen}>
                    <MoreVert className={classes.delete} />
                </IconButton>
            ) : (
                <></>
            )}
            <Menu
                anchorEl={anchor}
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuItem onClick={deleteMessage}>
                    <ListItemIcon>
                        <Delete fontSize="small" sx={{ color: '#fd3737' }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: '#fd3737' }}>
                        Delete
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => setOpen(false)}>
                    <ListItemIcon>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cancel</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default ChatBubble
