import React, { useRef, useState } from 'react'
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

    const [currentChatUserId, setCurrentChatUserId] = useState(4);
    const [messages, setMessages] = useState(ChatService.messagesBetween(currentChatUserId))
    const [users, setUsers] = useState(ChatService.users)
    const [latest, setLatest] = useState(ChatService.latestMessages)
    const lastBubbleRef = useRef(null)

    const classes = useStyles()

    function handleSubmitMessage(text) {
        if (text === '') return
        ChatService.send('text', text, currentChatUserId).then(() => {
            setLatest(ChatService.latestMessages)
            setMessages(ChatService.messagesBetween(currentChatUserId))
            console.log(
                `%c Chat.jsx %c sent '${text}' to user#${currentChatUserId}`,
                'background:#40ffbf;color:#032e20',
                ''
            )
            lastBubbleRef.current.scrollIntoView({ behavior: 'smooth' })
        })
    }

    function changeChat(newChatUserId) {
        console.log(`%c Chat.jsx %c changed to user#${newChatUserId}`, 'background:#40ffbf;color:#032e20', '')
        setCurrentChatUserId(newChatUserId)
    }

    return <Box className={classes.chatLayout}>
        <ChatList
            latest={latest}
            user_id={user_id}
            currentChatUserId={currentChatUserId}
            setCurrent={changeChat}
            ChatService={ChatService}
        />
        <ChatFeed
            handleSubmitMessage={handleSubmitMessage}
            user_id={user_id}
            currentChatUserId={currentChatUserId}
            ChatService={ChatService}
            forwardedRef={lastBubbleRef}
        />
    </Box>
}

export default ChatPage
