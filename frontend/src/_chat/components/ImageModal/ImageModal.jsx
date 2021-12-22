import React from 'react'
import { Card, CardMedia, IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import useStyles from './ImageModal.styles'

const ImageModal = React.forwardRef((props, ref) => {
    const classes = useStyles()

    return (
        <Card className={classes.imageModalStyle}>
            <CardMedia component="img" image={props.src} alt="image modal" />
            <IconButton className={classes.closeButton} onClick={props.onClose}>
                <CloseRoundedIcon sx={{ color: 'white' }} fontSize="large" />
            </IconButton>
        </Card>
    )
})

export default ImageModal
