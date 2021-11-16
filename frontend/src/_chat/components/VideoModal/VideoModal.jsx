import React from 'react'
import { Box } from '@mui/system'
import { Card } from '@mui/material'
import useStyles from './VideoModal.styles'

const VideoModal = (props) => {
    const classes = useStyles()

    return (
        <Card className={classes.imageModalStyle}>
            <video controls>
                <source type="video/mp4" src={props.src} />
            </video>
        </Card>
    )
}

export default VideoModal
