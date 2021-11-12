import React from 'react'
import useStyles from './ChatBox.styles'
import CircleIcon from '@mui/icons-material/Circle'
import {
  Avatar,
  Card,
  CardHeader,
  CardActionArea
} from '@mui/material'

const ChatBox = (props) => {
  // const classes = useStyles() -> somehow useStyles does not work with sx, will fix later
  const background = props.isFilled ? '#FD6637' : '#FFFFFF'
  const foreground = props.isFilled ? '#FFFFFF' : '#000000'
  const classes = {
    card: {
      width: 1,
      marginBottom: 0.5,
      border: 0,
      borderRadius: 3,
      background: background
    },
    cardAction: {
      display: 'flex',
      width: 1,
      justifyContent: 'space-between',
      alignItems: 'center'
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
        <CardHeader sx={{color: foreground}}
          avatar={
            <Avatar
              alt='User Pic'
              src={props.pic}
              sx={{ width: 56, height: 56 }}
            />
          }
          title={props.displayName}
          subheader={props.lastMessage}
        />
          
        {props.read && <CircleIcon sx={classes.circle}/>}
      
      </CardActionArea>
    </Card>
  )
}

export default ChatBox
