import { makeAutoObservable } from "mobx";

type roles = "CLEANER" | "LANDLORD";

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
  }
}

export const User = new _User();
