import React from "react";
import RatingStars from "../components/RatingStars";

import Comments from "../components/Comments";
import { makeStyles } from "@mui/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Divider,
  Fade,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { ExpandLessRounded } from "@mui/icons-material";

const ProductRating = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const classes = useStyles();

  return (
    <>
      <Box
        sx={{
          padding: "50px 0px",
        }}
      >
        <Accordion
          className={classes.accordion}
          TransitionComponent={Fade}
          TransitionProps={{ onExited: () => setOpen(false), timeout: 700 }}
          disableGutters
        >
          <AccordionSummary
            expandIcon={<ExpandLessRounded />}
            aria-controls="expand-comment"
            id="expand-comment"
            onClick={handleClick}
          >
            <Box className={classes.box}>
              <Typography sx={{ fontWeight: 600, fontSize: "30px" }}>
                Product Rating
              </Typography>
              <RatingStars value={5}></RatingStars>
            </Box>
          </AccordionSummary>
          <AccordionDetails>{open && <Comments></Comments>}</AccordionDetails>
        </Accordion>
        {!open && (
          <Fade in={!open} timeout={500}>
            <Divider />
          </Fade>
        )}
      </Box>
    </>
  );
};

const useStyles = makeStyles({
  box: {
    display: "flex",
    alignItems: "center",
    padding: "0px 0px 50px 0px",
    margin: "0px",
  },
  accordion: {
    boxShadow: "none !important",
  },
});

export default ProductRating;
