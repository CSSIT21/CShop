import React from "react";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
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

const ProductDescription = ({ productDetails }) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis minima dolor labore quam, temporibus repellendus sequi deserunt pariatur nulla praesentium laboriosam incidunt, quae expedita maiores distinctio iste. Error, impedit eveniet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis minima dolor labore quam, temporibus repellendus sequi deserunt pariatur nulla praesentium laboriosam incidunt, quae expedita maiores distinctio iste. Error, impedit eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis minima dolor labore quam, temporibus repellendus sequi deserunt pariatur nulla praesentium laboriosam incidunt, quae expedita maiores distinctio iste. Error, impedit eveniet.";

  const classes = useStyles();

  return (
    <>
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
            aria-controls="expand-detail"
            id="expand-detail"
            onClick={handleClick}
            sx={{
              padding: 0,
              margin: "0px 0px 45px 0px",
            }}
          >
            <Box className={classes.title}>
              <Typography fontWeight={600} fontSize="30px">
                Product Detail
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "0 50px 0 30px",
            }}
          >
            <Fade in={open} timeout={500}>
              <Typography>{productDetails}</Typography>
            </Fade>
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
  title: {
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
