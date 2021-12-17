import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
import SecureLS from "secure-ls";
var ls = new SecureLS({encodingType: 'aes'});

const { persistAtom } = recoilPersist({
  key: "storage",
  storage: {
    getItem: (key) => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
  }
});

const authState = atom({
  key: "authState",
  default: {
    isLoggedIn: false,
    user: {
      customer_info:{
        
      }
    },
  },
  effects_UNSTABLE: [persistAtom],
});

export default authState;
