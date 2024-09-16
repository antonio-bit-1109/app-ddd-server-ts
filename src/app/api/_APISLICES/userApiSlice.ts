import { createApi } from "@reduxjs/toolkit/query/react";
// import { localHostPath } from "../../../helpers/localHost";
import { /* baseQuery, */ baseQueryWithRefreshToken } from "../../../helpers/BaseQueries";
import { IdataCreateUser, IdataResetPassword, IUser } from "../../../interfaces/interfaces";
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

        subscribe: builder.mutation<{ message: string }, IdataCreateUser>({
            query: (data) => ({
                url: "/users",
                method: "POST",
                body: { nome: data.nomeUtente, cognome: data.cognome, email: data.email, password: data.password },
            }),
        }),

        resetPassword: builder.mutation<{ message: string }, { email: string }>({
            query: (data) => ({
                url: "/users/forgottenPassword",
                method: "POST",
                body: { email: data.email },
            }),
        }),

        SendNewPassword: builder.mutation<{ message: string }, IdataResetPassword>({
            query: (data) => ({
                url: "/users/setNewPassword",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const useLazyGetAllUsersQuery: typeof userApi.endpoints.getAllUsers.useLazyQuery =
    userApi.useLazyGetAllUsersQuery;

export const useSubscribeMutation: typeof userApi.endpoints.subscribe.useMutation = userApi.useSubscribeMutation;
export const useResetPasswordMutation: typeof userApi.endpoints.resetPassword.useMutation =
    userApi.useResetPasswordMutation;

export const useSendNewPasswordMutation: typeof userApi.endpoints.SendNewPassword.useMutation =
    userApi.useSendNewPasswordMutation;
