import { fk } from './faker';
import { interval } from './../utils/index';

const fakeUsers = interval(100).map((user, id) => fk`
    id ${id}
    first_name firstName
    last_name lastName
    avatar
    url imageUrl
    uuid
    phone phoneNumber
`);

export default fakeUsers;