import React from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
// import Accordion from "@mui/material/Accordion";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ConditionsContents from "./ConditionsContents";
import coin from "../../assets/coin.png";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#F4F5F6",
  ".MuiAccordionSummary-content": { margin: "5px 0" },
}));
const ConditionAccordion = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={coin}
              alt={0}
              style={{
                width: "30px",
                height: "30px",
              }}
            />
            <Typography sx={{ marginLeft: "14px" }}>
              Submit a review and get up to 0.5 coins!
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <ConditionsContents />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ConditionAccordion;
