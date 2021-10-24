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
          sx={{
            boxShadow: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandLessRoundedIcon />}
            aria-controls="expand-detail"
            id="expand-detail"
            onClick={handleClick}
            sx={{
              padding: "0px 0px 40px 0px",
            }}
          >
            <Box className={classes.head}>
              <Typography sx={{ fontWeight: 600, fontSize: "30px" }}>
                Product Detail
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 0,
            }}
          >
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
export default ProductDescription;
