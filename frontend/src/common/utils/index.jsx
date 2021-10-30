import {
  useRecoilState
} from "recoil";

export const EMPTY_ARR = [];
export const EMPTY_OBJ = {};
export const noot = <></>;
export const noop = () => {};
export const isObj = t => typeof t === 'object';
export const isDef = t => typeof t === 'undefined';
export const isFunc = t => typeof t === 'function';
export const isStr = t => typeof t === 'string';
export const isNum = t => typeof t === 'number';
export const isSym = t => typeof t === 'symbol';
export const isBigInt = t => typeof t === "bigint";
export const isArray = t => Array.isArray(t);
export const isUndef = t => !isDef(t);
export const isNull = t => t === null;
export const isEmpty = t => t === '';
export const int = t => parseInt(t);
export const str = t => String(t);
export const bool = t => !!t;
export const float = t => parseFloat(t);
export const {
  min,
  max,
  ceil,
  floor,
  round,
  abs,
  random
} = Math;

export const shuffle = arr => arr.sort((a, b) => 0.5 - Math.random());

export const assign = (obj, props) => {
  for (let i in props) obj[i] = props[i];
  return (obj);
};


export const interval = (start = 1, end = 0) => {
  return [...Array(max(start, end) - min(start, end) + 1)].map((_, idx) => min(start, end) + idx);
};

export function For(props) {
  const each = isArray(props.each) ? props.each : interval(int(props.each));
  const cb = isFunc(props.children) ? props.children : () => props.children;
  return <>{each.map(cb)}</>;
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
      const cloned = {
        ...__
      };
      Object.defineProperties(cloned, typeof _ === "function" ? _(state) : _);
      return {
        ...cloned
      };
    });
  };
  return [state, updateState];
};