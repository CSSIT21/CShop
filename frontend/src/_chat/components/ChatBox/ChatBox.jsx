import React, { useEffect } from 'react'
import useStyles from './ChatBox.styles'
import CircleIcon from '@mui/icons-material/Circle'
import {
    Avatar,
    Box,
    Card,
    CardHeader,
    CardActionArea,
    Typography
} from '@mui/material'

const ChatBox = React.forwardRef((props, ref) => {
    // const classes = useStyles() -> somehow useStyles does not work with sx, will fix later
    const background = props.isFilled ? '#FD6637' : '#FFFFFF'
    const foreground = props.isFilled ? '#FFFFFF' : '#000000'
    const classes = {
        card: {
            width: '100%',
            height: '72px',
            marginBottom: '10px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: background,
            // transition: 'all 300ms ease'
        },
        cardAction: {
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
        },
        avatar: {
            width: '48px',
            height: '48px',
            marginLeft: '12px'
        },
        cardText: {
            width: 'calc(100% - 110px)',
            height: 'calc(100% - 24px)',
            margin: '0px 12px',
        },
        typography: {
            height: '50%',
            width: 'calc(30vw - 100px)',
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: props.isFilled ? 'white' : 'black !important'
        },
        circle: {
            color: '#FD6637',
            width: 12,
            marginRight: '15px'
        },
        circleRead: {
            color: 'transparent',
            width: 12,
            marginRight: '15px'
        }
    }

    let lastMessage = ''
    // if (props.fromCustomer) lastMessage += 'You: '
    if (props.contentType === 'Text') {
        lastMessage += props.latestText
    } else {
        lastMessage += props.contentType
    }
    // console.log(props.contentType, props.fromCustomer, props.latestText)

    useEffect(() => {
        console.log(props.displayName, props.read, props.fromCustomer)
    }, [props.latestText])
    

    return (
        <Card sx={classes.card} variant="outlined" onClick={props.setCurrent}>
            <CardActionArea sx={classes.cardAction}>
                <Avatar alt="User Pic" src={props.pic} sx={classes.avatar} />
                <Box sx={classes.cardText}>
                    <Typography variant="h6" sx={classes.typography}>
                        {props.displayName}
                    </Typography>
                    <Typography variant="body2" sx={classes.typography}>
                        {lastMessage}
                    </Typography>
                </Box>

                <CircleIcon sx={(props.fromCustomer || props.read) ? classes.circleRead : classes.circle} />
            </CardActionArea>
        </Card>
    )
})

export default ChatBox
