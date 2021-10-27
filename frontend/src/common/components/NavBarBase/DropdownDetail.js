import { styled, alpha } from "@mui/material/styles";
import { Menu, MenuItem, Button } from "@mui/material";
import {
  Store as StoreIcon,
  Person as PersonIcon,
  Restore as RestoreIcon,
  Favorite as FavoriteIcon,
  ExitToApp as ExitToAppIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { useState } from "react";
import { For } from "../../utils";
import { useHistory } from "react-router-dom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const DropdownDetail = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useHistory();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };

  const menuLists = [
    {
      title: "My Account",
      icon: PersonIcon,
      to: "/profile",
    },
    {
      title: "My Shop",
      icon: StoreIcon,
      to: "/profile/shop",
    },
    {
      title: "Order History",
      icon: RestoreIcon,
      to: "/profile/history",
    },
    {
      title: "Favorite",
      icon: FavoriteIcon,
      to: "/profile/favourite",
    },
    {
      title: "Log Out",
      icon: ExitToAppIcon,
      to: "/logout",
    },
  ];

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
              sx={{ fontSize: 14, margin: "5px 0" }}
              key={index}
            >
              <Dropdown.icon />
              {Dropdown.title}
            </MenuItem>
          )}
        </For>
      </StyledMenu>
    </Box>
  );
};

export default DropdownDetail;
