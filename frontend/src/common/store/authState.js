import { atom } from "recoil";

const authState = atom({
  key: "authState",
  default: {
    isLoggedIn: true,
    user: {
      first_name: "Sirawit",
      last_name: "Pratoomsuwan",
      phoneNumber: "088-000-0000",
      gender: "female",
      email: "test@gmail.com",
      password: "123456789",
      url: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      day: "31",
      month: "2",
      year: "2021",
      addressLine: "126 Pracha Uthit Rd",
      province: "Bangkok",
      district: "Thung Khru",
      subDistrict: "Bang Mot",
      postalCode: "10140",
    },
  },
});

export default authState;
