import { createApi } from "@reduxjs/toolkit/query/react";
// import { localHostPath } from "../../../helpers/localHost";
import { /* baseQuery, */ baseQueryWithRefreshToken } from "../../../helpers/BaseQueries";
import { IBook, IBook_noImg, IdataForm, IRandomDataArray } from "../../../interfaces/interfaces";

// builder.query/mutation< RISPOSTA DELL API IN CASO DI SUCCESSO  ,   PARAMETRO che si aspetta la query/fetch   >

export const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ["book"],
    endpoints: (builder) => ({
        // query di tipo "lazy" - da specificare quando chiamare la query.
        getAllBook: builder.query<{ Books: IBook[] }, void>({
            query: () => ({
                url: "/book",
                method: "GET",
            }),
            providesTags: ["book"],
        }),

        editBook: builder.mutation<{ message: string }, IBook_noImg>({
            query: (data) => ({
                url: "/book/edit",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["book"],
        }),

        editBookImage: builder.mutation<{ message: string }, { file: FormData }>({
            query: (data) => ({
                url: "/book/uploadBookImg",
                method: "POST",
                body: data.file,
            }),
            invalidatesTags: ["book"],
        }),

        GetInfoFromScraping: builder.query<IRandomDataArray, void>({
            query: () => ({
                url: "/book/scrapingRandomInfo",
                method: "GET",
            }),
        }),

        createBook: builder.mutation<{ message: string }, IdataForm>({
            query: (data) => ({
                url: "/book",
                method: "POST",
                body: {
                    nomeLibro: data.titolo,
                    prezzoLibro: data.prezzo,
                    autoreLibro: data.autore,
                    pagine: data.numaPagine,
                    isCopertinaRigida: data.isCopertinaRigida,
                    tematica: data.tematica,
                },
            }),
        }),
    }),
});

export const useLazyGetAllBookQuery: typeof bookApi.endpoints.getAllBook.useLazyQuery = bookApi.useLazyGetAllBookQuery;
export const useEditBookMutation: typeof bookApi.endpoints.editBook.useMutation = bookApi.useEditBookMutation;
export const useEditBookImageMutation: typeof bookApi.endpoints.editBookImage.useMutation =
    bookApi.useEditBookImageMutation;

export const useLazyGetInfoFromScrapingQuery: typeof bookApi.endpoints.GetInfoFromScraping.useLazyQuery =
    bookApi.useLazyGetInfoFromScrapingQuery;
export const useCreateBookMutation: typeof bookApi.endpoints.createBook.useMutation = bookApi.useCreateBookMutation;
