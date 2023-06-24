import { makeAutoObservable } from "mobx";

export type roles = "CLEANER" | "LANDLORD";

class _User {
  auth: boolean = false;
  email?: string;
  role?: roles;
  name?: string;
  id?: string;
  surname?: string;
  age?: number;
  constructor() {
    makeAutoObservable(this);
    // if (typeof window !== "undefined") {
    //   if (localStorage.getItem("access_token")) {
    //     try {
    //       AuthApi.getUserInfo().then((response) => {
    //         console.log(response.data);
    //       });
    //     } catch (err: unknown) {
    //       console.log(err);
    //     }
    //   }
    // }
  }
}

export const User = new _User();
