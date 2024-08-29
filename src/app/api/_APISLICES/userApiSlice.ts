import { createApi } from "@reduxjs/toolkit/query/react";
// import { localHostPath } from "../../../helpers/localHost";
import { /* baseQuery, */ baseQueryWithRefreshToken } from "../../../helpers/BaseQueries";
import { IUser } from "../../../interfaces/interfaces";
// import { IBook } from "../../../interfaces/interfaces";

// builder.query/mutation< RISPOSTA DELL API IN CASO DI SUCCESSO  ,   PARAMETRO che si aspetta la query/fetch   >

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ["user"],
    endpoints: (builder) => ({
        getAllUsers: builder.query<IUser[], void>({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            providesTags: ["user"],
        }),
    }),
});

export const useLazyGetAllUsersQuery: typeof userApi.endpoints.getAllUsers.useLazyQuery =
    userApi.useLazyGetAllUsersQuery;
// export const useAutenticateMutation: typeof authApi.endpoints.autenticate.useMutation = authApi.useAutenticateMutation;
// export const useLogoutMutation: typeof authApi.endpoints.logout.useMutation = authApi.useLogoutMutation;
