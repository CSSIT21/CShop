import React, { useState, useEffect, useRef } from 'react'
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
    const inputRef = useRef(null)
    const classes = useStyles()
    // console.log(
    //   "%c rendered %cMessageBar ",
    //   "color:#004254;background:#5ce1ff;font-weight:bold",
    //   "color:#004254;background:#5ce1ff;font-weight:normal"
    // );
    // console.log(
    //   "%c removed %ckeybind ",
    //   "color:white;background:green;font-weight:bold",
    //   "color:white;background:green;font-weight:normal"
    // );
    window.addEventListener("keydown", (e) => {
      if (focus && e.key === "Enter") {
        submit(e);
      }
    });
    // console.log(
    //   "%c binded %cEnter key ",
    //   "color:white;background:green;font-weight:bold",
    //   "color:white;background:green;font-weight:normal"
    // );

    function handleFocus(e) {
        focus = true
    }

    function handleBlur(e) {
        focus = false
    }

    function submit(e) {
        props.handleSubmitMessage(inputRef.current.childNodes[0].value)
        inputRef.current.childNodes[0].value = ''
    }

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
            onFocus={handleFocus}
            onBlur={handleBlur}
            forwardedRef={inputRef}
        />
        <IconButton onClick={submit} >
            <SendIcon color='primary' />
        </IconButton>
    </Box>
}

export default MessageBar;