import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'

import useStyles from './ChatMediaModal.styles'
import ImageModal from '../ImageModal/ImageModal'
import VideoModal from '../VideoModal/VideoModal'

const ChatMediaModal = (props) => {
    const classes = useStyles()

    const [content, setContent] = useState('')

    useEffect(() => {
        console.log(props)
        if(!props.message.id)
        {
            // setContent(decompress(sessionStorage.getItem(props.message.temp_id)))
            // setContent(sessionStorage.getItem(props.message.temp_id))
            console.log('cant open, loading')
        }
        else
        {
            setContent(props.message.content)
        }
    }, [props.message.id, props.message.temp_id])

    // const content = props.message.id ? props.message.content : decompress(sessionStorage.getItem(props.temp_id))

    return (
        <Modal
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={props.open}
            className={classes.modalStyle}
            onClose={props.onClose}
        >
            {props.message.content_type === 'Image' ? (
                <ImageModal src={content} onClose={props.onClose} />
            ) : (
                <VideoModal src={content} onClose={props.onClose} />
            )}
        </Modal>
    )
}

export default ChatMediaModal
