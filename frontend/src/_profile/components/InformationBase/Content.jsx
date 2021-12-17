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
import Swal from "sweetalert2";

const Content = () => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(authState);
  const [editInfo, seteditInfo] = useState(userInfo.user);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [save, setsave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({
    id: "",
    firstname: "",
    lastname: "",
    phoneNumber: "",
    confirmPassword: "",
    gender: "",
    birthdate: "",
    addressId: "",
    addressLine: "",
    district: "",
    postalCode: "",
    province: "",
    subDistrict: "",
  });
  const savenewInfo = () => {
    if (confirmPassword !== "") {
      setNewUserInfo({
        ...newUserInfo,
        id: editInfo.id,
        confirmPassword: confirmPassword,
        firstname: editInfo.customer_info.firstname,
        lastname: editInfo.customer_info.lastname,
        phoneNumber: editInfo.customer_info.phone_number,
        gender: editInfo.customer_info.gender,
        birthdate: editInfo.customer_info.birthdate,
        addressId: editInfo.customer_address.address_id,
        addressLine:
          editInfo.customer_address.address_id_from_customer_address
            .address_line,
        province:
          editInfo.customer_address.address_id_from_customer_address.province,
        district:
          editInfo.customer_address.address_id_from_customer_address.district,
        subDistrict:
          editInfo.customer_address.address_id_from_customer_address
            .sub_district,
        postalCode:
          editInfo.customer_address.address_id_from_customer_address
            .postal_code,
      });
      setsave(true);
      Swal.fire({
        title: "Saved!",
        text: "Your information has been saved",
        icon: "success",
        timer: 2000,
      });
    } else {
      Swal.fire({
        title: "Failed!",
        text: "Please confirm your password",
        icon: "error",
        timer: 2000,
      });
    }
  };
  const updateInfo = () => {
    if (save) {
      setIsLoading(true);
      axios
        .patch(config.SERVER_URL + "/profile/update", newUserInfo)
        .then(({ data }) => {
          console.log(data.success);
          if (data.success) {
            Swal.fire({
              title: "Success!",
              text: "Your information has been updated!",
              icon: "success",
              timer: 2000,
            });
            setConfirmPassword("");
            setsave(false);
            axios
              .get(`${config.SERVER_URL}/profile/me`, {
                withCredentials: true,
                validateStatus: () => true,
              })
              .then(({ data }) => {
                if (data.success) {
                  setUserInfo(({ isLoggedIn }) => ({
                    isLoggedIn,
                    user: data.user,
                  }));
                }
              });
          } else {
            Swal.fire({
              title: "Update failed!",
              text: "Please check your information",
              icon: "error",
              timer: 2000,
            });
          }
          setIsLoading(false);
          setIsEdit(!isEdit);
          window.scrollTo(0, 0);
        });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please save your information first",
        icon: "error",
        timer: 2000,
      });
      setIsEdit(true);
    }
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
              saveInfo={savenewInfo}
            />
          )}
          <Divider />
          <ButtonWrapper
            isEdit={isEdit}
            isLoading={isLoading}
            setIsEdit={setIsEdit}
            updateInfo={updateInfo}
            saveInfo={savenewInfo}
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
