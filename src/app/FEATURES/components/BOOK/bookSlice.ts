import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { /* IBook,  */ IBook /* IBook_noImg */ } from "../../../../interfaces/interfaces";

export interface BookInterface {
    selectedBookForEdit: null | IBook;
    isModalEditBookOpen: boolean;
    bookId_edit_img: string | null;
    // arrayDatiRandom: null | (string | number | boolean)[];

    // titoloRandom: null | string;
    // prezzoRandom: null | number;
    // autoreRandom: null | string;
    // numPagineRandom: null | number;
    // temaRandom: null | string;
    // isCopertinaRigidaRandom: null | boolean;
}

const initialState: BookInterface = {
    selectedBookForEdit: null,
    isModalEditBookOpen: false,
    bookId_edit_img: null,

    // arrayDatiRandom: null,
    // titoloRandom: null,
    // prezzoRandom: null,
    // autoreRandom: null,
    // numPagineRandom: null,
    // temaRandom: null,
    // isCopertinaRigidaRandom: null,
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

        // salvaRandomDatiBook: (state, action: PayloadAction<(string | number | boolean)[]>) => {
        //     if (Array.isArray(action.payload)) {
        //         const arrayData = action.payload;
        //         state.arrayDatiRandom = arrayData;

        //         state.titoloRandom = arrayData[0] as string;
        //         state.prezzoRandom = arrayData[1] as number;
        //         state.autoreRandom = arrayData[2] as string;
        //         state.numPagineRandom = arrayData[3] as number;
        //         state.temaRandom = arrayData[4] as string;
        //         state.isCopertinaRigidaRandom = arrayData[5] as boolean;
        //         return;
        //     }

        //     throw new Error(
        //         "l' array di dati proveniente dallo scraping non contiene i dati attesi.  (string , number , boolean)"
        //     );
        // },

        // resetRandomDatiBook: (state) => {
        //     state.arrayDatiRandom = null;
        //     state.titoloRandom = null;
        //     state.prezzoRandom = null;
        //     state.autoreRandom = null;
        //     state.numPagineRandom = null;
        //     state.temaRandom = null;
        //     state.isCopertinaRigidaRandom = null;
        // },
    },
});

export const { selectedBookEdit, ModalEditBookIsOpen, setBookId_EditImg /* salvaRandomDatiBook */ } = BookSlice.actions;
export default BookSlice.reducer;
