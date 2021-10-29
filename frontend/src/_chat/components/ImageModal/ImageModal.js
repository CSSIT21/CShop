import React from 'react';
import { Box } from '@mui/system';

import useStyles from './ImageModal.styles'

const ImageModal = props => {
    const classes = useStyles()

    return <Box className={classes.container}>
        Modal for images
    </Box>;
};

export default ImageModal;