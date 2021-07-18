import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  TrendingUpIcon,
  ReceiptTaxIcon,
} from "@heroicons/react/outline";
import { Link, useHistory, useLocation } from "react-router-dom";
import { SelectorIcon } from "@heroicons/react/solid";
import { authenticationService } from "../../shared/services/auth.service";
import { userResponse, userService } from "../../shared/services/user.service";
import SkeletonText from "components/elements/SkeletonText";

const navigation = [
  {
    name: "Transaction",
    href: "/transaction",
    icon: ReceiptTaxIcon,
    current: true,
  },
  {
    name: "Live Prices",
    href: "/bitcoin",
    icon: TrendingUpIcon,
    current: false,
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Layout: React.FC = ({ children }) => {
  const history = useHistory();
  let location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState("/");
  const [user, setUser] = useState<userResponse>();

  useEffect(() => {
    if (!user && authenticationService.currentUserValue) {
      userService.getUser().then((user) => setUser(user));
    }
  }, []);

  useEffect(() => {
    const current_path = location.pathname.split("/")[1];
    setSelectedPath(`/${current_path}`);
  }, [selectedPath, location]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-40 flex md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex flex-col flex-1 w-full max-w-xs bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <img
                    className="w-auto h-8"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                  />
                </div>
                <nav className="px-2 mt-5 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.href.includes(selectedPath)
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.href.includes(selectedPath)
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-4 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 p-4 border-t border-gray-200">
                <a href="#" className="flex-shrink-0 block group">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-sm font-medium text-red-500 group-hover:text-red-700">
                        Logout
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 h-0 bg-white border-r border-gray-200">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 space-x-3">
                <p className="text-2xl font-extrabold text-purple-900">
                  Logo<span className="font-normal">here</span>
                </p>
              </div>

              <div className="flex flex-shrink-0 mt-6 border-t border-b border-gray-200">
                <Menu
                  as="div"
                  className="relative inline-block w-full text-left"
                >
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="group w-full px-3.5 py-4 text-sm text-left font-medium text-gray-700 hover:bg-gray-100 focus:outline-none">
                          <span className="flex items-center justify-between w-full">
                            <span className="flex items-center justify-between min-w-0 space-x-3">
                              <img
                                className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                              <span className="flex flex-col flex-1 min-w-32">
                                <SkeletonText loading={!user}>
                                  <span className="text-sm font-medium text-gray-900 truncate">
                                    {user?.firstName} {user?.lastName}
                                  </span>
                                </SkeletonText>

                                <SkeletonText loading={!user}>
                                  <span className="text-sm text-gray-500 truncate">
                                    {user?.email}
                                  </span>
                                </SkeletonText>
                              </span>
                            </span>
                            <SelectorIcon
                              className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                          </span>
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="absolute right-0 z-10 mx-1 mt-1 origin-top bg-white divide-y divide-gray-200 rounded-md shadow-lg left-10 ring-1 ring-black ring-opacity-10 focus:outline-none"
                        >
                          <div className="px-1 py-1">
                            <Menu.Item disabled>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 rounded-md text-gray-800"
                                      : "text-gray-700 opacity-75 cursor-not-allowed",
                                    "block p-2 text-sm"
                                  )}
                                >
                                  View Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active
                                      ? "bg-red-50 rounded-md text-black text-red-700 cursor-pointer"
                                      : "text-red-500",
                                    "block p-2 text-sm"
                                  )}
                                  onClick={() => {
                                    authenticationService.logout();
                                    window.location.href = "/";
                                  }}
                                >
                                  Logout
                                </div>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>

              <nav className="flex-1 px-2 mt-5 space-y-1 bg-white">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.href.includes(selectedPath)
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.href.includes(selectedPath)
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <div className="pt-1 pl-1 md:hidden sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <main className="relative z-0 flex-1 overflow-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900 capitalize">
                {selectedPath.split("/")[1]}
              </h1>
            </div>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              {/* Replace with your content */}
              {children}
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Layout;
