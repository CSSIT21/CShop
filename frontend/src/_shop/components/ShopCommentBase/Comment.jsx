import { Avatar, Box, Divider, Typography } from "@mui/material";
import RatingStars from "./RatingStars";
import EmojiFlagsRoundedIcon from "@mui/icons-material/EmojiFlagsRounded";
import IconButton from "@mui/material/IconButton";
import ProductCommentImage from "./ProductCommentImage";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Comment = ({ imageURL, username, rating, comment, isProduct = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignSelf: "self-start",
          marginTop: 3,
          padding: "0 50px",
          width: "100%",
        }}
      >
        <Avatar
          alt={username.toUpperCase()}
          src={imageURL}
          sx={{
            width: 64,
            height: 64,
            marginRight: 3,
            alignSelf: "self-start",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              sx={{ fontSize: "18px", fontWeight: "500", marginBottom: 0.5 }}
            >
              {username}
            </Typography>
            <IconButton onClick={handleClick}>
              <EmojiFlagsRoundedIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Report Abuse</MenuItem>
            </Menu>
          </Box>
          <RatingStars
            value={rating}
            iconStyle={iconStyle}
            isComment
          ></RatingStars>
          <Typography
            sx={{ marginTop: 1.5, fontSize: "16px", fontWeight: "400" }}
          >
            {comment}
          </Typography>
        </Box>
      </Box>
      <ProductCommentImage />
      <Divider sx={{ alignSelf: "stretch", marginTop: 3 }} />
    </>
  );
};

const iconStyle = {
  width: "24px",
  height: "24px",
  color: "#FD6637",
};

export default Comment;
