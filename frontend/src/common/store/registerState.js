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
    year: years[0],
    month: months[0].id,
    day: days[0],
    addressLine: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
  },
});

export default registerState;
