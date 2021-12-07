import React from "react";
import { Box } from "@mui/system";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ConditionsContents from "./ConditionsContents";

const ConditionAccordion = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Submit a review and get up to 0.5 coins!</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ConditionsContents />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ConditionAccordion;
