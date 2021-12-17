import React, { useState } from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import RatingStars from "./RatingStars";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EmojiFlagsRoundedIcon from "@mui/icons-material/EmojiFlagsRounded";
import IconButton from "@mui/material/IconButton";
import CommentFooter from "./CommentFooter";
import ReviewPhoto from "./ReviewPhotos";
import Stack from "@mui/material/Stack";
import DialogImage from "./DialogImage";

const Comments = ({
  imageURL,
  username,
  rating,
  comment,
  reviewPhoto = [],
  reviewTime,
}) => {
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const photoPerRow = 1;
  const totalPage = Math.ceil(reviewPhoto.length / photoPerRow);
  const onPrev = () => {
    if (page === 0) {
      setPage(totalPage - 1);
    } else {
      setPage(page - 1);
    }
  };

  const onNext = () => {
    if (totalPage - 1 === page) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };

  const handleClickOpenDialog = (id) => {
    setPage(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
          src={
            imageURL
              ? imageURL
              : "https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg"
          }
          // imageURL.path
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
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            marginTop="8px"
          >
            {reviewPhoto &&
              reviewPhoto?.slice(0, 5).map((val, key) => (
                <ReviewPhoto
                  setPage={setPage}
                  page={page}
                  id={key}
                  img={val}
                  key={key}
                  handleClickOpen={handleClickOpenDialog}
                >
                  {
                    <Box variant="outlined">
                      <img src={val} style={imageStyle} alt={key} />
                    </Box>
                  }
                </ReviewPhoto>
              ))}

            {/* More photo */}
            {reviewPhoto?.length >= 6 && (
              <ReviewPhoto
                id={5}
                img={reviewPhoto[5]}
                setPage={setPage}
                page={page}
                handleClickOpen={handleClickOpenDialog}
              >
                {
                  <Box sx={numberConatiner}>
                    <Typography variant="h6" color="#bdbdbd">
                      +{reviewPhoto?.length - 5}
                    </Typography>
                  </Box>
                }
              </ReviewPhoto>
            )}
          </Stack>

          {/* Dialog */}
          <DialogImage
            handleCloseDialog={handleCloseDialog}
            openDialog={openDialog}
            photo={reviewPhoto}
            page={page}
            setPage={setPage}
          />
        </Box>
      </Box>

      {/* flag icon
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
      </Menu> */}

      {/* footer */}
      <CommentFooter commentDateTime={reviewTime} />
      <Divider sx={{ alignSelf: "stretch", marginTop: 3 }} />
    </Box>
  );
};

const iconStyle = {
  width: "24px",
  height: "24px",
  color: "#FD6637",
};
const numberConatiner = {
  width: "45px",
  height: "45px",
  backgroundColor: "#eeeeee",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderRadius: "9999px",
};

const imageStyle = {
  width: "100%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  cursor: "pointer",
};
export default Comments;
