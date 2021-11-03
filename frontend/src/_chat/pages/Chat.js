import React, { useState } from 'react'
import { Box } from '@mui/system'

import ChatFeed from '../parts/ChatFeed'
import ChatList from '../parts/ChatList'
import { default as _ChatService } from '../services/ChatService'

const ChatPage = props => {
    const user_id = 1
    const ChatService = new _ChatService(user_id)
    const self = ChatService.self

    const [messages, setMessages] = useState(ChatService.messages)
    const [users, setUsers] = useState(ChatService.users)
    const [latest, setLatest] = useState(ChatService.latestMessages)

    return <Box>
        Hello, this is ChatPage
        <ChatList />
        <ChatFeed />
    </Box>
}

export default ChatPage;