import React from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles'

import { ChatBubble, ChatMediaModal, MessageBar, ProfileBar } from '../components'

const classes = makeStyles({
    container: {
        // styles here
    }
});

const ChatFeed = props => {
    return <Box className={classes.container}>
        ChatFeed on the right shows all messages between two users
    </Box>;
};

export default ChatFeed;