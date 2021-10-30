import { useState, useLayoutEffect, useEffect } from 'react';
import qs from "qs";
import { useLocation } from "react-router";
import SecureLS from 'secure-ls';
import { isArray, isFunc, isNull, isObj } from '../utils';
export let lsEffects = [];
var persistStateIdx = 0;

export const ls = new SecureLS({
    encodingType: 'rc4',
    isCompression: false,
    encryptionSecret: 's3cr3t$@1'
});

export const useStateFlush = (init=null,flush=false) => {
    const [state, setState] = useState(init);

    function setStateFlush(callback){
        var newState = isFunc(callback) ? callback(state) : callback;
        if(flush){
            if(isObj(newState))
                return setState({...newState});
            if(isArray(newState))
                return setState([...newState]);
        }else{
            if(isObj(newState)){
                const cloneState = {...state};
                Object.assign(cloneState, newState);
                return setState({...cloneState});
            }
        }
        return setState(newState);
    }

    return [state,setStateFlush];
};

export const useInput = (init="") => {
    const [state, setState] = useState(init);
    return {
        value: state,
        onInput: e => setState(e.target.value),
    }
}

export const useForm = (init={}) => {
    const form = {};
    for(var prop in init){
        form[prop] = init[prop].value;
    }
    return form;
};

export function useQuery() {
    return qs.parse(useLocation().search, { ignoreQueryPrefix: true });
}

export function useLsEffect(fn){
    return useEffect(() => {
        lsEffects.push(fn);
        return () => lsEffects = [];
    },[]);
}

export function emitLsEffect(){
    return lsEffects.forEach(ev => ev());
}

export function usePersistState(init, key=null){
    if(isNull(key)) key = `_persist_state_${persistStateIdx++}`;
    let myInit = ls.get(key) ? JSON.parse(ls.get(key)) : (() => { ls.set(key,JSON.stringify(init)); return init})();
    const [state, setState] = useState(myInit);
    
    useLayoutEffect(() => {
        persistStateIdx = 0;
    });

    useLsEffect(() => {
        var data = init;
        try{
            data = JSON.parse(ls.get(key))
            setState(data);
        }catch(e){
            setState(init);
        }
    });
    useEffect(() => {
        ls.set(key, JSON.stringify(state));
        const handler = ev => {
            setState(JSON.parse(ls.get(key)));
        };
        window.addEventListener('storage', handler ,false);
        return () => window.removeEventListener('storage', handler ,false);
    }, [state]);

    return [state,setState];
}

export const useLocalStorage = () => {
    // const _ls = ls;
    let myLs = Object.assign(Object.create(Object.getPrototypeOf(ls)), ls);
    var props = ["clear",
    "remove",
    "removeAll",
    "resetAllKeys",
    "set",
    "getEncryptionSecret",
    "setMetaData",
    "setDataToLocalStorage"];

    for(let prop of props){
        myLs[prop] = (...params) => {
            ls[prop](...params);
            emitLsEffect();
            persistStateIdx = 0;
        };
    }
    return myLs;
}