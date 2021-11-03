import React from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

import { AddChatModal, ChatBox } from "../components";
import { Button } from "@mui/material";

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
    flexDirection: "column",
    alignItems: "flex-start",
    width: "inherit",
    height: "80vh",
    overflowX: "hidden",
    overflowY: "scroll",
  },
  chatListButtom: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "inherit",
    background: "#FDF4DD",
    height: "10vh",
  },
});

const ChatList = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.chatListContainer}>
      {/* ChatList on the left lists all users that have a conversation */}
      <Box className={classes.chatListTitle}></Box>
      <Box className={classes.chatList}></Box>
      <Box className={classes.chatListButtom}>
        <Button variant="contained">Add New Chat</Button>
      </Box>
    </Box>
  );
};

export default ChatList;
