import { atom } from "recoil";
import { genders } from "../constants/register";

const registerState = atom({
  key: "registerState",
  default: {
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    email: "",
    gender: genders[0].value,
    birthdate: new Date(),
    addressLine: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
    url: "",
    title: "",
  },
});

export default registerState;
