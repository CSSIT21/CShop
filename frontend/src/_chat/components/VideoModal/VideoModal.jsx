import React from 'react'
import { Box } from '@mui/system'
import { Card, CardMedia, IconButton } from '@mui/material'
import useStyles from './VideoModal.styles'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

const VideoModal = (props) => {
    const classes = useStyles()

    return (
        <Card className={classes.videoModalStyle}>
            <CardMedia component="video" src={props.src} controls />
            <IconButton className={classes.closeButton}>
                <CloseRoundedIcon
                    onClick={props.onClose}
                    sx={{ color: 'white' }}
                    fontSize="large"
                />
            </IconButton>
        </Card>
    )
}

export default VideoModal
