import { useState } from 'react';

export const useAtomic = (init=null,flush=false) => {
    const [state, setState] = useState(init);

    function setAtomic(callback){
        if(typeof callback === 'function'){
            var newState = callback(state);
            if(flush){
                if(typeof newState === 'object')
                    setState();
            }
            if(typeof newState)

            return setState()
        }

    }

    return [state,setAtomic];
};