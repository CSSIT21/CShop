import React from 'react';
import { Box } from '@mui/system';

import useStyles from './MessageBar.styles'

const MessageBar = props => {
    const classes = useStyles()

    return <Box className={classes.container}>
        Message bar for sending messages
    </Box>;
};

export default MessageBar;