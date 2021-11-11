import React from "react";
import { Box } from "@mui/system";
import { useState } from "react";
import useStyles from "./ChatBox.styles";
import CircleIcon from '@mui/icons-material/Circle';
import ChatList from "../../parts/ChatList";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
  CardActionArea
} from "@mui/material";

const ChatBox = (props) => {
  const classes = useStyles();
  const background = props.isFilled ? '#FD6637' : '#FFFFFF'
  const foreground = props.isFilled ? '#FFFFFF' : '#000000'
  return (
      
    <Card sx={{width: 1, marginBottom: 0.5, border: 0, borderRadius: 3, background: background}} variant="outlined" onClick={()=>props.currentChat(props.sender)}>
      <CardActionArea sx={{display: 'flex', width: 1, justifyContent:'space-between', alignItems:'center'}}>
        <CardHeader sx={{color: foreground}}
          avatar={
            <Avatar
              alt="User Pic"
              src={props.pic}
              sx={{ width: 56, height: 56 }}
            />
          }
          title={props.displayName}
          subheader={props.lastMessage}
        />
          
        {props.read && <CircleIcon sx={{color: '#FD6637', width:12, marginRight:'15px'}}/>}
      
      </CardActionArea>
    </Card>
  );
};

export default ChatBox;
