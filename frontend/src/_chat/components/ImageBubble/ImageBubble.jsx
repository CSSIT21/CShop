import React, { useEffect, useRef, useState } from 'react'
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import useStyles from './ImageBubble.styles'

const ImageBubble = (props) => {
    const classes = useStyles()
    const [loaded, setLoaded] = useState(false)
    const imgRef = useRef(null)

    useEffect(() => {
        fetch(props.src)
            .then((response) => response.blob())
            .then((blob) => {
                var url = URL.createObjectURL(blob)
                var img = new Image()
                img.src = url
                img.onload = function () {
                    imgRef.current.src = url
                    imgRef.current.style.opacity = 1
                    imgRef.current.style.width = 'auto'
                    imgRef.current.style.height = this.height + 'px'
                }
                img.remove()
                setLoaded(true)
            })
    })

    return (
        <Card className={classes.imageBubble}>
            <CardActionArea>
                {!loaded && (
                    <CardContent className={classes.imageSpinner}>
                        <CircularProgress color="secondary" />
                    </CardContent>
                )}
                <CardMedia
                    component="img"
                    image={null}
                    alt="Image bubble"
                    ref={imgRef}
                />
            </CardActionArea>
        </Card>
    )
}

export default ImageBubble
