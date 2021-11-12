import React, { useState } from 'react'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import ChatFeed from '../parts/ChatFeed'
import ChatList from '../parts/ChatList'

import { default as _ChatService } from '../services/ChatService'

const useStyles = makeStyles({
    chatLayout: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: '0px',
        right: '0px'
    }
})

const ChatPage = props => {
    const user_id = 1
    const ChatService = new _ChatService(user_id)
    const self = ChatService.self

    const [messages, setMessages] = useState(ChatService.messages)
    const [users, setUsers] = useState(ChatService.users)
    const [latest, setLatest] = useState(ChatService.latestMessages)
    const [currentChatUserId, setCurrentChatUserId] = useState(4)

    const classes = useStyles()

    return <Box className={classes.chatLayout}>
        <ChatList
            latest={latest}
            user_id={user_id}
            currentChatUserId={currentChatUserId}
            setCurrent={setCurrentChatUserId}
            ChatService={ChatService}
        />
        <ChatFeed
            messages={ChatService.messagesBetween(currentChatUserId)}
            user_id={user_id}
        />
    </Box>
}

export default ChatPage
