import { Avatar, Box, Divider, Typography } from "@mui/material";
import RatingStars from "./RatingStars";

const Comments = ({ imageURL, username, rating, comment }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignSelf: "self-start",
          marginTop: 3,
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
          }}
        >
          <Typography
            sx={{ fontSize: "1rem", fontWeight: "500", marginBottom: 0.5 }}
          >
            {username}
          </Typography>
          <RatingStars
            value={rating}
            iconStyle={iconStyle}
            isComment
          ></RatingStars>
          <Typography
            sx={{ marginTop: 1.5, fontSize: "0.8rem", fontWeight: "400" }}
          >
            {comment}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ alignSelf: "stretch", marginTop: 3 }} />
    </>
  );
};

const iconStyle = {
  width: "21.31px",
  height: "21.31px",
  color: "#FD6637",
};

export default Comments;
