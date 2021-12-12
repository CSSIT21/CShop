import { atom } from "recoil";
import { nanoid } from "nanoid";

const authState = atom({
  key: "authState",
  default: {
    isLoggedIn: true,
    user: {
      first_name: "Sirawit",
      last_name: "Pratoomsuwan",
      phoneNumber: "088-000-0000",
      gender: "female",
      email: "apisit.mixko@mail.kmutt.ac.th",
      password: "Sangonomiya-Kokomi",
      url: `https://avatars.dicebear.com/api/micah/${nanoid()}.svg`,
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
