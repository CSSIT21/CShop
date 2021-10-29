import React from 'react';
import { Box } from '@mui/system';

import useStyles from './VideoModal.styles'

const VideoModal = props => {
    const classes = useStyles()

    return <Box className={classes.container}>
        Modal for videos
    </Box>;
};

export default VideoModal;