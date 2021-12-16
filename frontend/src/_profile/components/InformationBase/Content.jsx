import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PersonalInfo from "./PersonalInfo";
import PersonalInfoEdit from "./PersonalInfoEdit";
import ContactInfo from "./ContactInfo";
import ContactInfoEdit from "./ContactInfoEdit";
import ButtonWrapper from "./ButtonWrapper";
import authState from "~/common/store/authState";
import { useRecoilState } from "recoil";
import axios from "axios";
import config from "../../../common/constants";

const Content = () => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(authState);
  const [editInfo, seteditInfo] = useState(userInfo.user);
  const [confirmPassword, setConfirmPassword] = useState();

  const newUserInfo = () => {
    console.log(editInfo);
  };

  return (
    <Box className={classes.body}>
      <Box className={classes.container}>
        <Typography
          sx={{ fontSize: "32px", fontWeight: "600", marginBottom: "72px" }}
        >
          Information
        </Typography>
        <Box className={classes.personalInfo}>
          {!isEdit ? (
            <PersonalInfo userInfo={userInfo.user} />
          ) : (
            <PersonalInfoEdit editInfo={editInfo} seteditInfo={seteditInfo} />
          )}
          <Divider />
          {!isEdit ? (
            <ContactInfo userInfo={userInfo.user} />
          ) : (
            <ContactInfoEdit
              confirmPassword={confirmPassword}
              editInfo={editInfo}
              seteditInfo={seteditInfo}
              setConfirmPassword={setConfirmPassword}
            />
          )}
          <Divider />
          <ButtonWrapper
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            newUserInfo={newUserInfo}
          />
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
