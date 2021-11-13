import React from 'react'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import { AddChatModal, ChatBox } from '../components'
import { Button } from '@mui/material'

const useStyles = makeStyles({
  chatListContainer: {
    height: '100%',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '0px',
  },
  chatListTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    background: '#FDF4DD',
    height: '72px',
  },
  chatList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '8px',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  chatListButtom: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    background: '#FDF4DD',
    height: '72px',
    padding: '8px'
  },
  addNewChatButton: {
    backgroundColor: 'white',
  },
})


const ChatList = (props) => {
  const classes = useStyles()

  console.log(props.latest)
  return (
    <Box className={classes.chatListContainer}>
      {/* ChatList on the left lists all users that have a conversation */}
      <Box className={classes.chatListTitle} />
      <Box className={classes.chatList}>
        {props.latest.map((message) => (
          <ChatBox
            displayName={
              message.sender === props.user_id
                ? props.ChatService.userWithId(message.recipient).displayname
                : props.ChatService.userWithId(message.sender).displayname
            }
            lastMessage={message.content}
            pic={
              message.sender === props.user_id
                ? props.ChatService.userWithId(message.recipient).pic
                : props.ChatService.userWithId(message.sender).pic
            }
            isFilled={props.currentChatUserId === message.sender || props.currentChatUserId === message.recipient}
            setCurrent={() => props.setCurrent(message.sender === props.user_id ? message.recipient : message.sender)}
            read={message.seen}
          />
        ))}
      </Box>
      <Box className={classes.chatListButtom}>
        <Button
          variant='contained'
          className={classes.addNewChatButton}
          sx={{ backgroundColor: '#FD6637', width: '100%', height: '100%' }}
        >
          Add New Chat
        </Button>
      </Box>
    </Box>
  )
}

export default ChatList
