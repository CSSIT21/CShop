import React from 'react';
import { Box } from '@mui/system';

import useStyles from './ProfileBar.styles'

const ProfileBar = props => {
    const classes = useStyles()

    return <Box className={classes.container}>
        Profile bar
    </Box>;
};

export default ProfileBar;