import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface scrapingData {
    randomArrayData: null | (string | number | boolean)[];
    isSuccessStatus: boolean;
    isLoadingStatus: boolean;
    isErrorStatus: boolean;
    errorData: null | unknown;
    titolo: null | string;
    prezzo: null | number;
    autore: null | string;
    numPagine: null | number;
    tema: null | string;
    isCopertinaRigida: null | boolean;
}

const initialState: scrapingData = {
    randomArrayData: null,
    isSuccessStatus: false,
    isLoadingStatus: false,
    isErrorStatus: false,
    errorData: null,
    titolo: null,
    prezzo: null,
    autore: null,
    numPagine: null,
    tema: null,
    isCopertinaRigida: null,
};

// state relativi alla memorizzazione del token dell utente loggato al momento, e dati username, ruoli (decriptati)
const ScrapingData = createSlice({
    name: "ScrapingData",
    initialState,
    reducers: {
        salvaArrayData: (state, action: PayloadAction<(string | number | boolean)[]>) => {
            const dataArray = action.payload;
            console.log(dataArray);
            if (Array.isArray(dataArray)) {
                state.randomArrayData = dataArray;
                state.titolo = dataArray[0] as string;
                state.prezzo = dataArray[1] as number;
                state.autore = dataArray[2] as string;
                state.numPagine = dataArray[3] as number;
                state.tema = dataArray[4] as string;
                state.isCopertinaRigida = dataArray[5] as boolean;
            }
        },

        salvaIsSuccessStatus: (state, action: PayloadAction<boolean>) => {
            state.isSuccessStatus = action.payload;
        },
        salvaIsLoadingStatus: (state, action: PayloadAction<boolean>) => {
            state.isLoadingStatus = action.payload;
        },
        salvaIsErrorStatus: (state, action: PayloadAction<boolean>) => {
            state.isErrorStatus = action.payload;
        },
        salvaErrorData: (state, action) => {
            state.errorData = action.payload;
        },

        resetScrapingDataSlice: (state) => {
            state.randomArrayData = null;
            state.isSuccessStatus = false;
            state.isLoadingStatus = false;
            state.isErrorStatus = false;
            state.errorData = null;
        },
    },
});

export const {
    salvaArrayData,
    salvaErrorData,
    salvaIsErrorStatus,
    salvaIsLoadingStatus,
    salvaIsSuccessStatus,
    resetScrapingDataSlice,
} = ScrapingData.actions;
export default ScrapingData.reducer;
