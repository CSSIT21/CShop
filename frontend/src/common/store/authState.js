import { atom } from "recoil";

const authState = atom({
  key: "authState",
  default: {
    isLoggedIn: true,
    user: {
      first_name: "Sirawit",
      last_name: "Pratoomsuwan",
      contact: "088-000-0000",
      gender: "female",
      email: "test@gmail.com",
      url: "https://cdn.discordapp.com/attachments/681542997946794044/888113518182805614/unknown.png",
    },
  },
});

export default authState;
