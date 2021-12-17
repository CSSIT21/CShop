import { atom } from "recoil";
import { days, genders, months, years } from "../constants/register";

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
  },
});

export default registerState;
