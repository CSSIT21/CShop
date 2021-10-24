import React, { useState } from "react";
import { Box } from "@mui/system";
import { Typography, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PersonalInfo from "./PersonalInfo";
import PersonalInfoEdit from "./PersonalInfoEdit";
import ContactInfo from "./ContactInfo";

import ContactInfoEdit from "./ContactInfoEdit";
import ButtonWrapper from "./ButtonWrapper";

const Content = () => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Box className={classes.body}>
      <Box className={classes.container}>
        <Typography
          sx={{ fontSize: "32px", fontWeight: "600", marginBottom: "72px" }}
        >
          Information
        </Typography>
        <Box className={classes.personalInfo}>
          {!isEdit ? <PersonalInfo /> : <PersonalInfoEdit />}
          <Divider />
          {!isEdit ? <ContactInfo /> : <ContactInfoEdit />}
          <Divider />
          <ButtonWrapper isEdit={isEdit} setIsEdit={setIsEdit} />
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
const useStyles = makeStyles({
  container: {
    padding: "72px 0 0 0",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "70%",
  },
  body: {
    display: "flex",
    justifyContent: "center",
  },
  personalInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
});
