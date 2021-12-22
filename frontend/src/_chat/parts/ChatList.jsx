import React from 'react'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import { AddChatModal, ChatBox } from '../components'
import { Button, Typography, CircularProgress } from '@mui/material'
import ChooseUser from '../components/ChooseUser/ChooseUser'

const useStyles = makeStyles({
    chatListContainer: {
        height: '100%',
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '0px',
        borderRight: '2px solid #eff0f6'
    },
    chatListTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '72px',
        justifyContent: 'space-between'
    },
    chatPageHeading: {
        fontSize: '22px !important',
        fontWeight: '500 !important',
        marginLeft: '16px !important'
    },
    chatList: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '8px',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
    },
    chatListButtom: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '72px',
        padding: '8px'
    },
    addNewChatButton: {
        backgroundColor: 'white',
        borderRadius: '10px !important'
    },
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        color: 'rgba(0,0,0,0.5)'
    }
})

const ChatList = (props) => {
    // console.log(props.messages.size)
    const classes = useStyles()
    const messages = props.ChatService.messages
    if (messages.length === 0) {
        return (
            <Box className={classes.chatListContainer}>
                <Box className={classes.chatListTitle}>
                    <Typography className={classes.chatPageHeading}>
                        Chat
                    </Typography>
                </Box>
                <Box className={classes.loader}>
                    {props.ChatService.isGetting ? (
                        <CircularProgress color="primary" />
                    ) : (
                        'Your chatbox is empty'
                    )}
                </Box>
            </Box>
        )
    }

    return (
        <Box className={classes.chatListContainer}>
            {/* ChatList on the left lists all users that have a messages */}
            <Box className={classes.chatListTitle}>
                <Typography className={classes.chatPageHeading}>
                    Chat
                </Typography>
                {!props.ChatService._isCustomer && (
                    <ChooseUser
                        selected_name={
                            props.isCustomerView
                                ? props.user_name
                                : props.ChatService.shop.name
                        }
                        selected_pic={
                            props.isCustomerView
                                ? props.user_pic
                                : props.ChatService.shop.pic
                        }
                        user_name={props.user_name}
                        shop_name={props.ChatService.shop.name}
                        setView={props.setView}
                    />
                )}
            </Box>
            <Box className={classes.chatList}>
                {messages &&
                    messages.map((message, i) =>
                        (message.id === -1 || (message.customer_id === props.user_id && !props.isCustomerView) || (message.customer_id !== props.user_id && props.isCustomerView)) ? (
                            <></>
                        ) : (
                            <ChatBox
                                key={i}
                                displayName={
                                    message.customer_id === props.user_id
                                        ? message.shop_name
                                        : message.firstname +
                                          ' ' +
                                          message.lastname
                                }
                                contentType={message.content_type}
                                fromCustomer={message.from_customer}
                                latestText={message.latest_text}
                                pic={
                                    message.customer_id === props.user_id
                                        ? message.shop_pic
                                        : message.customer_pic
                                }
                                isFilled={
                                    props.currentConversation === message.id
                                }
                                setCurrent={() => {
                                    props.setCurrent(message.id)
                                    console.log(
                                        '%c ChatList.jsx %c switched to ' +
                                            message.shop_name,
                                        'color:#004254;background:#5ce1ff',
                                        ''
                                    )
                                }}
                                read={message.seen}
                                isCustomerView={props.isCustomerView}
                            />
                        )
                    )}
            </Box>
            {/* <Box className={classes.chatListButtom}>
                <Button
                    variant="contained"
                    className={classes.addNewChatButton}
                    sx={{
                        backgroundColor: '#FD6637',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    Add New Chat
                </Button>
            </Box> */}
        </Box>
    )
}

export default ChatList
