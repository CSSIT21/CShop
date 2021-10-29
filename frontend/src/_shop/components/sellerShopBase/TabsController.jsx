import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";

const TabsController = ({ orders = [], ...rest }) => {
  const { id } = useParams();
  const menus = [
    {
      cateId: 3,
      title: "Games",
    },
    {
      cateId: 4,
      title: "PC",
    },
    {
      cateId: 5,
      title: "Fan",
    },
    {
      cateId: 6,
      title: "Umbar",
    },
    {
      cateId: 5,
      title: "Fan",
    },
    {
      cateId: 6,
      title: "Umbar",
    },
  ];

  const filterMenus = menus.slice(0, 2);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ width: "100%", marginBottom: "60px" }} {...rest}>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        centered
        sx={{
          bgcolor: "background.paper",
          width: "100%",
        }}
      >
        <Link>
          <Tab
            className={classes.tabStyle}
            sx={{
              color: "#323232",
              fontSize: "18px",
              textTransform: "capitalize",
              height: "75px",
              width: "250px",
            }}
            label="Store"
          />
        </Link>
        <Link>
          <Tab
            className={classes.tabStyle}
            sx={{
              color: "#323232",
              fontSize: "18px",
              textTransform: "capitalize",
              height: "75px",
              width: "250px",
            }}
            label="All Products"
          />
        </Link>
        {filterMenus.map((menu, idx) => (
          <Link to={`/shop/${id}/${menu.cateId}`}>
            <Tab
              key={idx}
              className={classes.tabStyle}
              sx={{
                color: "#323232",
                fontSize: "18px",
                textTransform: "capitalize",
                height: "75px",
                width: "250px",
              }}
              label={menu.title}
            />
          </Link>
        ))}
        {menus.length > 2 && (
          <Box>
            <Button
              id="demo-positioned-button"
              sx={{
                height: "75px",
                width: "250px",
                textTransform: "capitalize",
                color: "#000000",
                fontSize: "18px",
                fontWeight: 400,
              }}
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              disableFocusRipples
              disableRipple
            >
              More
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{ color: "black" }}
            >
              {menus.slice(3, menus.length).map((menu, idx) => {
                return (
                  <Link key={idx} to={`/shop/${id}/${menu.cateId}`}>
                    <MenuItem
                      sx={{ height: "50px", width: "200px", color: "black" }}
                      onClick={handleClose}
                    >
                      {menu.title}
                    </MenuItem>
                  </Link>
                );
              })}
            </Menu>
          </Box>
        )}
      </Tabs>
    </Box>
  );
};

export default TabsController;

const useStyles = makeStyles({
  tabs: {
    // width: "90%"
  },
  tabStyle: {},
});
