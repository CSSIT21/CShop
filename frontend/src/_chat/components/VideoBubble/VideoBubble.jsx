import React from 'react';
import { Box } from '@mui/system';

import useStyles from './VideoBubble.styles'

const VideoBubble = props => {
    const classes = useStyles()

    return <Box className={classes.container}>
        Chat bubble for videos
    </Box>;
};

export default VideoBubble;