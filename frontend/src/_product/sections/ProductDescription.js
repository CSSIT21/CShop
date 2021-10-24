import React from "react";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Fade,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";

const ProductDescription = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis minima dolor labore quam, temporibus repellendus sequi deserunt pariatur nulla praesentium laboriosam incidunt, quae expedita maiores distinctio iste. Error, impedit eveniet.";

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
            expandIcon={<ExpandLessRoundedIcon />}
            aria-controls="expand-detail"
            id="expand-detail"
            onClick={handleClick}
            sx={{
              padding: 0,
            }}
          >
            <Box className={classes.box}>
              <Typography sx={{ fontWeight: 600, fontSize: "30px" }}>
                Product Detail
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {open && <typography>{description}</typography>}
          </AccordionDetails>
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
export default ProductDescription;
