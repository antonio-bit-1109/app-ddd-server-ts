// import { FaBookAtlas } from "react-icons/fa6";
import { useAutenticateMutation } from "../../../api/_APISLICES/authApiSlice";
import React, { useEffect, useState } from "react";
import LoginResponse from "./LoginResponse";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../api/store";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalDefault } from "../ADMIN/ModalDefault";
import { isResendPswHasBeenSend, setIsModalForgotPswVisible } from "../USER/usersSlice";

export default function LoginComp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname);
    const [autenticate, { isError, isLoading, isSuccess, data, error }] = useAutenticateMutation();

    const [myEmail, setEmail] = useState<null | string>(null);
    const [myPassword, setPassword] = useState<null | string>(null);
    const { token } = useSelector((store: RootState) => store.token);

    const { isModalForgotPswVisible, resendPswHasBeenSend } = useSelector((store: RootState) => store.users);

    const handleVIsibilityModal = () => {
        dispatch(setIsModalForgotPswVisible(!isModalForgotPswVisible));
    };

    useEffect(() => {
        let id: number;
        if (token) {
            navigate("/Home");
            return;
        }

        if (resendPswHasBeenSend) {
            id = setTimeout(() => {
                dispatch(isResendPswHasBeenSend(false));
            }, 5000);
        }

        return () => {
            clearTimeout(id);
        };
    }, [token, navigate, resendPswHasBeenSend, dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (myEmail && myPassword) {
            autenticate({ email: myEmail, password: myPassword });
        }
    };

    return (
        <>
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
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div
                                onClick={() => {
                                    dispatch(setIsModalForgotPswVisible(true));
                                }}
                                className="text-sm"
                            >
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
                    {resendPswHasBeenSend && (
                        <div className=" shadow-orange-200 border-spacing-3 font-semibold text-center my-3 border-solid border-2 border-gray-700 py-4 text-gray-500 bg-gray-200  rounded-md p-8">
                            <p>
                                se la mail inserita corrisponde a quella salvata nei nostri database, riceverai una mail
                                con le istruzioni per la re impostazione della password
                            </p>
                        </div>
                    )}
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{" "}
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Inizia una prova gratuita di 14 giorni!
                    </a>
                </p>
            </div>
            <ModalDefault
                state={isModalForgotPswVisible}
                setter={handleVIsibilityModal}
                title="ottieni nuovamente la password"
                text="inserisci la tua mail e riceverai un messaggio contenente le istruzioni per reimpostare la password."
                FETCH="resetPasswordUser"
                INPUT="email"
                labelString="inserisci la tua mail"
            />
        </>
    );
}
