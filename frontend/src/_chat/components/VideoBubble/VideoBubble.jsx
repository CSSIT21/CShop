import React from 'react'
import { Box } from '@mui/system'
import { Card, CardActionArea, CardMedia } from '@mui/material'
import useStyles from './VideoBubble.styles'

const VideoBubble = (props) => {
    const classes = useStyles()

    return (
        <Card className={classes.videoBubble}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={props.thumbnail}
                    alt="Video thumbnail"
                />
            </CardActionArea>
        </Card>
    )
}

export default VideoBubble
