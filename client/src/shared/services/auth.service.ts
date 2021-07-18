import { useHistory } from "react-router";
import { BehaviorSubject } from "rxjs";
import config from "../helpers/config";

export type userSubjectType = {
  email: string;
  expiresIn: string;
  accessToken: string;
};

export function handleResponse(response: any) {
  return response.text().then((text: any) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        console.log(location.pathname);
        authenticationService.logout();
        if (location.pathname !== "/") {
          location.href = "/";
        }
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

const currentUserSubject: any = new BehaviorSubject(
  //@ts-ignore
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  login,
  logout,
  currentUser: () => currentUserSubject.asObservable(),
  get currentUserValue(): userSubjectType {
    return currentUserSubject.value;
  },
};

function login(email: string, password: string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${config.apiUrl}/auth/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
