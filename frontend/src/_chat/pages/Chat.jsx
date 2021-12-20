import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import { nanoid } from 'nanoid'

import ChatFeed from '../parts/ChatFeed'
import ChatList from '../parts/ChatList'
import { default as _ChatService } from '../services/ChatService'
import { ChatMediaModal } from '../components'
import authState from '~/common/store/authState'
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
    const [auth] = useRecoilState(authState)
    const user_id = auth.user.id
    const [ChatService] = useState(() => new _ChatService(auth.user, handleGetConversation, handleIncomingMessage))
    const { id: router_id } = useParams()

    const [currentConversation, setCurrentConversation] = useState(0)
    const [messages, setMessages] = useState([...ChatService.messages])
    const lastBubbleRef = useRef(null)
    // modal
    const [open, setOpen] = useState(false)
    const [mediaId, setMediaId] = useState({})
    const [mediaMessage, setMediaMessage] = useState({})
    const [lastUpdate, setLastUpdate] = useState(nanoid())
    const classes = useStyles()
    const [shouldScroll, setShouldScroll] = useState(false)

    // console.log('rendering with messages: ', messages)

    function handleGetConversation() {
        // console.log(
        //     `%c Chat.jsx %c updated conversations`,
        //     'background:#40ffbf;color:#032e20',
        //     ''
        // )
        setShouldScroll(true)
        // console.log(messages)
    }

    function handleIncomingMessage(message) {
        // const newMessages = [...ChatService.messages]
        // console.log('got', message)
        // console.log(currentConversation)
        // setMessages([...ChatService.messages])
        setShouldScroll(true)
        // if(message.conversation_id === currentConversation)
        // {
        // changeChat(message.conversation_id)
        // }
        //setLastUpdate(Math.random())
        // setMessages(newMessages)
        // setTimeout(() => {
        //     useForceUpdate()
        //     changeChat(currentConversation)
        //     console.log('forced updated', messages)
        // }, 1000)
        // setMessages([
        //     ...ChatService.messages,
        //     {
        //         id: -1,
        //         snapshot: Math.random()
        //     }
        // ])
        // lastBubbleRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    function handleSubmitMessage(text) {
        if (text === '') return

        ChatService.send('text', text, currentConversation)
        // ChatService.send('text', text, currentConversation).then(() => {
        //     setConversation(ChatService.conversation)
        //     setMessages(ChatService.messagesBetween(currentConversation))
        //     console.log(
        //         `%c Chat.jsx %c sent '${text}' to user#${currentConversation}`,
        //         'background:#40ffbf;color:#032e20',
        //         ''
        //     )
        //     lastBubbleRef.current.scrollIntoView({ behavior: 'smooth' })
        // })
    }

    function handleUpload(type, file) {
        if (type === 'image') {
            ChatService.send('image', file, currentConversation).then(() => {
                setConversation(ChatService.conversation)
                setMessages(ChatService.messagesBetween(currentConversation))
                console.log(
                    `%c Chat.jsx %c sent image '${file.name}' to user#${currentConversation}`,
                    'background:#40ffbf;color:#032e20',
                    ''
                )
                setTimeout(() => {
                    lastBubbleRef.current.scrollIntoView({ behavior: 'smooth' })
                }, 500)
            })
        } else if (type === 'video') {
            ChatService.send('video', file, currentConversation).then(() => {
                setConversation(ChatService.conversation)
                setMessages(ChatService.messagesBetween(currentConversation))
                console.log(
                    `%c Chat.jsx %c sent video '${file.name}' to user#${currentConversation}`,
                    'background:#40ffbf;color:#032e20',
                    ''
                )
                setTimeout(() => {
                    lastBubbleRef.current.scrollIntoView({ behavior: 'smooth' })
                }, 500)
            })
        }
    }

    function changeChat(newConversationId) {
        if(!newConversationId) return

        // if(ChatService.conversation(newConversationId).messages.length > 0)
        // {
        //     setShouldScroll(true)
        //     setCurrentConversation(newConversationId)
        //     console.log(
        //         `%c Chat.jsx %c changed to user#${newConversationId}`,
        //         'background:#40ffbf;color:#032e20',
        //         ''
        //     )
        // }
        // else
        // {
        //     ChatService.getConversation(newConversationId, () => {
        //         changeChat(newConversationId)
        //     })
        // }
        setShouldScroll(true)
        setCurrentConversation(newConversationId)
        console.log(
            `%c Chat.jsx %c changed to user#${newConversationId}`,
            'background:#40ffbf;color:#032e20',
            ''
        )
        if (ChatService.conversation(newConversationId).messages.length === 0) {
            ChatService.getConversation(newConversationId, () => {
                console.log('done getting conv ' + newConversationId)
            })
        }
    }

    function openModal(type, conversation_id, message_id) {
        // alert('open modal for ' + type + '#' + message_id)
        // setmediaId({
        //     conversation_id: conversation_id,
        //     message_id: message_id
        // })
        setMediaMessage(messages.get(conversation_id).find(m => m.id === message_id))
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    useEffect(() => {
        if (router_id) {
            alert('opening chat page for id#' + router_id)
        }
        // console.log(
        //     `%c Chat.jsx %c initiated for user#${user_id}`,
        //     'background:#40ffbf;color:#032e20',
        //     ''
        // )
    }, [router_id])

    useEffect(() => {
        // if (messages.length > 0) {
        //     changeChat(messages[0].id)
        // }

        setInterval(() => {
            // Realtime ปลอม!
            // If it works, it works :)
            setLastUpdate(nanoid())
        }, 500)
    }, [])

    useEffect(() => {
        // if(shouldScroll)
        // {
        //     console.log(lastBubbleRef)
        //     if(lastBubbleRef.current)
        //     {
        //         lastBubbleRef.current.scrollIntoView({ behavior: 'smooth' })
        //         setShouldScroll(false)
        //     }
        // }
    }, [lastUpdate])

    useEffect(() => {
        // console.log('conv ', currentConversation)
    }, [currentConversation])

    return (
        <Box className={classes.chatLayout}>
            <ChatList
                user_id={user_id}
                currentConversation={currentConversation}
                setCurrent={changeChat}
                ChatService={ChatService}
                lastUpdate={lastUpdate}
            />
            <ChatFeed
                handleSubmitMessage={handleSubmitMessage}
                handleUpload={handleUpload}
                user_id={user_id}
                currentConversation={currentConversation}
                ChatService={ChatService}
                forwardedRef={lastBubbleRef}
                openModal={openModal}
                lastUpdate={lastUpdate}
                shouldScroll={shouldScroll}
            />
            <ChatMediaModal
                open={open}
                onClose={closeModal}
                message={mediaMessage}
            />
        </Box>
    )
}

export default ChatPage
