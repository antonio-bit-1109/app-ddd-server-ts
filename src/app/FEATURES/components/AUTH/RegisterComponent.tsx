// import { useAutenticateMutation } from "../../../api/_APISLICES/authApiSlice";
// import React, { useEffect, useState } from "react";
/* import LoginResponse from "./LoginResponse"; */
// import { useSelector } from "react-redux";
// import { RootState } from "../../../api/store";
import React, { useEffect, useState } from "react";
import { useLocation /* useNavigate */ } from "react-router-dom";
import { useSubscribeMutation } from "../../../api/_APISLICES/userApiSlice";
import EsitoFetchMsg from "../GENERAL/EsitoFetchMsg";

export default function RegisterComp() {
    // const navigate = useNavigate();

    const [sendData, { isLoading, isSuccess, isError, error, data }] = useSubscribeMutation();

    const location = useLocation();
    console.log(location.pathname);

    interface IdataCreateUser {
        email: null | string;
        nomeUtente: null | string;
        cognome: null | string;
        password: null | string;
    }

    const [dataUser, setDataUser] = useState<IdataCreateUser>({
        email: null,
        nomeUtente: null,
        cognome: null,
        password: null,
    });

    useEffect(() => {
        return () => {
            setDataUser({
                email: null,
                nomeUtente: null,
                cognome: null,
                password: null,
            });
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { email, nomeUtente, cognome, password } = dataUser;
        if (email && nomeUtente && cognome && password) {
            // sendData({ nomeUtente, email, password, cognome });
            sendData({ nomeUtente: nomeUtente, email: email, password: password, cognome: cognome });
            return;
        }
    };

    return (
        <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Indirizzo Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setDataUser({ ...dataUser, email: e.target.value });
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="nomeUtente" className="block text-sm font-medium leading-6 text-gray-900">
                            Nome Utente
                        </label>
                        <div className="mt-2">
                            <input
                                id="nomeUtente"
                                name="nomeUtente"
                                type="text"
                                required
                                autoComplete="text"
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setDataUser({ ...dataUser, nomeUtente: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="cognome" className="block text-sm font-medium leading-6 text-gray-900">
                            Cognome
                        </label>
                        <div className="mt-2">
                            <input
                                /*   onChange={(e) => {
                                    setEmail(e.target.value);
                                }} */
                                id="cognome"
                                name="cognome"
                                type="text"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setDataUser({ ...dataUser, cognome: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            {/* <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Password dimenticata?
                                </a>
                            </div> */}
                        </div>
                        <div className="mt-2">
                            <input
                                /*   onChange={(e) => {
                                    setPassword(e.target.value);
                                }} */
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setDataUser({ ...dataUser, password: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                    <EsitoFetchMsg
                        isLoading={isLoading}
                        isError={isError}
                        isSuccess={isSuccess}
                        data={data}
                        error={error}
                    />
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Iscriviti
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
            {/* </div> */}
        </>
    );
}
