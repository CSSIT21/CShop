import React, { useState } from 'react'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import ChatFeed from '../parts/ChatFeed'
import ChatList from '../parts/ChatList'

import { default as _ChatService } from '../services/ChatService'

/* Navbar height is not fixed, adjust this to preserve page's layout */
const __NAVBAR_HEIGHT = '135px'

const useStyles = makeStyles({
    chatLayout: {
        display: 'flex',
        flexDirection: 'row',
        height: `calc(100vh - ${__NAVBAR_HEIGHT})`,
        width: '100%'
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

    function handleSubmitMessage(text) {
        if(text === '') return
        alert('Send: ' + text)
    }

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
            handleSubmitMessage={handleSubmitMessage}
            user_id={user_id}
            currentChatUserId={currentChatUserId}
            ChatService={ChatService}
        />
    </Box>
}

export default ChatPage
