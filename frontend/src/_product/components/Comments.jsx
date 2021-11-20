import React from "react";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import RatingStars from "./RatingStars";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EmojiFlagsRoundedIcon from "@mui/icons-material/EmojiFlagsRounded";
import IconButton from "@mui/material/IconButton";
import CommentFooter from "./CommentFooter";
import ReviewPhotoContainer from "./ReviewPhotoCarousel";
import ReviewPhoto from "./ReviewPhoto";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

const Comments = ({
  // commentDetails,
  imageURL,
  username,
  rating,
  comment,
  reviewPhoto = [],
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignSelf: "self-start",
          marginTop: 3,
          padding: "0 50px 0 0 ",
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
            flexDirection: "column",
            justifyContent: "space-between",
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
              sx={{
                fontSize: "18px",
                fontWeight: "500",
                // marginBottom: 0.5
              }}
            >
              {username}
            </Typography>
          </Box>

          <Box sx={{ margin: "5px 0 5px -4px" }}>
            {/* rating */}
            <RatingStars
              value={rating}
              iconStyle={iconStyle}
              isComment
            ></RatingStars>
          </Box>

          {/* comment */}
          <Typography
            sx={{ marginTop: 1.5, fontSize: "16px", fontWeight: "400" }}
          >
            {comment}
          </Typography>

          {/* Photo */}
          <Stack direction="row" spacing={1.5}>
            {reviewPhoto &&
              reviewPhoto
                .slice(0, 5)
                .map((val, key) => (
                  <ReviewPhoto id={key} img={val.reviewPhoto} />
                ))}
            {reviewPhoto.length >= 6 && (
              <Box
                sx={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "pink",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button>+{reviewPhoto.length - 5}</Button>
              </Box>
            )}
          </Stack>
        </Box>
      </Box>

      {/* flag icon */}
      <IconButton
        onClick={handleClick}
        sx={{ position: "absolute", top: "10px", right: "0" }}
      >
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

      {/* footer */}
      <CommentFooter />
      <Divider sx={{ alignSelf: "stretch", marginTop: 3 }} />
    </Box>
  );
};

const iconStyle = {
  width: "24px",
  height: "24px",
  color: "#FD6637",
};

export default Comments;
