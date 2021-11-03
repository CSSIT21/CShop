import React, { useState } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import ChatFeed from "../parts/ChatFeed";
import ChatList from "../parts/ChatList";
import ChatService from "../services/ChatService";
import NavBar from "../components/NavBar";

const useStyles = makeStyles({
 
  chatLayout: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100vw",
    position: "absolute",
    left: "0px",
    right: "0px",
    top: "0px",
    buttom: "0px",
  },
});

const ChatPage = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.chatLayout}>
      <ChatList />
      <ChatFeed />
    </Box>
  );
};

export default ChatPage;
