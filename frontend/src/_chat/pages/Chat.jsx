import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import ChatFeed from '../parts/ChatFeed'
import ChatList from '../parts/ChatList'

import { default as _ChatService } from '../services/ChatService'
import { ChatMediaModal } from '../components'
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

const ChatPage = (props) => {
    const user_id = 1
    const ChatService = new _ChatService(user_id)
    const self = ChatService.self
    const { id: router_id } = useParams()

    const [currentChatUserId, setCurrentChatUserId] = useState(4)
    const [messages, setMessages] = useState(
        ChatService.messagesBetween(currentChatUserId)
    )
    const [users, setUsers] = useState(ChatService.users)
    const [latest, setLatest] = useState(ChatService.latestMessages)
    const lastBubbleRef = useRef(null)
    // modal
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [mediaMessageId, setMediaMessageId] = useState(3)
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

    function handleUpload(type, file) {
        if (type === 'image') {
            ChatService.send('image', file, currentChatUserId).then(() => {
                setLatest(ChatService.latestMessages)
                setMessages(ChatService.messagesBetween(currentChatUserId))
                console.log(
                    `%c Chat.jsx %c sent image '${file.name}' to user#${currentChatUserId}`,
                    'background:#40ffbf;color:#032e20',
                    ''
                )
                setTimeout(() => {
                    lastBubbleRef.current.scrollIntoView({ behavior: 'smooth' })
                }, 500)
            })
        } else if (type === 'video') {
            ChatService.send('video', file, currentChatUserId).then(() => {
                setLatest(ChatService.latestMessages)
                setMessages(ChatService.messagesBetween(currentChatUserId))
                console.log(
                    `%c Chat.jsx %c sent video '${file.name}' to user#${currentChatUserId}`,
                    'background:#40ffbf;color:#032e20',
                    ''
                )
                setTimeout(() => {
                    lastBubbleRef.current.scrollIntoView({ behavior: 'smooth' })
                }, 500)
            })
        }
    }

    function changeChat(newChatUserId) {
        console.log(
            `%c Chat.jsx %c changed to user#${newChatUserId}`,
            'background:#40ffbf;color:#032e20',
            ''
        )
        setCurrentChatUserId(newChatUserId)
    }

    function openModal(type, message_id) {
        // alert('open modal for ' + type + '#' + message_id)
        setMediaMessageId(message_id)
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    useEffect(() => {
        if(router_id)
        {
            alert('opening chat page for id#' + router_id)
        }
    }, [router_id])

    return (
        <Box className={classes.chatLayout}>
            <ChatList
                latest={latest}
                user_id={user_id}
                currentChatUserId={currentChatUserId}
                setCurrent={changeChat}
                ChatService={ChatService}
            />
            <ChatFeed
                handleSubmitMessage={handleSubmitMessage}
                handleUpload={handleUpload}
                user_id={user_id}
                currentChatUserId={currentChatUserId}
                ChatService={ChatService}
                forwardedRef={lastBubbleRef}
                openModal={openModal}
            />
            <ChatMediaModal
                open={open}
                onClose={closeModal}
                message_id={mediaMessageId}
                ChatService={ChatService}
            />
        </Box>
    )
}

export default ChatPage
