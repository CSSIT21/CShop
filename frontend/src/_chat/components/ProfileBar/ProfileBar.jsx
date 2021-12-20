import React, { useState } from 'react'
import { Box } from '@mui/system'
import { Button, Typography, Avatar } from '@mui/material'
import { IconButton } from '@mui/material'
import useStyles from './ProfileBar.styles'
import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'
import CircleIcon from '@mui/icons-material/Circle';

const ProfileBar = (props) => {
    const classes = useStyles()
    const [noti, setNoti] = useState(props.notification)

    return (
        <Box className={classes.profileBarContainer}>
            <Box className={classes.textZone}>
                <Avatar alt="User Pic" src={props.pic} className={classes.avatar} />

                <Box className={classes.profileBarDisplayName}>
                    <Typography variant="h6">{props.displayName}</Typography>
                    {props.status ? (<Box className={classes.userStatus}><CircleIcon className={classes.activeButton}/>
                    <Typography variant="body2" sx={{color:'#A0A3BD'}}>Active now</Typography></Box> ) : (<Box className={classes.userStatus}><CircleIcon className={classes.offlineButton}/>
                    <Typography variant="body2" sx={{color:'#A0A3BD'}}>Offline</Typography></Box>)}
                    
                </Box>
            </Box>
            <Box className={classes.buttonZone}>
                <IconButton onClick={() => setNoti(!noti)}>
                    {noti ? (
                        <NotificationsIcon className={classes.profileBarNoti} />
                    ) : (
                        <NotificationsOffIcon
                            className={classes.profileBarNoti}
                        />
                    )}
                </IconButton>
                <Button
                    variant="contained"
                    className={classes.goToShopButton}
                    sx={{
                        backgroundColor: '#FD6637',
                        width: '100%',
                        height: '100%',
                        fontSize: '10px',
                        marginRight: '20px',
                        marginLeft: '15px'
                    }}
                    href={props.url} /* consider changing this to use react-router */
                >
                    Go to shop
                </Button>
            </Box>
        </Box>
    )
}

export default ProfileBar
