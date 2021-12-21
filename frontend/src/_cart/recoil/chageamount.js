import { atom, selector } from "recoil";
export const amount = atom({
  key: "amount",
  default: [],
});

export const amountQuery = selector({
  key: "amountQuery",
  get: ({ get }) => get(amount),
  set: ({ set, get }, data) => {
    let isok = false;
    let newamount = get(amount).map((item) => {
      if (item.id === data.id) {
        isok = true;
        return { ...item, amount: data.amount };
      }
      return item;
    });
    if (!isok) {
      newamount.push(data);
    }
    set(amount, newamount);
  },
});
