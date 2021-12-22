import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/system'
import { IconButton, Tooltip } from '@mui/material'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import SendIcon from '@mui/icons-material/Send'

import useStyles from './MessageBar.styles'
import InputBox from '../InputBox/InputBox'

const MessageBar = (props) => {
    const inputRef = useRef(null)
    const vidInputRef = useRef(null)
    const imgInputRef = useRef(null)
    const classes = useStyles()
    let inputSubmitted = true

    useEffect(() => {
        window.addEventListener('keydown', handleEnterKey)
        // console.log(
        //     '%c MessageBar.jsx %c listening for keydown...',
        //     'color:#e0c7ff;background:#590db5',
        //     ''
        // )

        return () => {
            window.removeEventListener('keydown', handleEnterKey)
            // console.log(
            //     '%c MessageBar.jsx %c removed keydown listener',
            //     'color:#e0c7ff;background:#590db5',
            //     ''
            // )
        }
    })

    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            console.groupEnd()
            submitText(e)
            inputSubmitted = true
        } else {
            if (inputSubmitted) {
                // console.groupCollapsed(
                //     '%c MessageBar.jsx %c keydown rejected',
                //     'color:#e0c7ff;background:#590db5',
                //     ''
                // )
            }
            // console.log(e.key)
            inputSubmitted = false
        }
    }

    function submitText(e) {
        if (inputRef.current.childNodes[0].value === '') return
        // console.log(
        //     `%c MessageBar.jsx %c submitted '${inputRef.current.childNodes[0].value}' to conv#${props.currentConversation}`,
        //     'color:#e0c7ff;background:#590db5',
        //     ''
        // )
        props.handleSubmitMessage(inputRef.current.childNodes[0].value)
        inputRef.current.childNodes[0].value = ''
        inputRef.current.childNodes[0].focus()
    }

    function submitVideo(e) {
        // console.log(
        //     `%c MessageBar.jsx %c submitted video '${e.target.files[0].name}' to conv#${props.currentConversation}`,
        //     'color:#e0c7ff;background:#590db5',
        //     ''
        // )
        if (e.target.files.length < 1) return
        
        props.handleUpload('video', e.target.files[0])
        vidInputRef.current.value = ''
    }

    function submitImage(e) {
        // console.log(
        //     `%c MessageBar.jsx %c submitted image '${e.target.files[0].name}' to conv#${props.currentConversation}`,
        //     'color:#e0c7ff;background:#590db5',
        //     ''
        // )

        if (e.target.files.length < 1) return
        
        props.handleUpload('image', e.target.files[0])
        imgInputRef.current.value = ''
    }
    return (
        <Box className={classes.container}>
            <Box>
                <input
                    accept="video/*"
                    type="file"
                    ref={vidInputRef}
                    onChange={submitVideo}
                    style={{ display: 'none' }}
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={imgInputRef}
                    onChange={submitImage}
                    style={{ display: 'none' }}
                />
                <Tooltip title="Upload video">
                    <IconButton onClick={() => vidInputRef.current.click()}>
                        <VideoLibraryOutlinedIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Upload image">
                    <IconButton onClick={() => imgInputRef.current.click()}>
                        <PhotoLibraryOutlinedIcon color="primary" />
                    </IconButton>
                </Tooltip>
            </Box>
            <InputBox aria-label="Message input box" forwardedRef={inputRef} />
            <Tooltip title="Send">
                <IconButton onClick={submitText}>
                    <SendIcon color="primary" />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default MessageBar
