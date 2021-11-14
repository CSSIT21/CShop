import React from "react";
import { Box } from "@mui/system";
import { Button, Typography, Avatar } from "@mui/material";
import useStyles from "./ProfileBar.styles";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

const ProfileBar = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.profileBarContainer}>
        <Box className={classes.textZone}>
      <Avatar alt="User Pic" src={props.pic} sx={classes.avatar} />

      <Box className={classes.profileBarDisplayName}>
        <Typography variant="h6" className={classes.profileName}>
          {props.displayName}
        </Typography>
        <Typography variant="body2" className={classes.profileStatus}>
          {props.status}
        </Typography>
      </Box>

      </Box>
      <Box className={classes.buttonZone}>
      <Box >
          {(props.notification)?<NotificationsIcon className={classes.profileBarNoti}/> : <NotificationsOffIcon className={classes.profileBarNoti}/>}
      </Box>
      <Button
        variant="contained"
        className={classes.goToShopButton}
        sx={{ backgroundColor: "#FD6637", width: "100%", height: "100%", fontSize:"10px", marginRight:"20px", marginLeft:"15px", }}
      href={'/seller/' + props.currentChatUserId}>
        Go to shop
      </Button>
      </Box>
    </Box>
  );
};

export default ProfileBar;