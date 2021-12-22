import { useEffect, useState } from "react";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Fab } from "@mui/material";
import { Box } from "@mui/system";
import { For } from "~/common/utils";
import NotificationService from "~/common/services/NotficationService";
import authState from "~/common/store/authState";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import NotificationDropdown from "./NotificationDropdown";

const buttonStyle = {
  background: "none",
  boxShadow: "none",
  marginRight: 1,
};

const ActionMenu = () => {
  const [auth] = useRecoilState(authState);
  const [actionLists, setActionLists] = useState([
    {
      label: "chat",
      icon: ChatOutlinedIcon,
      value: null,
      path: "/chat",
    },
    {
      label: "notification",
      icon: NotificationsNoneIcon,
      value: null,
      onclick: openNotification,
    },
    {
      label: "cart",
      icon: ShoppingCartOutlinedIcon,
      value: "0+",
      path: "/cart",
    },
  ]);

  const [notificationService, setNotificationService] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  function openNotification(event) {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }
  function closeNotification() {
    setAnchorEl(null);
    setOpen(false);
  }

  const history = useHistory();

  useEffect(() => {
    setNotificationService(
      () => new NotificationService(auth, handleGet, handleGet, handleGet, onClear)
    );
  }, [auth.isLoggedIn]);

  useEffect(() => {
    notificationService?.getNotifications()
  }, [notificationService]);

  useEffect(() => {
    let act = [...actionLists];
    const count = notifications?.filter((n) => !n.seen).length;
    act[1].value = count;
    act[2].value = '' + (auth?.user?.order_cart_item?.length || 0);
    console.log(auth.user)
    console.log(act)
    setActionLists(act);
  }, [notifications,auth]);

  function handleGet(noti) {
    setNotifications(noti);
  }

  function handleRead(conversation_id, message_id) {
	  notificationService.read(conversation_id, message_id)
  }

  function onClear() {
	  setNotifications([])
  }

  return (
    <>
      <Box display="flex">
        <For each={actionLists}>
          {({ label, icon: ActionIcon, value, path, onclick }, index) => (
            <Fab
              size="small"
              sx={buttonStyle}
              aria-label={label}
              key={index}
              onClick={(e) => {
                if (path) history.push(path);
                else if (onclick) onclick(e);
              }}
            >
              <Badge badgeContent={value} color="primary">
                <ActionIcon />
              </Badge>
            </Fab>
          )}
        </For>
        <NotificationDropdown
          anchorEl={anchorEl}
          open={open}
          onClose={closeNotification}
		  onRead={handleRead}
          notifications={notifications}
        />
      </Box>
    </>
  );
};

export default ActionMenu;
