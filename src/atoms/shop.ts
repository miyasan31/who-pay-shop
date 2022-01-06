import { atom } from "recoil";

export const shop = atom({
  key: "shop",
  default: {
    id: "",
    shopName: "",
    address: "",
    email: "",
    phone: "",
    token: "",
    isSignin: false,
  },
});
