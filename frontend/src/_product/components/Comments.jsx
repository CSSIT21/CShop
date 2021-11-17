import { Avatar, Box, Divider, Typography } from "@mui/material";
import RatingStars from "./RatingStars";
import ReviewPhoto from "./ReviewPhoto";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EmojiFlagsRoundedIcon from "@mui/icons-material/EmojiFlagsRounded";
import IconButton from "@mui/material/IconButton";

const Comments = ({ imageURL, username, rating, comment, reviewPhoto }) => {
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
            <Box>
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
          <Box>
            {reviewPhoto &&
              reviewPhoto.map((val, key) => (
                <ReviewPhoto id={key} img={val.reviewPhoto} />
              ))}
          </Box>
          <Box>
            {" "}
            <Typography
              sx={{ marginTop: 1.5, fontSize: "16px", fontWeight: "400" }}
            >
              Like
            </Typography>
            {/* <IconButton
          onClick={(e) => {
            e.preventDefault();
            onFavourite(product);
          }}
              sx={{
                fontWeight: "bold", fontSize: "30px"
              }}
        >
          {product.favourite
            ? <FavoriteRoundedIcon sx={{ color: "#A0A3BD" }} fontSize="inherit" />
            : <FavoriteBorderRoundedIcon sx={{ color: "#A0A3BD" }} fontSize="inherit"/>
          }
        </IconButton> */}
          </Box>
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
