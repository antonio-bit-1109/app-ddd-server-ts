import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaShoppingCart } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaBookAtlas } from "react-icons/fa6";

interface Inav {
    name: string;
    href: string;
    current: boolean;
}

// const navigation: Inav[] = [
//     { name: "Libri", href: "#", current: true },
//     { name: "Acquisti", href: "#", current: false },
//     { name: "Projects", href: "#", current: false },
//     { name: "Calendar", href: "#", current: false },
// ];

import defaultUser from "../../../../../public/svgs/avatar-default-svgrepo-com.svg";
import React, { useEffect, useState } from "react";
import { useLogoutMutation } from "../../../api/_APISLICES/authApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../api/store";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function NavBarComp() {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [navigation, setNavigation] = useState([
        { name: "HomePage", href: "/Home", current: false },
        { name: "Acquisti", href: "#", current: false },
        { name: "Projects", href: "#", current: false },
        { name: "Calendar", href: "#", current: false },
    ]);
    const [logout, { isSuccess, isError, data }] = useLogoutMutation();
    const { token, roles } = useSelector((store: RootState) => store.token);

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        logout();
    };

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }
        // console.log(location.pathname);
        if (location.pathname !== "/Home") {
            setNavigation((prevState) => prevState.map((item) => ({ ...item, current: false })));
        }
    }, [isSuccess, isError, navigate, data, dispatch, token, location]);

    const changeSelected = (selectedItem: Inav) => {
        setNavigation((prevNavigation) =>
            prevNavigation.map((item) =>
                item.name === selectedItem.name ? { ...item, current: true } : { ...item, current: false }
            )
        );
    };

    const IsGuyAdmin = (array: string[]) => {
        const result = array.some((value) => value.toLowerCase() === "admin");
        return result;
    };

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <FaBookAtlas color="#6366F1" className="mx-auto h-10 w-auto" />
                        </div>

                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4 cursor-pointer">
                                {navigation.map((item) => (
                                    <a
                                        onClick={() => {
                                            changeSelected(item);
                                            navigate(item.href);
                                        }}
                                        key={item.name}
                                        // href={item.href}
                                        aria-current={item.current ? "page" : undefined}
                                        className={classNames(
                                            item.current
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img alt="" src={defaultUser} className="h-8 w-8 rounded-full" />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                    >
                                        Your Profile
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        onClick={() => {
                                            navigate("/Home/Settings");
                                        }}
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                    >
                                        Settings
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <form
                                        onSubmit={handleLogout}
                                        action="#"
                                        method="POST"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                    >
                                        <button type="submit">
                                            <p>Sign out</p>
                                        </button>
                                    </form>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                        <div className="ms-5">
                            <FaShoppingCart color="white" size={25} className=" cursor-pointer" />
                        </div>
                        {roles && IsGuyAdmin(roles) && (
                            <div
                                onClick={() => {
                                    navigate("/Admin");
                                }}
                                className="ms-5"
                            >
                                <RiAdminFill color="#6366F1" size={24} className=" cursor-pointer" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                                item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
