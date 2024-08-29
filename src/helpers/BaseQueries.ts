import { BaseQueryFn, fetchBaseQuery, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { RootState } from "../app/api/store";
import { FetchArgs } from "@reduxjs/toolkit/query";
import { IRefreshResponse } from "../interfaces/interfaces";
import { clearToken, setToken } from "../app/FEATURES/components/AUTH/tokenSlice";
import { authApi } from "../app/api/_APISLICES/authApiSlice";

export const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    credentials: "include",
});

export const BaseQueryAuth = fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const { token } = (getState() as RootState).token;
        if (token as string) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithRefreshToken: BaseQueryFn<
    string | FetchArgs,
    unknown,
    unknown,
    object,
    FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
    let result = await BaseQueryAuth(args, api, extraOptions);
    if (result.error && result.error.status === 403) {
        // Il token è scaduto, tentiamo di ottenere un nuovo token
        const refreshResult = await BaseQueryAuth("/auth/refresh", api, extraOptions);
        const data = refreshResult.data as IRefreshResponse;
        // console.log(data);
        if (data && refreshResult.data) {
            // Salvare il nuovo token
            api.dispatch(setToken({ token: data.token }));
            // Riproviamo la richiesta originale con il nuovo token
            result = await BaseQueryAuth(args, api, extraOptions);
        } else {
            // Il refresh del token è fallito, fare il logout
            api.dispatch(clearToken());
            const logoutResponse = await api.dispatch(authApi.endpoints.logout.initiate());

            if (logoutResponse.data) {
                // Gestisci la risposta positiva del logout
                console.log("Logout successful:", logoutResponse.data.message);
            } else if (logoutResponse.error) {
                // Gestisci un eventuale errore nella risposta del logout
                console.error("Logout failed:", logoutResponse.error);
            }

            // toast.error("Sessione scaduta. Effettua nuovamente il login.");
        }
    }

    return result;
};
