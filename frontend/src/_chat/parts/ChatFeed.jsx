import React, { useState } from 'react'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import { CircularProgress, Snackbar } from '@mui/material'

import {
    ChatBubble,
    ChatMediaModal,
    MessageBar,
    ProfileBar, ProfileBarSeller
} from '../components'

const useStyles = makeStyles({
    chatFeedContainer: {
        width: '70%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '0px',
        background: '#fdf4dd'
    },
    chatFeedTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        height: '72px'
    },
    chatFeed: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        background: '#FDF4DD',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '24px 16px '
    },
    loader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: '#FDF4DD',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '24px 16px ',
        color: ''
    },
    chatFeedButtom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        height: '72px'
    },
    time: {
        background: 'rgba(0,0,0,0.06)',
        color: 'rgba(0,0,0,0.38)',
        padding: '0px 17px',
        borderRadius: '30px'
    }
})

const TimeLabel = (props) => {
    const classes = useStyles()
    return <Box sx={{ color: 'rgba(0,0,0,0.38)' }}>{props.text}</Box>
}

const ChatFeed = (props) => {
    const [open, setOpen] = useState(false)

    function openSnackbar() {
        setOpen(true)
    }
    
    function closeSnackbar() {
        setOpen(false)
    }

    const messages = props.ChatService.conversation(props.currentConversation)
    // console.log('feed ' + props.lastUpdate, messages)
    const classes = useStyles()
    if (messages === undefined) {
        return (
            <Box className={classes.chatFeedContainer}>
                <Box className={classes.loader}>
                    <TimeLabel text="Select chat from your left" />
                </Box>
            </Box>
        )
    } else if (messages.messages.length === 0 && props.ChatService.isGetting) {
        return (
            <Box className={classes.chatFeedContainer}>
                {/* ChatFeed on the right shows all messages between two users */}
                <Box className={classes.chatFeedTitle}>
                    <ProfileBar
                        displayName={messages.shop_name}
                        status={false}
                        pic={messages.shop_pic}
                        url={'/shop/' + messages.shop_id}
                        notification={messages.is_muted}
                    />
                </Box>
                <Box className={classes.loader}>
                    <CircularProgress color="primary" />
                </Box>
                <Box className={classes.chatFeedButtom}>
                    <MessageBar
                        currentConversation={props.currentConversation}
                        handleSubmitMessage={props.handleSubmitMessage}
                        handleUpload={props.handleUpload}
                    />
                </Box>
            </Box>
        )
    }

    function handleRead(message_id) {
        if(Number.isInteger(message_id)) props.ChatService.read(props.currentConversation, message_id)
    }
    // if(messages.latest_id === )
    // console.log(messages)
    // console.log('render for #' + messages.messages[messages.messages.length - 1].id)

    // console.log(
    //     `%c ChatFeed.jsx %c rendered user#${props.currentConversation} (${
    //         'currentUser.displayname'
    //     })`,
    //     'color:#004254;background:#5ce1ff',
    //     ''
    // )
    return (
        <Box className={classes.chatFeedContainer}>
            {/* ChatFeed on the right shows all messages between two users */}
            <Box className={classes.chatFeedTitle}>
                {/* <ProfileBar
                    displayName={messages.shop_name}
                    status={messages.active}
                    pic={messages.shop_pic}
                    url={'/shop/' + messages.shop_id}
                    notification={messages.is_muted}
                /> */}
                <ProfileBarSeller displayName={messages.shop_name}
                    status={messages.active}
                    pic={messages.shop_pic}
                    url={'/shop/' + messages.shop_id}
                    mark='Done'/>
            </Box>
            <Box className={classes.chatFeed}>
                {messages.messages &&
                    messages.messages.map((m, i) => (
                        <ChatBubble
                            key={i}
                            currentConversation={props.currentConversation}
                            variant={m.from_customer ? 'right' : 'left'}
                            read={m.seen}
                            fromCustomer={m.from_customer}
                            time={m.message_time}
                            messageId={m.id || m.temp_id}
                            contentType={m.content_type}
                            content={m.content}
                            contentExtra={m.content_extra}
                            forwardedRef={props.forwardedRef}
                            openModal={props.openModal}
                            shouldScroll={props.shouldScroll}
                            onRead={handleRead}
                            openSnackbar={openSnackbar}
                        />
                    ))}
            </Box>
            <Box className={classes.chatFeedButtom}>
                <MessageBar
                    currentConversation={props.currentConversation}
                    handleSubmitMessage={props.handleSubmitMessage}
                    handleUpload={props.handleUpload}
                />
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={2000}
                open={open}
                onClose={closeSnackbar}
                message="Uploading"
            />
        </Box>
    )
}

export default ChatFeed
