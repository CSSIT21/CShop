import React from 'react'
import { Modal } from '@mui/material'

import useStyles from './ChatMediaModal.styles'
import ImageModal from '../ImageModal/ImageModal'
import VideoModal from '../VideoModal/VideoModal'

const ChatMediaModal = (props) => {
    const classes = useStyles()

    return (
        <Modal
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={props.open}
            className={classes.modalStyle}
            onClose={props.onClose}
        >
            {props.message.content_type === 'Image' ? (
                <ImageModal src={props.message.content} onClose={props.onClose} />
            ) : (
                <VideoModal src={props.message.content} onClose={props.onClose} />
            )}
        </Modal>
    )
}

export default ChatMediaModal
