import { Faking, faker } from "~/common/faker/faker.js";

const fakeOrders = faker(99)((id) => ({
  orderNumber: id + 1,
  address:
    Faking.address.streetName() +
    ", " +
    Faking.address.state() +
    ", " +
    Faking.address.city() +
    ", " +
    Faking.address.zipCode(),
  pic: [
    Faking.image.cats(),
    Faking.image.animals(),
    Faking.image.fashion(),
    Faking.image.food(),
  ],
  date: Faking.date.recent().toString(),
  amount: Faking.datatype.number(),
  status: "waiting",
}));

export default fakeOrders;
