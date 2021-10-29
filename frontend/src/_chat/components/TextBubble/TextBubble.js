import React from 'react';
import { Box } from '@mui/system';

import useStyles from './TextBubble.styles'

const TextBubble = props => {
    const classes = useStyles()

    return <Box className={classes.container}>
        Chat bubble for text
    </Box>;
};

export default TextBubble;