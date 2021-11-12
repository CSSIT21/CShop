import { fk } from './faker';
import { interval } from '../utils/index';

// generate 100 faker users from id 0-99
const fakeUsers = interval(99).map(id => fk`
    id ${id}
    first_name firstName
    last_name lastName
    avatar
    url imageUrl
    uuid
    phone phoneNumber
`);

export default fakeUsers;