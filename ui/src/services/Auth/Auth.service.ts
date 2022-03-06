import { BaseAPI } from "api/api";
import { LoginPayload } from "models/params.model";

export const LoginService = (payload: LoginPayload) => {
  return BaseAPI.post("/auth/signin", payload);
};
