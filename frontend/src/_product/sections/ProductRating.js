import RatingStars from "../components/RatingStars";
import ShowMoreButton from "../../common/components/CButton";
import Comments from "../components/Comments";
import { makeStyles } from "@mui/styles";

const ProductRating = (props) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.box}>
        <div>Product Rating</div>
        <RatingStars></RatingStars>
      </div>
      <Comments></Comments>
      <ShowMoreButton title="Show more comments"></ShowMoreButton>
    </div>
  );
};

const useStyles = makeStyles({
  box: {
    display: "flex",
  },
});

export default ProductRating;
