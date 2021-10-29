import React from "react";
import RatingStars from "../components/RatingStars";
import ShowMoreButton from "../../common/components/CButton";
import Comments from "../components/Comments";
import { makeStyles } from "@mui/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Fade,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { ExpandLessRounded } from "@mui/icons-material";

const ProductRating = (props) => {
  const classes = useStyles();

  const avgRating = 4.5;

  const [open, setOpen] = React.useState(false);
  const [commentOffset, setCommentOffset] = React.useState(5);
  const [commentsList, setCommentsList] = React.useState([
    {
      imageURL: "1",
      username: "patiphon",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laborum debitis neque, ea nemo amet fugiat incidunt laudantium excepturi quidem nulla odit illo iure deleniti quisquam, repudiandae asperiores doloremque aliquam?",
    },
    {
      imageURL: "2",
      username: "Thanawan",
      rating: 3.5,
      comment: "Good :)",
    },
    {
      imageURL: "1",
      username: "Pw-a02",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laborum debitis neque, ea nemo amet fugiat incidunt laudantium excepturi quidem nulla odit illo iure deleniti quisquam, repudiandae asperiores doloremque aliquam?",
    },
    {
      imageURL: "2",
      username: "Thanawan",
      rating: 3.5,
      comment: "Good :)",
    },
    {
      imageURL: "1",
      username: "Pw-a02",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laborum debitis neque, ea nemo amet fugiat incidunt laudantium excepturi quidem nulla odit illo iure deleniti quisquam, repudiandae asperiores doloremque aliquam?",
    },
    {
      imageURL: "2",
      username: "cympati",
      rating: 3.5,
      comment: "Good :)",
    },
    {
      imageURL: "1",
      username: "YOK",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laborum debitis neque, ea nemo amet fugiat incidunt laudantium excepturi quidem nulla odit illo iure deleniti quisquam, repudiandae asperiores doloremque aliquam?",
    },
    {
      imageURL: "2",
      username: "Thanawan",
      rating: 3.5,
      comment: "Good :)",
    },
    {
      imageURL: "1",
      username: "patiphon",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laborum debitis neque, ea nemo amet fugiat incidunt laudantium excepturi quidem nulla odit illo iure deleniti quisquam, repudiandae asperiores doloremque aliquam?",
    },
    {
      imageURL: "2",
      username: "Thanawan",
      rating: 3.5,
      comment: "Good :)",
    },
    {
      imageURL: "1",
      username: "patiphon",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laborum debitis neque, ea nemo amet fugiat incidunt laudantium excepturi quidem nulla odit illo iure deleniti quisquam, repudiandae asperiores doloremque aliquam?",
    },
    {
      imageURL: "2",
      username: "Thanawan",
      rating: 3.5,
      comment: "Good :)",
    },
    {
      imageURL: "2",
      username: "Thanawan",
      rating: 3.5,
      comment: "Good :)",
    },
    {
      imageURL: "2",
      username: "Thanawan",
      rating: 3.5,
      comment: "Good :)",
    },
    {
      imageURL: "2",
      username: "Thanawan",
      rating: 3.5,
      comment: "Good :)",
    },
    {
      imageURL: "2",
      username: "Thanawan",
      rating: 3.5,
      comment: "Good :)",
    },
  ]);

  const handleClick = () => {
    setOpen(!open);
  };

  const d = () => {
    setCommentOffset(commentOffset + 5);
  };

  return (
    <Box
      sx={{
        margin: "50px 0px",
      }}
    >
      <Accordion
        className={classes.accordion}
        TransitionProps={{ onExited: () => setOpen(false), timeout: 700 }}
        disableGutters
        sx={{
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandLessRounded />}
          aria-controls="expand-comment"
          id="expand-comment"
          onClick={handleClick}
          sx={{
            padding: "0px 0px 40px 0px",
          }}
        >
          <Box className={classes.head}>
            <Typography fontWeight={600} fontSize= "30px" >
              Product Rating
            </Typography>
            <RatingStars
              value={avgRating}
              iconStyle={iconStyle}
              padding={paddingStar}
            ></RatingStars>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: 0,
          }}
        >
          <Fade in={open} timeout={500}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {commentsList.slice(0, commentOffset).map((val, key) => (
                <Comments
                  imageURL={val.imageURL}
                  username={val.username}
                  rating={val.rating}
                  comment={val.comment}
                  key={key}
                ></Comments>
              ))}
              <Box sx={{ marginTop: "50px" }}>
                {commentOffset > commentsList.length ? (
                  <Typography>No more comment.</Typography>
                ) : (
                  <ShowMoreButton
                    title="Show more comments"
                    onClick={d}
                  ></ShowMoreButton>
                )}
              </Box>
            </Box>
          </Fade>
        </AccordionDetails>
      </Accordion>
      {!open && (
        <Fade in={!open} timeout={500}>
          <Divider />
        </Fade>
      )}
    </Box>
  );
};

const useStyles = makeStyles({
  head: {
    display: "flex",
    alignItems: "center",
    margin: 0,
  },
  accordion: {
    "& .MuiAccordionSummary-content": {
      margin: 0,
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      color: "black",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
    },
  },
});
const iconStyle = {
  width: "38px",
  height: "38px",
  
  color: "#FD6637",
};
const paddingStar = {
  padding: "0 16px 0 50px",
};
export default ProductRating;
