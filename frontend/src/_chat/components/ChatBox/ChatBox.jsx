import React from 'react'
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

const ChatBox = (props) => {
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
      backgroundColor: background
    },
    cardAction: {
      display: 'flex',
      width: '100%',
      height: '100%',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    avatar: {
      width: '48px',
      height: '48px',
      marginLeft: '12px'
    },
    cardText: {
      width: '100%',
      height: 'calc(100% - 24px)',
      margin: '0px 12px'
    },
    typography: {
      height: '50%',
      lineHeight: '24px',
      '&:first-child': {
        color: props.isFilled ? 'white' : 'black',
      },
      '&:last-child': {
        color: props.isFilled ? 'white' : '#A0A3BD',
      }
    },
    circle: {
      color: '#FD6637',
      width: 12,
      marginRight: '15px'
    }
  }

  return (
    <Card sx={classes.card} variant='outlined' onClick={props.setCurrent}>
      <CardActionArea sx={classes.cardAction}>
        <Avatar
          alt='User Pic'
          src={props.pic}
          sx={classes.avatar}
        />
        <Box sx={classes.cardText}>
          <Typography variant='h6' sx={classes.typography}>{props.displayName}</Typography>
          <Typography variant='body2' sx={classes.typography}>{props.lastMessage}</Typography>
        </Box>
          
        {props.read && <CircleIcon sx={classes.circle}/>}
      
      </CardActionArea>
    </Card>
  )
}

export default ChatBox
