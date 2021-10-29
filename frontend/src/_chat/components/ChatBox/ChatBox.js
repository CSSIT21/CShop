import React from 'react';
import { Box } from '@mui/system';

import useStyles from './ChatBox.styles'

const ChatBox = props => {
    const classes = useStyles()

    return <Box className={classes.container}>
        Chatboxes in ChatList
    </Box>;
};

export default ChatBox;