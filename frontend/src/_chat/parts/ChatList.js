import React from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { AddChatModal, ChatBox } from "../components";
import { Avatar, Button, Card } from "@mui/material";

const useStyles = makeStyles({
  chatListContainer: {
    height: "100vh",
    width: "30vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0px",
  },
  chatListTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "inherit",
    background: "#FDF4DD",
    height: "10vh",
  },
  chatList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "inherit",
    height: "80vh",
    overflowX: "hidden",
    overflowY: "scroll",
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
  chatListButtom: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "inherit",
    background: "#FDF4DD",
    height: "10vh",
  },
  addNewChatButton: {
    backgroundColor: "white",
  },
});


const ChatList = (props) => {
  const classes = useStyles();

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
            currentChat={props.currentChat}
            sender={(message.sender === props.user_id)?message.recipient:message.sender}
            read={message.seen}
          />
        ))}
      </Box>
      <Box className={classes.chatListButtom}>
        <Button
          variant="contained"
          className={classes.addNewChatButton}
          sx={{ backgroundColor: "#FD6637", width: "90%", height: "65%" }}
        >
          Add New Chat
        </Button>
      </Box>
    </Box>
  );
};

export default ChatList;
