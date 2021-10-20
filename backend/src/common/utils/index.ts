export const delay = ms => new Promise((res,rej) => setTimeout(res,ms));

export const transformBigInt = obj => {
    for(let key in obj){
        if(typeof obj[key] === 'object'){
            transformBigInt(obj[key]);
        }
    }
};