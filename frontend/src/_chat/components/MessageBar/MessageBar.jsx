import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import SendIcon from '@mui/icons-material/Send'

import useStyles from './MessageBar.styles'
import InputBox from '../InputBox/InputBox'

const MessageBar = props => {
    let focus = false
    const [empty, setEmpty] = useState(true)
    const classes = useStyles()

    function handleFocus(e) {
        focus = true
    }

    function handleBlur(e) {
        focus = false
    }

    function handleChangeInputText(e) {
        setEmpty(false)
        props.setInputText(e.target.value)
    }

    function handleSubmitMessage(e) {
        setEmpty(true)
        props.handleSubmitMessage(e)
    }

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if(focus && e.key === 'Enter') {
                handleSubmitMessage(e)
            }
        })
    }, [])

    return <Box className={classes.container}>
        <Box>
            <IconButton>
                <VideoLibraryOutlinedIcon color='primary' />
            </IconButton>
            <IconButton>
                <PhotoLibraryOutlinedIcon color='primary' />
            </IconButton>
        </Box>
        <InputBox
            aria-label='Message input box'
            onChange={handleChangeInputText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={empty ? '' : undefined}
        />
        <IconButton onClick={handleSubmitMessage} >
            <SendIcon color='primary' />
        </IconButton>
    </Box>
}

export default MessageBar;