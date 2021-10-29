import React from 'react';
import { Box } from '@mui/system';

import useStyles from './ChatBubble.styles'

const ChatBubble = props => {
    const classes = useStyles()

    return <Box className={classes.container}>
        Chat bubbles wrapper
    </Box>;
};

export default ChatBubble;