import React from 'react'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'

import {
    ChatBubble,
    ChatMediaModal,
    MessageBar,
    ProfileBar
} from '../components'

const useStyles = makeStyles({
    chatFeedContainer: {
        width: '70%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '0px'
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
    chatFeedButtom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        height: '72px'
    }
})

const ChatFeed = (props) => {
    const classes = useStyles()

    const messages = props.ChatService.messagesBetween(props.currentChatUserId)

    console.log(
        `%c ChatFeed.jsx %c rendered user#${props.currentChatUserId} (${
            props.ChatService.userWithId(props.currentChatUserId).displayname
        })`,
        'color:#004254;background:#5ce1ff',
        ''
    )
    return (
        <Box className={classes.chatFeedContainer}>
            {/* ChatFeed on the right shows all messages between two users */}
            <Box className={classes.chatFeedTitle}>
                <ProfileBar
                    displayName={
                        props.ChatService.userWithId(props.currentChatUserId)
                            .displayname
                    }
                    status="active"
                    pic={
                        props.ChatService.userWithId(props.currentChatUserId)
                            .pic
                    }
                    currentChatUserId={props.currentChatUserId}
                    notification={false}
                />
            </Box>
            <Box className={classes.chatFeed}>
                {messages.map((m,i) => (
                    <ChatBubble
                        key={i}
                        variant={m.sender === props.user_id ? 'right' : 'left'}
                        read={m.seen}
                        time={m.message_datetime}
                        contentType={m.content_type}
                        content={m.content}
                        contentExtra={m.content_extra}
                        forwardedRef={props.forwardedRef}
                    />
                ))}
            </Box>
            <Box className={classes.chatFeedButtom}>
                <MessageBar
                    currentChatUserId={props.currentChatUserId}
                    handleSubmitMessage={props.handleSubmitMessage}
                    handleUpload={props.handleUpload}
                />
            </Box>
        </Box>
    )
}

export default ChatFeed
