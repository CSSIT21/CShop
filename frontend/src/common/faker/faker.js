import * as Faking from 'faker/locale/en';
import { assign, interval, isFunc, isStr, noop } from './../utils/index';

/**
 * 
 * Usage: 
const fakerItems = faker(100)(id => ({
    id,
    first_name: Faking.name.firstName(),
    last_name: Faking.name.lastName(),
    url: Faking.image.avatar(),
    url_image: Faking.image.imageUrl(),
    ...
}));

or 

const fakerItems = fk`
    id ${id}
    first_name firstName
    last_name lastName
    avatar
    url imageUrl
    uuid
`;

 */

const {lorem,time, random, name, address, animal, commerce, company, database, finance, vehicle, date, image, internet, music, system, phone} = Faking;
const collections = {...lorem,...time,...random,...name, ...address, ...animal, ...commerce, ...company, ...database, ...finance, ...vehicle, ...date, ...image, ...internet, ...music, ...system, ...phone};
export const fk = (literals, ...substitutions) => {
    let result = '';
    let commands = [];
    let comObj = {};
    for (let i = 0; i < substitutions.length; i++) {
        result += literals[i];
        result += substitutions[i];
        const data = {[literals[i].trim()]: substitutions[i]};
        commands.push(data);
        assign(comObj, data);
    }
    result += literals[literals.length - 1];
    for(var cmd of literals[literals.length - 1].split('\n')){
        if(cmd.trim() === '') continue;
        const [keyName, action = false] = cmd.trim().split(" ");
        const data = !action ? {[keyName]: (collections[keyName] || noop)()} : {[keyName]: (collections[action] || noop)()};
        commands.push(data);
        assign(comObj, data);
    }
    return comObj;
}


export const faker = (amount=1) => {
    return (properties) => {
        return interval(0,amount-1).map(isFunc(properties) ? properties : () => properties);
    };
};

export { Faking };

// const fakerItems = faker(100)`
//     id: id
//     name: name
//     first_name
//     last_name
// `;
