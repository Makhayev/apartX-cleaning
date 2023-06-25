import { makeAutoObservable } from "mobx";

export type roles = "CLEANER" | "LANDLORD";

class _User {
  auth: boolean = false;
  email?: string;
  role?: roles;
  name?: string;
  id?: string;
  surname?: string;
  iin?: string;
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

  assignUser(user: Partial<_User>) {
    this.auth = user.auth ?? false;
    this.email = user.email;
    this.role = user.role;
    this.name = user.name;
    this.id = user.id;
    this.surname = user.surname;
    this.age = user.age;
  }

  logout() {
    this.auth = false;
    this.email = undefined;
    this.role = undefined;
    this.name = undefined;
    this.id = undefined;
    this.surname = undefined;
    this.age = undefined;
    localStorage.clear();
  }
}

export const User = new _User();
