import React from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles'

import { AddChatModal, ChatBox } from '../components';

const classes = makeStyles({
    container: {
        // styles here
    }
});

const ChatList = props => {
    return <Box className={classes.container}>
        ChatList on the left lists all users that have a conversation
    </Box>;
};

export default ChatList;