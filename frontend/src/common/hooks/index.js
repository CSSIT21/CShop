import { useState, useLayoutEffect, useEffect } from "react";
import qs from "qs";
import { useLocation } from "react-router";
import SecureLS from "secure-ls";
import { isArray, isFunc, isNull, isObj } from "../utils";
import persist from "../constants/persistent";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import authState from "../store/authState";
import axios from "axios";
import config from "../constants/index";

let lsEffects = [];
let lsKeys = [];

let persistStateIdx = 0;

export const ls = new SecureLS({
  encodingType: "rc4",
  isCompression: false,
  encryptionSecret: "s3cr3t$@1",
});

export const useMiddleware = () => {
  const history = useHistory();
  const [auth, setAuth] = useRecoilState(authState);
  const [route, setRoute] = useState("");
  useEffect(() => {
    console.log(history, auth);
    const unlisten = history.listen((r) => {
      console.warn("route changed!", auth, r.pathname);
      if (route === r.pathname) {
        setRoute(r.pathname);
        return;
      }
      setRoute(r.pathname);
      if (auth.isLoggedIn) {
        /** get current profile for each route changes! */
        axios
          .get(`${config.SERVER_URL}/profile/me`, {
            withCredentials: true,
            validateStatus: () => true,
          })
          .then(({ data }) => {
            if (data.success) {
              setAuth(({ isLoggedIn }) => ({ isLoggedIn, user: data.user }));
            }
          });
      }
    });
    return () => unlisten();
  }, []);
};

export const useStateFlush = (init = null, flush = false) => {
  const [state, setState] = useState(init);

  function setStateFlush(callback) {
    var newState = isFunc(callback) ? callback(state) : callback;
    if (flush) {
      if (isObj(newState)) return setState({ ...newState });
      if (isArray(newState)) return setState([...newState]);
    } else {
      if (isObj(newState)) {
        const cloneState = { ...state };
        Object.assign(cloneState, newState);
        return setState({ ...cloneState });
      }
    }
    return setState(newState);
  }

  return [state, setStateFlush];
};

export const useInput = (init = "") => {
  const [state, setState] = useState(init);
  return {
    value: state,
    onInput: (e) => setState(e.target.value),
  };
};

export const useForm = (init = {}) => {
  const form = {};
  for (var prop in init) {
    form[prop] = init[prop].value;
  }
  return form;
};

export function useQuery() {
  return qs.parse(useLocation().search, { ignoreQueryPrefix: true });
}

export function useLsEffect(fn) {
  return useEffect(() => {
    lsEffects.push(fn);
    return () => {
      lsEffects = [];
      lsKeys = [];
      persistStateIdx = 0;
    };
  }, []);
}

export function emitLsEffect() {
  return lsEffects.forEach((ev) => ev());
}

export function usePersistState(init, mkey = null) {
  // const ls = useLocalStorage();
  const key = isNull(mkey)
    ? `${persist.prefix}${persistStateIdx++}`
    : `${persist.prefix}${mkey}`;
  let myInit = init;
  const [state, setState] = useState(myInit);

  useLayoutEffect(() => {
    if (!ls.get(key)) ls.set(key, myInit);
    else setState(JSON.parse(ls.get(key)));
    lsKeys.push(key);
  }, []);

  useLsEffect(() => {
    var data = init;
    try {
      data = JSON.parse(ls.get(key));
      setState(data);
    } catch (e) {
      setState(init);
    }
  });

  useEffect(() => {
    /** reset hooks */
    persistStateIdx = 0;
    /** remove other persist */
    for (let k of ls.getAllKeys()) {
      if (k.startsWith(`${persist.prefix}`)) {
        if (!lsKeys.includes(k)) ls.remove(k);
      }
    }
    /** recieve  */
    ls.set(key, JSON.stringify(state));
    const handler = (ev) => {
      try {
        setState(JSON.parse(ls.get(key)));
      } catch (e) {}
    };
    window.addEventListener("storage", handler, false);
    return () => window.removeEventListener("storage", handler, false);
  }, [state]);

  return [state, setState];
}

export const useLocalStorage = () => {
  // const _ls = ls;
  let myLs = Object.assign(Object.create(Object.getPrototypeOf(ls)), ls);
  var props = [
    "clear",
    "remove",
    "removeAll",
    "resetAllKeys",
    "set",
    "getEncryptionSecret",
    "setMetaData",
    "setDataToLocalStorage",
  ];

  for (let prop of props) {
    myLs[prop] = (...params) => {
      ls[prop](...params);
      emitLsEffect();
      persistStateIdx = 0;
    };
  }
  return myLs;
};
