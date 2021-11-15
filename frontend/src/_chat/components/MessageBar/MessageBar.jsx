import React, { useState, useEffect, useRef } from 'react'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import SendIcon from '@mui/icons-material/Send'

import useStyles from './MessageBar.styles'
import InputBox from '../InputBox/InputBox'

const MessageBar = (props) => {
    const inputRef = useRef(null)
    const classes = useStyles()
    let inputSubmitted = true

    useEffect(() => {
        window.addEventListener('keydown', handleEnterKey)
        console.log(
            '%c MessageBar.jsx %c listening for keydown...',
            'color:#e0c7ff;background:#590db5',
            ''
        )

        return () => {
            window.removeEventListener('keydown', handleEnterKey)
            console.log(
                '%c MessageBar.jsx %c removed keydown listener',
                'color:#e0c7ff;background:#590db5',
                ''
            )
        }
    })

    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            console.groupEnd()
            submit(e)
            inputSubmitted = true
        } else {
            if (inputSubmitted) {
                console.groupCollapsed(
                    '%c MessageBar.jsx %c keydown rejected',
                    'color:#e0c7ff;background:#590db5',
                    ''
                )
            }
            console.log(e.key)
            inputSubmitted = false
        }
    }

    function submit(e) {
        if (inputRef.current.childNodes[0].value === '') return
        console.log(
            `%c MessageBar.jsx %c submitted '${inputRef.current.childNodes[0].value}' to user#${props.currentChatUserId}`,
            'color:#e0c7ff;background:#590db5',
            ''
        )
        props.handleSubmitMessage(inputRef.current.childNodes[0].value)
        inputRef.current.childNodes[0].value = ''
        inputRef.current.childNodes[0].focus()
    }

    return (
        <Box className={classes.container}>
            <Box>
                <IconButton>
                    <VideoLibraryOutlinedIcon color="primary" />
                </IconButton>
                <IconButton>
                    <PhotoLibraryOutlinedIcon color="primary" />
                </IconButton>
            </Box>
            <InputBox aria-label="Message input box" forwardedRef={inputRef} />
            <IconButton onClick={submit}>
                <SendIcon color="primary" />
            </IconButton>
        </Box>
    )
}

export default MessageBar
