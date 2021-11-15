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
import { styled } from "@mui/material/styles";

const StyledTabs = styled((props) => <Tabs {...props} />)({
  "& .MuiTabs-flexContainer": {
    display: "flex",
    justifyContent: "space-between",
  },
});

const TabsController = ({ categories = [], ...rest }) => {
  const { id } = useParams();

  const filterMenus = categories.slice(0, 2);
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
    <Box sx={{ width: "100%" }} {...rest}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        sx={{
          bgcolor: "background.paper",
          width: "100%",
        }}
      >
        <Link to={`/shop/${id}`}>
          <Tab
            className={classes.tabStyle}
            label="Store"
          />
        </Link>
        <Link to={`/shop/${id}/allproduct`}>
          <Tab
            className={classes.tabStyle}
            
            label="All Products"
          />
        </Link>
        {filterMenus.map((menu, idx) => (
          <Link key={idx} to={`/shop/${id}/${menu.cateId}`}>
            <Tab
              className={classes.tabStyle}
              label={menu.title}
            />
          </Link>
        ))}
        {categories.length > 2 && (
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
              {categories.slice(3, categories.length).map((menu, idx) => {
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
      </StyledTabs>
    </Box>
  );
};

export default TabsController;

const useStyles = makeStyles({
  tabStyle: {
    color: "#323232 !important",
    fontSize: "18px !important",
    textTransform: "capitalize !important",
    height: "75px !important",
    width: "250px !important"
  },
});
