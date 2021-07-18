import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";
import toast from "react-hot-toast";

interface Props {
  id: string;
  show: boolean;
  title: string;
  message: string;
  icon?: JSX.Element;
}

const Toast = (props: Props) => {
  const { show, id, icon, title, message } = props;

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-200 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex justify-end flex-1 animate-enter">
        <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">{icon ? icon : null}</div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
              <div className="flex flex-shrink-0 ml-4">
                <button
                  className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => toast.dismiss(id)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Toast;
