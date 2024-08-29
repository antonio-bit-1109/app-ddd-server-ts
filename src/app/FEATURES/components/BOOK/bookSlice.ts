import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { /* IBook,  */ IBook /* IBook_noImg */ } from "../../../../interfaces/interfaces";

export interface BookInterface {
    selectedBookForEdit: null | IBook;
    isModalEditBookOpen: boolean;
    bookId_edit_img: string | null;
    arrayDatiRandom: null | (string | number | boolean)[];
    // errMsg_scrapingData: null | string;
    // loadingMsg_scrapingData: null | string;
    isLoadingState: null | boolean;
    ErrMsgState: string | undefined | null;
    isSuccessState: null | boolean;
    isErrorBoolean: null | boolean;
    message: string;
    //
    //
    titoloRandom: null | string;
    prezzoRandom: null | number;
    autoreRandom: null | string;
    numPagineRandom: null | number;
    temaRandom: null | string;
    isCopertinaRigidaRandom: null | boolean;
}

const initialState: BookInterface = {
    selectedBookForEdit: null,
    isModalEditBookOpen: false,
    bookId_edit_img: null,
    // errMsg_scrapingData: null,
    // loadingMsg_scrapingData: null,
    isLoadingState: null,
    ErrMsgState: null,
    isSuccessState: null,
    isErrorBoolean: null,
    message: "",
    //
    arrayDatiRandom: null,
    titoloRandom: null,
    prezzoRandom: null,
    autoreRandom: null,
    numPagineRandom: null,
    temaRandom: null,
    isCopertinaRigidaRandom: null,
};

// state relativi alla memorizzazione del token dell utente loggato al momento, e dati username, ruoli (decriptati)
const BookSlice = createSlice({
    name: "BookSlice",
    initialState,
    reducers: {
        selectedBookEdit: (state, action: PayloadAction<IBook | null>) => {
            state.selectedBookForEdit = action.payload;
        },

        ModalEditBookIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isModalEditBookOpen = action.payload;
        },

        setBookId_EditImg: (state, action: PayloadAction<string | null>) => {
            state.bookId_edit_img = action.payload;
        },

        salvaRandomDatiBook: (state, action: PayloadAction<(string | number | boolean)[]>) => {
            if (Array.isArray(action.payload)) {
                const arrayData = action.payload;
                state.arrayDatiRandom = arrayData;

                state.titoloRandom = arrayData[0] as string;
                state.prezzoRandom = arrayData[1] as number;
                state.autoreRandom = arrayData[2] as string;
                state.numPagineRandom = arrayData[3] as number;
                state.temaRandom = arrayData[4] as string;
                state.isCopertinaRigidaRandom = arrayData[5] as boolean;
                return;
            }

            throw new Error(
                "l' array di dati proveniente dallo scraping non contiene i dati attesi.  (string , number , boolean)"
            );
        },
        salvaStatoSuccess: (state, action: PayloadAction<boolean>) => {
            state.isSuccessState = action.payload;
        },
        salvaStatoPending: (state, action: PayloadAction<boolean>) => {
            state.isLoadingState = action.payload;
        },
        salvaStatoError: (state, action: PayloadAction<string | undefined>) => {
            if (action.payload === undefined) {
                console.log(" msg di errore undefined");
                return;
            }
            state.ErrMsgState = action.payload;
        },

        salvaIsError: (state, action: PayloadAction<boolean>) => {
            state.isErrorBoolean = action.payload;
        },

        salvaSuccessMsg: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },

        resetStatoPending: (state) => {
            state.isLoadingState = null;
        },
        resetStatoSuccess: (state) => {
            state.isSuccessState = null;
        },
        resetStatoError: (state) => {
            state.ErrMsgState = null;
        },
        resetIsErrorBoolean: (state) => {
            state.isErrorBoolean = null;
        },
        resetSuccessMsg: (state) => {
            state.message = "";
        },
        resetRandomDatiBook: (state) => {
            state.arrayDatiRandom = null;
            state.titoloRandom = null;
            state.prezzoRandom = null;
            state.autoreRandom = null;
            state.numPagineRandom = null;
            state.temaRandom = null;
            state.isCopertinaRigidaRandom = null;
        },
    },
});

export const {
    selectedBookEdit,
    ModalEditBookIsOpen,
    setBookId_EditImg,
    salvaRandomDatiBook,
    salvaStatoPending,
    salvaStatoError,
    salvaStatoSuccess,
    resetStatoPending,
    resetStatoError,
    salvaIsError,
    resetIsErrorBoolean,
    resetStatoSuccess,
    resetRandomDatiBook,
    resetSuccessMsg,
    salvaSuccessMsg,
} = BookSlice.actions;
export default BookSlice.reducer;
