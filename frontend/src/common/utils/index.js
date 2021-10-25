import { useLocation } from "react-router";
import { useRecoilState } from "recoil";
import qs from "qs";

export const noop = () => {};
export const isObj = t => typeof t === 'object';
export const isDef = t => typeof t === 'undefined';
export const isArray = t => Array.isArray(t);
export const isUndef = t => !isDef(t);
export const isFunc = t => typeof t === 'function';
export const isNull = t => t === null;
export const isEmpty = t => t === '';

export function For(props) {
  const each = props.each || [];
  return <>{each.map(props.children)}</>;
}

export function useQuery() {
  return qs.parse(useLocation().search, { ignoreQueryPrefix: true });
}

export function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export const useAtomState = (_state) => {
  const [state, setState] = useRecoilState(_state);
  const updateState = (_) => {
    setState((__) => {
      const cloned = { ...__ };
      Object.defineProperties(cloned, typeof _ === "function" ? _(state) : _);
      return { ...cloned };
    });
  };
  return [state, updateState];
};
