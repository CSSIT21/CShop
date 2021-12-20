import React, { useEffect, useRef } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, CircularProgress } from '@mui/material'
import useStyles from './VideoBubble.styles'
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded'

const VideoBubble = (props) => {
    const classes = useStyles()
    const imgRef = useRef(null)

    useEffect(() => {
        fetch(props.thumbnail)
            .then((response) => response.blob())
            .then((blob) => {
                var url = URL.createObjectURL(blob)
                var img = new Image()
                img.src = url
                img.onload = function () {
                    imgRef.current.src = url
                    imgRef.current.style.opacity = 1
                    if (this.naturalWidth >= this.naturalHeight) {
                        imgRef.current.style.height = `calc(28vw * ${
                            this.naturalHeight / this.naturalWidth
                        })`
                    } else {
                        imgRef.current.style.height = 'calc(75vh - 191.25px)'
                        setTimeout(() => {
                            imgRef.current.style.width =
                                (this.naturalWidth / this.naturalHeight) *
                                    imgRef.current.clientHeight +
                                'px'
                        }, 500)
                    }
                    console.log(
                        `${this.naturalWidth} x ${this.naturalHeight} -> ${
                            this.naturalHeight / this.naturalWidth
                        }`
                    )
                }
                img.remove()
            })
    }, [props.thumbnail, props.src])

    return (
        <Card className={classes.videoBubble} onClick={props.openModal}>
            <CardActionArea>
                <CardContent className={classes.videoThumbnailPlay}>
                    {props.isUploading ? (
                        <PlayCircleOutlineRoundedIcon
                            className={classes.videoThumbnailPlayIcon}
                        />
                    ) : (
                        <CircularProgress color="secondary" />
                    )}
                </CardContent>
                <CardMedia
                    component="img"
                    image={null}
                    alt="Video thumbnail"
                    ref={imgRef}
                />
            </CardActionArea>
        </Card>
    )
}

export default VideoBubble
