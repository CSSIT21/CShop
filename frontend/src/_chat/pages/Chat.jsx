import React, { useEffect, useRef, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import { nanoid } from 'nanoid'

import ChatFeed from '../parts/ChatFeed'
import ChatList from '../parts/ChatList'
import { default as _ChatService } from '../services/ChatService'
import { ChatMediaModal } from '../components'
import authState from '~/common/store/authState'
import ChatPreferenceModal from '../components/ChatPreferenceModal/ChatPreferenceModal'
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
    const history = useHistory()
    if(!auth.isLoggedIn) history.push('/login')
    const user_id = auth.user.id
    const [ChatService] = useState(() => new _ChatService(auth.user, handleGetConversation, handleGetShop, handleIncomingMessage))
    const { id: router_id } = useParams()

    const [currentConversation, setCurrentConversation] = useState(0)
    const lastBubbleRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [preferenceOpen, setPreferenceOpen] = useState(false)
    const [mediaMessage, setMediaMessage] = useState({})
    const [lastUpdate, setLastUpdate] = useState(nanoid())
    const classes = useStyles()
    const [shouldScroll, setShouldScroll] = useState(false)
    const [isCustomerView, setIsCustomerView] = useState(true)

    // console.log('rendering with messages: ', messages)

    function handleGetConversation() {
        setShouldScroll(true)
    }

    function handleGetShop() {
        console.log(ChatService.shop)
    }

    function handleGetShop() {
        console.log(ChatService.shop)
    }

    function handleIncomingMessage(message) {
        setShouldScroll(true)
    }

    function handleChangeView(newView) {
        console.log(newView ? 'use customer view' : 'use seller view')
        setIsCustomerView(newView)
        setCurrentConversation(0)
    }

    function handleChangeView(newView) {
        console.log(newView ? 'use customer view' : 'use seller view')
        setIsCustomerView(newView)
        setCurrentConversation(0)
    }

    function handleSubmitMessage(text) {
        if (text === '') return

        ChatService.send('text', text, currentConversation)
    }

    function handleUpload(type, file) {
        if (type === 'image') {
            ChatService.send('image', file, currentConversation)
        } else if (type === 'video') {
            ChatService.send('video', file, currentConversation)
        }
    }

    function changeChat(newConversationId) {
        if(!newConversationId) return
        
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
        console.log(type, conversation_id, message_id)
        if(Number.isInteger(message_id)) {
            setMediaMessage(ChatService.conversation(conversation_id).messages.find(m => m.id === message_id)) 
        } else {
            setMediaMessage(ChatService.conversation(conversation_id).messages.find(m => m.temp_id === message_id))
        }
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    function openPreference() {
        setPreferenceOpen(true)
    }

    function closePreference() {
        console.log('try close')
        setPreferenceOpen(false)
    }

    useEffect(() => {
        if (auth.isLoggedIn && router_id) {
            console.log('opening chat page for ' + (parseInt(router_id) ? 'id#' : 'url slug ') + router_id)
            ChatService.getConversationId(parseInt(router_id), (id) => {
                console.log('get coonv ' + id + ' complete')
                // console.log(ChatService.conversation(id))
                changeChat(id)
            })
        }
    }, [router_id])

    useEffect(() => {
        setInterval(() => {
            // Realtime ปลอม!
            // If it works, it works :)
            setLastUpdate(nanoid())
        }, 500)
    }, [])

    return (
        <Box className={classes.chatLayout}>
            <ChatList
                user_id={user_id}
                user_name={auth.user?.customer_info?.firstname}
                user_pic={
                    auth.user?.customer_picture
                        ?.picture_id_from_customer_picture?.path
                }
                currentConversation={currentConversation}
                setCurrent={changeChat}
                ChatService={ChatService}
                lastUpdate={lastUpdate}
                setView={handleChangeView}
                isCustomerView={isCustomerView}
            />
            <ChatFeed
                handleSubmitMessage={handleSubmitMessage}
                handleUpload={handleUpload}
                user_id={user_id}
                currentConversation={currentConversation}
                ChatService={ChatService}
                forwardedRef={lastBubbleRef}
                openModal={openModal}
                openPreference={openPreference}
                lastUpdate={lastUpdate}
                shouldScroll={shouldScroll}
                isCustomerView={isCustomerView}
            />
            <ChatMediaModal
                open={open}
                onClose={closeModal}
                message={mediaMessage}
            />
            <ChatPreferenceModal
                open={preferenceOpen}
                onClose={closePreference}
                shop_name={ChatService?.shop?.name}
            />
        </Box>
    )
}

export default ChatPage
