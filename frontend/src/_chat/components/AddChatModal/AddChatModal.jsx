import React from 'react'
import { Box } from '@mui/system'

import useStyles from './AddChatModal.styles'

const AddChatModal = (props) => {
    const classes = useStyles()

    return <Box className={classes.container}>Modal for adding new chat</Box>
}

export default AddChatModal
