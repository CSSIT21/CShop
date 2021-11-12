import React from 'react';
import { Box } from '@mui/system';

import useStyles from './ChatMediaModal.styles'

const ChatMediaModal = props => {
    const classes = useStyles()

    return <Box className={classes.container}>
        Wrapper for chat media modal
    </Box>;
};

export default ChatMediaModal;