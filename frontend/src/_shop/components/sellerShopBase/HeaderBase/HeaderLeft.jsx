import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import AvatarImage from "~/common/assets/images/profileshop.png";

const useStyles = makeStyles({
  HeaderLeftShop: {
    display: "flex",
    height: "220px",
    width: "50%",
  },

  ProfileShop: {
    display: "flex",
  },

  DetailShop: {
    padding: "0 0 0 25px",
  },
});

const HeaderLeft = () => {
  const classes = useStyles();

  return (
    <Box className={classes.HeaderLeftShop}>
      <Box className={classes.ProfileShop}>
        <Avatar
          alt="profile"
          src={AvatarImage}
          sx={{ width: "95px", height: "95px" }}
        />
        <Box className={classes.DetailShop}>
          <Typography fontSize="18px" fontWeight="500">
            Shop Name
          </Typography>
          <Typography
            fontSize="14px"
            color="#A0A3BD"
            sx={{ margin: "0 0 10px 0" }}
          >
            Active 19 minutes ago
          </Typography>
          <Typography fontSize="14px" color="#A0A3BD">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Necessitatibus eius quas tempora accusamus maxime error distinctio
            iusto
          </Typography>

          <Button
            sx={{ margin: "24px 0 0 0", padding: "10px 20px" }}
            width="120px"
            height="45px"
            fontSize="14px"
            fontWeight="500"
            backgroundColor="#FD6637"
            variant="contained"
          >
            <ShoppingCartOutlinedIcon
              style={{ width: "16px", heigth: "16px", margin: "0 5px 0 0" }}
            />
            Chat now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderLeft;
