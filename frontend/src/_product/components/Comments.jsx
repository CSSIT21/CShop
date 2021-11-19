import React from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import RatingStars from "./RatingStars";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EmojiFlagsRoundedIcon from "@mui/icons-material/EmojiFlagsRounded";
import IconButton from "@mui/material/IconButton";
import CommentFooter from "./CommentFooter";
import ReviewPhotoContainer from "./ReviewPhotoCarousel";
import ReviewPhoto from "./ReviewPhoto";
import Grid from "@mui/material/Grid";

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
    <>
      <Box
        sx={{
          display: "flex",
          alignSelf: "self-start",
          marginTop: 3,
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
              alignItems: "center",
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

            {/* flag icon */}
            <Box>
              <IconButton onClick={handleClick}>
                <EmojiFlagsRoundedIcon sx={{ color: "#A0A3BD" }} />
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
          </Box>

          {/* rating */}
          <RatingStars
            value={rating}
            iconStyle={iconStyle}
            isComment
          ></RatingStars>

          {/* comment */}
          <Typography
            sx={{ marginTop: 1.5, fontSize: "16px", fontWeight: "400" }}
          >
            {comment}
          </Typography>

          {/* Photo */}
          {reviewPhoto.length < 6 ? (
            <Box sx={{ flexGrow: 1 }}>
              <Grid container sx={{ width: "500px" }} gap={0.9}>
                {reviewPhoto &&
                  reviewPhoto.map((val, key) => (
                    <Grid item xs={2} id={key}>
                      <ReviewPhoto id={key} img={val.reviewPhoto} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          ) : (
            <ReviewPhotoContainer reviewPhoto={reviewPhoto} />
          )}

          {/* footer */}
          <CommentFooter />
        </Box>
      </Box>
      <Divider sx={{ alignSelf: "stretch", marginTop: 3 }} />
    </>
  );
};

const iconStyle = {
  width: "24px",
  height: "24px",
  color: "#FD6637",
};

export default Comments;
