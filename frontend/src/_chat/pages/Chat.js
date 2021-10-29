import React, { useState } from 'react'
import { Box } from '@mui/system'

import ChatFeed from '../parts/ChatFeed';
import ChatList from '../parts/ChatList';
import ChatService from '../services/ChatService';

const ChatPage = props => {
    return <Box>
        Hello, this is ChatPage
        <ChatList />
        <ChatFeed />
    </Box>;
};

export default ChatPage;