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
                    if(this.naturalWidth >= this.naturalHeight) {
                        imgRef.current.style.height = `calc(28vw * ${
                            this.naturalHeight / this.naturalWidth
                        })`
                    } else {
                        imgRef.current.style.height = 'calc(75vh - 191.25px)'
                        setTimeout(() => {
                            imgRef.current.style.width = (this.naturalWidth / this.naturalHeight) * imgRef.current.clientHeight + 'px'
                        }, 500)
                    }
                    console.log(
                        `${this.naturalWidth} x ${this.naturalHeight} -> ${
                            this.naturalHeight / this.naturalWidth
                        }`
                    )
                }
                img.remove()
                setLoaded(true)
            })
    }, [props.src])

    return (
        <Card className={classes.imageBubble} onClick={props.openModal}>
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
