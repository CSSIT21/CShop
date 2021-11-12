import React from 'react';
import { Box } from '@mui/system';

import useStyles from './ImageBubble.styles'

const ImageBubble = props => {
    const classes = useStyles()

    return <Box className={classes.container}>
        Chat bubble for images
    </Box>;
};

export default ImageBubble;