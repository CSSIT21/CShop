import React from 'react'
import { Box } from '@mui/system'
import { Card, CardMedia } from '@mui/material'
import useStyles from './ImageModal.styles'

const ImageModal = (props) => {
    const classes = useStyles()

    return (
        <Card className={classes.imageModalStyle}>
            <CardMedia component="img" image={props.src} alt="image modal" />
        </Card>
    )
}

export default ImageModal
