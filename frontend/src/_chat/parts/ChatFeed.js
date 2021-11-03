import React from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

import {
  ChatBubble,
  ChatMediaModal,
  MessageBar,
  ProfileBar,
} from "../components";

const useStyles = makeStyles({
  chatFeedContainer: {
    width: "70vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0px",
  },
  chatFeedTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "inherit",
    height: "10vh",
  },
  chatFeed: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "inherit",
    height: "80vh",
    background: "#FDF4DD",
  },
  chatFeedButtom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "inherit",
    height: "10vh",
  },
});

const ChatFeed = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.chatFeedContainer}>
      {/* ChatFeed on the right shows all messages between two users */}
      <Box className={classes.chatFeedTitle}></Box>
      <Box className={classes.chatFeed}></Box>
      <Box className={classes.chatFeedButtom}></Box>
    </Box>
  );
};

export default ChatFeed;
