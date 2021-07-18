import { LockClosedIcon } from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { authenticationService } from "../shared/services/auth.service";
import { Toaster } from "react-hot-toast";
import { notify } from "components/modules/Notification";
import icon from "../favicon.svg";

interface Props {}

type userData = {
  email: string;
  password: string;
};

const SignIn = (props: Props) => {
  const history = useHistory();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<userData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (authenticationService.currentUserValue) {
      history.push("/transaction");
    }
  }, []);

  const handleLogin = () => {
    setIsLoading(true);

    authenticationService.login(data.email, data.password).then(
      (user) => {
        if (authenticationService.currentUserValue) {
          // history.push("/transaction");
          history.go(0);
        }
      },
      (error) => {
        notify({
          title: "Something is wrong...",
          message: error,
          icon: (
            <XCircleIcon className="w-6 h-6 text-red-500" aria-hidden="true" />
          ),
        });
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="w-auto h-20 mx-auto" src={icon} alt="Logo" />
          <h2 className="mt-8 text-3xl font-extrabold text-center text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
              {/* {JSON.stringify(data)} */}
            </a>
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => {
                  setData({ ...data, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => {
                  setData({ ...data, [e.target.name]: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="remember_me"
                className="block ml-2 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => handleLogin()}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              {isLoading ? "Logging in..." : "Sign in"}
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SignIn;
