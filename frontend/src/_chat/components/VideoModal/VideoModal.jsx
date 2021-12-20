import React from 'react'
import { Card, CardMedia, IconButton } from '@mui/material'
import useStyles from './VideoModal.styles'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

const VideoModal = React.forwardRef((props, ref) => {
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
})

export default VideoModal
