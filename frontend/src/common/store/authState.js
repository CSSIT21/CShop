import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "storage",
});

const authState = atom({
  key: "authState",
  default: {
    isLoggedIn: false,
    user: {
      customer_info: {},
    },
  },
  effects_UNSTABLE: [persistAtom],
});

export default authState;
