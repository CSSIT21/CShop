import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fade,
  Typography,
  Divider,
} from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { noop } from "../../../common/utils";

const ProfileArea = ({
  title = null,
  timeout = 250,
  children,
  open = false,
  setOpen = noop,
  summaryProps = {},
  typographyProps = {},
  detailProps = {},
  ...rest
}) => {
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Accordion
        className={classes.accordion}
        TransitionProps={{ onExited: () => setOpen(false), timeout: 700 }}
        disableGutters
        defaultExpanded={open}
        {...rest}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreRounded />}
          aria-controls="expand-comment"
          id="expand-comment"
          onClick={handleClick}
          {...summaryProps}
        >
          {title !== null && (
            <Box className={classes.box}>
              <Typography
                sx={{ fontWeight: 500, fontSize: "24px" }}
                {...typographyProps}
              >
                {title}
              </Typography>
            </Box>
          )}
        </AccordionSummary>
        <AccordionDetails {...detailProps}>
          <Fade in={open} timeout={timeout}>
            <Box className={classes.profileAreaButton}>{children}</Box>
          </Fade>
        </AccordionDetails>
      </Accordion>
      <Divider />
    </Box>
  );
};

const useStyles = makeStyles({
  profileAreaButton: {
    display: "flex",
    padding: "0px 0px 30px 0px",
  },
  box: {
    display: "flex",
    alignItems: "center",
    padding: "25px 0px",
  },
  accordion: {
    boxShadow: "none !important",
    border: "0px solid !important",
    "&:before": {
      display: "none",
    },
  },
});

export default ProfileArea;
