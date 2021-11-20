import React from 'react'
import { Modal } from '@mui/material'

import useStyles from './ChatMediaModal.styles'
import ImageModal from '../ImageModal/ImageModal'
import VideoModal from '../VideoModal/VideoModal'

const ChatMediaModal = (props) => {
    const classes = useStyles()

    const message = props.ChatService.messageWithId(props.message_id)

    return (
        <Modal
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={props.open}
            className={classes.modalStyle}
            onClose={props.onClose}
        >
            {message.content_type === 'Image' ? (
                <ImageModal src={message.content} onClose={props.onClose} />
            ) : (
                <VideoModal src={message.content} onClose={props.onClose} />
            )}
        </Modal>
    )
}

export default ChatMediaModal
