import React from 'react'
import { Box } from '@mui/system'

import useStyles from './ChatMediaModal.styles'
import { Modal, Button, Typography } from '@mui/material'
import ImageModal from '../ImageModal/ImageModal'
import VideoModal from '../VideoModal/VideoModal'
import ChatService from '../../services/ChatService'

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
                <ImageModal src={message.content} />
            ) : (
                <VideoModal src={message.content} />
            )}
        </Modal>
    )
}

export default ChatMediaModal
