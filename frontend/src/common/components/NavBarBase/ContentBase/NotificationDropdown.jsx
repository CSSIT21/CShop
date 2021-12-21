import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CircleIcon from "@mui/icons-material/Circle";
import { For } from "~/common/utils";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatTime(time) {
  const d = new Date(time);
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getHours()}:${
    d.getMinutes() > 10 ? d.getMinutes() : "0" + d.getMinutes()
  }`;
}

const NotificationDropdown = ({
  anchorEl,
  open,
  onClose,
  onRead,
  notifications,
}) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (!open) return;

    setTimeout(() => {
      notifications
        ?.filter((n) => !n.seen)
        .forEach((n) => {
          onRead(n.conversation_id, n.id);
        });
    }, 2000);
  }, [open]);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        style: {
          width: "385px",
          height: "450px",
          backgroundColor: "#FFEDE7",
        },
      }}
    >
      <Box className={classes.heading}>
        <Typography sx={{ fontWeight: "500 !important" }}>
          Notification
        </Typography>
      </Box>
      {notifications?.length > 0 ? (
        <For each={notifications}>
          {(
            { shop_name, notification_text, seen, message_time, action_url },
            index
          ) => (
            <MenuItem
              key={index}
              onClick={() => {
                onClose();
                if (action_url !== "") history.push(action_url);
              }}
              className={classes.notification}
            >
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography className={classes.shopName}>
                  {shop_name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {!seen && <CircleIcon className={classes.status} />}
                  <Typography className={classes.time}>
                    {formatTime(message_time)}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography className={classes.text}>
                  {notification_text}
                </Typography>
              </Box>
            </MenuItem>
          )}
        </For>
      ) : (
        <Box className={classes.empty}>
          <Typography>Empty</Typography>
        </Box>
      )}
    </Menu>
  );
};

const useStyles = makeStyles({
  heading: {
    width: "100%",
    height: "60px",
    backgroundColor: "#FFEDE7",
    padding: "0px 17px",
    display: "flex",
    alignItems: "center",
    paddingBottom: "5px",
  },
  empty: {
    width: "100%",
    height: "325px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#A0A3BD",
    fontWeight: "300 !important",
  },
  notification: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center !important",
    alignItems: "flex-start !important",
    width: "100%",
    minHeight: "65px",
    maxHeight: "100px",
    backgroundColor: "white !important",
    paddingRight: "10px !important",
    "&:hover": {
      backgroundColor: "rgba(248,248,248) !important",
    },
  },
  shopName: {
    color: "#FD6637",
    fontSize: "0.875rem !important",
    fontWeight: "500 !important",
  },
  text: {
    color: "#4B4B4B",
    fontSize: "0.875rem !important",
    fontWeight: "300 !important",
    wordBreak: "break-all",
    whiteSpace: "normal",
    textOverflow: "ellipsis",
  },
  status: {
    color: "#FD6637",
    width: "7px !important",
  },
  time: {
    color: "#A0A3BD",
    fontSize: "0.75rem !important",
    fontWeight: "300 !important",
    paddingLeft: "5px",
  },
});

export default NotificationDropdown;
