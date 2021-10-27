import * as Faking from 'faker/locale/en';
import { interval, isFunc } from './../utils/index';

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
 */

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
