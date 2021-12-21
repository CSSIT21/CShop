import { useState, useEffect } from "react";
import RatingStars from "../components/ProductDetailsBase/RatingStars";
import ShowMoreButton from "../../common/components/CButton";
import Comments from "../components/ProductDetailsBase/Comments";
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
import { ExpandMoreRounded } from "@mui/icons-material";
import fakeProducts from "~/common/faker/fakeComments";

const ProductRating = ({ avgRating, commentPictures, comments }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [commentOffset, setCommentOffset] = useState(5);

  const handleClick = () => {
    setOpen(!open);
  };

  const d = () => {
    setCommentOffset(commentOffset + 5);
  };

  const findCommentPicture = (commentId) => {
    let commentPicList;
    commentPictures?.forEach((e) => {
      if (e.id_comment == commentId) {
        commentPicList = e.comment_pictures;
      }
    });
    return commentPicList;
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
          expandIcon={<ExpandMoreRounded />}
          aria-controls="expand-comment"
          id="expand-comment"
          onClick={handleClick}
          sx={{
            padding: "0px 0px 40px 0px",
          }}
        >
          <Box className={classes.head}>
            <Typography fontWeight={600} fontSize="30px">
              Product Rating
            </Typography>
            <RatingStars
              value={parseFloat(avgRating)}
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
              {comments?.slice(0, commentOffset).map((val, key) => (
                <Comments
                  imageURL={
                    val?.customer_id_from_product_reviews.customer_picture
                      .picture_id_from_customer_picture?.path
                  }
                  username={
                    val?.customer_id_from_product_reviews.customer_info
                      .firstname &&
                    val?.customer_id_from_product_reviews.customer_info.lastname
                      ? val?.customer_id_from_product_reviews.customer_info
                          .firstname +
                        " " +
                        val?.customer_id_from_product_reviews.customer_info
                          .lastname
                      : "undefined username"
                  }
                  rating={parseInt(val.rating)}
                  comment={val.comment}
                  key={key}
                  reviewTime={val.review_time}
                  reviewPhoto={findCommentPicture(val.id)}
                  // commentPictures[key]?.comment_pictures
                />
              ))}
              <Box sx={{ marginTop: "50px" }}>
                {commentOffset > comments?.length ? (
                  <Typography>No more comment</Typography>
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
