import { createApi } from "@reduxjs/toolkit/query/react";
// import { localHostPath } from "../../../helpers/localHost";
import { baseQuery } from "../../../helpers/BaseQueries";
import { ILoginData, Itoken } from "../../../interfaces/interfaces";
import { clearToken } from "../../FEATURES/components/AUTH/tokenSlice";

// builder.query/mutation< RISPOSTA DELL API IN CASO DI SUCCESSO  ,   PARAMETRO che si aspetta la query/fetch   >

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQuery,
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        autenticate: builder.mutation<Itoken, ILoginData>({
            query: (credentials) => ({
                url: "/auth",
                method: "POST",
                body: credentials,
            }),
        }),

        logout: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(clearToken());
                    console.log("logout Effettuato con successo.");
                    dispatch(authApi.util.resetApiState());
                } catch (err) {
                    console.log(err);
                }
            },
        }),
    }),
});

export const useAutenticateMutation: typeof authApi.endpoints.autenticate.useMutation = authApi.useAutenticateMutation;
export const useLogoutMutation: typeof authApi.endpoints.logout.useMutation = authApi.useLogoutMutation;
