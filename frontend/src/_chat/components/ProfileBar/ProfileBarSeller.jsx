import React from 'react'
import { Box } from '@mui/system'
import { Button, Typography, Avatar, Tooltip } from '@mui/material'
import { IconButton } from '@mui/material'
import useStyles from './ProfileBarSeller.styles'
import CircleIcon from '@mui/icons-material/Circle';
import FlagIcon from '@mui/icons-material/Flag'
import StarIcon from '@mui/icons-material/Star'
import EmailIcon from '@mui/icons-material/Email'
import CheckIcon from '@mui/icons-material/Check'
import InfoIcon from '@mui/icons-material/Info'
import SettingsIcon from '@mui/icons-material/Settings'

const ProfileBarSeller = (props) => {
    const classes = useStyles()

    return (
        <Box className={classes.profileBarContainer}>
            <Box className={classes.textZone}>
                <Avatar
                    alt="User Pic"
                    src={props.pic}
                    className={classes.avatar}
                />

                <Box className={classes.profileBarDisplayName}>
                    <Typography variant="h6">{props.displayName}</Typography>
                    {props.status ? (
                        <Box className={classes.userStatus}>
                            <CircleIcon className={classes.activeButton} />
                            <Typography
                                variant="body2"
                                sx={{ color: '#A0A3BD' }}
                            >
                                Active now
                            </Typography>
                        </Box>
                    ) : (
                        <Box className={classes.userStatus}>
                            <CircleIcon className={classes.offlineButton} />
                            <Typography
                                variant="body2"
                                sx={{ color: '#A0A3BD' }}
                            >
                                Offline
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box className={classes.buttonZone}>
                <Tooltip title="Spam">
                    <IconButton
                        onClick={() => {
                            props.setMark('Spam')
                        }}
                    >
                        <FlagIcon
                            className={
                                props.mark === 'Spam'
                                    ? classes.orangeButton
                                    : classes.grayButton
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Important">
                    <IconButton
                        onClick={() => {
                            props.setMark('Important')
                        }}
                    >
                        <StarIcon
                            className={
                                props.mark === 'Important'
                                    ? classes.orangeButton
                                    : classes.grayButton
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Read later">
                    <IconButton
                        onClick={() => {
                            props.setMark('Unread')
                        }}
                    >
                        <EmailIcon
                            className={
                                props.mark === 'Unread'
                                    ? classes.orangeButton
                                    : classes.grayButton
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Done">
                    <IconButton
                        onClick={() => {
                            props.setMark('Done')
                        }}
                    >
                        <CheckIcon
                            className={
                                props.mark === 'Done'
                                    ? classes.orangeButton
                                    : classes.grayButton
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="More info">
                    <IconButton onClick={props.openInfo}>
                        <InfoIcon className={classes.grayButton} />
                    </IconButton>
                </Tooltip>
                <IconButton onClick={props.openPreference}>
                    <SettingsIcon className={classes.blackButton} />
                </IconButton>
            </Box>
        </Box>
    )
}
export default ProfileBarSeller
