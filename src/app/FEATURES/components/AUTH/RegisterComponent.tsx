import { FaBookAtlas } from "react-icons/fa6";
import { useAutenticateMutation } from "../../../api/_APISLICES/authApiSlice";
import React, { useEffect, useState } from "react";
import LoginResponse from "./LoginResponse";
import { useSelector } from "react-redux";
import { RootState } from "../../../api/store";
import { useLocation, useNavigate } from "react-router-dom";

export default function RegisterComp() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname);
    const [autenticate, { isError, isLoading, isSuccess, data, error }] = useAutenticateMutation();

    const [myEmail, setEmail] = useState<null | string>(null);
    const [myPassword, setPassword] = useState<null | string>(null);
    const { token } = useSelector((store: RootState) => store.token);

    useEffect(() => {
        if (token) {
            navigate("/Home");
        }
    }, [token, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (myEmail && myPassword) {
            autenticate({ email: myEmail, password: myPassword });
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <FaBookAtlas color="#6366F1" className="mx-auto h-20 w-auto" />

                    <h3 className="mt-8 text-center text-2xl font-extrabold leading-3 tracking-wide">
                        {" "}
                        📕Libri Belli📕
                    </h3>
                    <div className="flex justify-between mt-10">
                        <div
                            onClick={() => {
                                navigate("/");
                            }}
                            className=" cursor-pointer"
                        >
                            {" "}
                            <h2 className="  text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Accedi alla pagina
                            </h2>
                        </div>
                        <div
                            onClick={() => {
                                navigate("/Register");
                            }}
                            className=" cursor-pointer"
                        >
                            <h2
                                className={
                                    location.pathname === "/Register"
                                        ? "text-3xl"
                                        : `text-2xl font-bold leading-9 tracking-tight text-gray-900`
                                }
                            >
                                Registrati
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                        action="#"
                        method="POST"
                        className="space-y-6"
                    >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Indirizzo Email
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Nome Utente
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Cognome
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Password dimenticata?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className=" text-center">
                            {
                                <LoginResponse
                                    isError={isError}
                                    isLoading={isLoading}
                                    isSuccess={isSuccess}
                                    data={data}
                                    error={error}
                                />
                            }
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Inizia una prova gratuita di 14 giorni!
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
