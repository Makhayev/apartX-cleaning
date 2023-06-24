import { api } from "@/api/AxiosInstance";
import type { roles } from "@/store/User/User";

export const AuthApi = {
  loginByEmail(email: string, password: string) {
    return api.post("/auth/authenticate", {
      email,
      password,
    });
  },
  register(email: string, password: string, role: roles) {
    console.log(email, password, role);
    return api.post("/auth/register", {
      email,
      password,
      role,
    });
  },
  verifyEmail(email: string, code: string) {
    return api.post("/auth/verify", {
      email,
      code,
    });
  },
};
