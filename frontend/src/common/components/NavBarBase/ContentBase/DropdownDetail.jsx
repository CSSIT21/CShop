import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Store as StoreIcon,
  Person as PersonIcon,
  Restore as RestoreIcon,
  Favorite as FavoriteIcon,
  ExitToApp as ExitToAppIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { MenuItem, Button } from "@mui/material";
import { Box } from "@mui/system";
import { For } from "~/common//utils";
import StyledMenu from "../../StyledMenu";
import { useRecoilState } from 'recoil';
import authState from '~/common/store/authState';

const menuLists = [
  {
    title: "My Account",
    icon: PersonIcon,
    to: "/profile",
  },
  {
    title: "My Shop",
    icon: StoreIcon,
    to: "/shop/1",
  },
  {
    title: "Order History",
    icon: RestoreIcon,
    to: "/profile/history",
  },
  {
    title: "Favorite",
    icon: FavoriteIcon,
    to: "/home/favourite",
  },
];

const DropdownDetail = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useHistory();
  const open = Boolean(anchorEl);
  const [auth, setAuth] = useRecoilState(authState);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };

  const onLogOut = () => {
    router.push("/home");
    return setAuth({ ...auth, isLoggedIn: false });
  };

  return (
    <Box>
      <Button
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon sx={{ color: "black" }} />}
        sx={{
          backgroundColor: "white",
          "&:hover": { backgroundColor: "#F5F5F5" },
        }}
      >
        {children}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <For each={menuLists}>
          {(Dropdown, index) => (
            <MenuItem
              onClick={() => {
                router.push(Dropdown.to);
                handleClose();
              }}
              disableRipple
              key={index}
            >
              <Dropdown.icon />
              {Dropdown.title}
            </MenuItem>
          )}
        </For>

        <MenuItem
          onClick={() => {
            onLogOut();
            handleClose();
          }}
          disableRipple
        >
          <ExitToAppIcon />
          Log Out
        </MenuItem>
      </StyledMenu>
    </Box>
  );
};
export default DropdownDetail;
