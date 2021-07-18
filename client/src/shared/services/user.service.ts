import config from "../helpers/config";
import { authHeader } from "../helpers/authHeader";
import { handleResponse } from "./auth.service";

export type userResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export const userService = {
  getUser,
};

function getUser() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${config.apiUrl}/auth/user`, requestOptions).then(
    handleResponse
  );
}
