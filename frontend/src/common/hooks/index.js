import { useState } from 'react';
import { useRecoilState } from 'recoil';
import authState from '../store/authState';
import { isArray, isFunc, isObj } from '../utils';
import { useCallback } from 'react';

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