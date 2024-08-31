import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserInterface {
    isModalForgotPswVisible: boolean;
    resendPswHasBeenSend: boolean;
}

const initialState: UserInterface = {
    isModalForgotPswVisible: false,
    resendPswHasBeenSend: false,
};

// state relativi alla memorizzazione del token dell utente loggato al momento, e dati username, ruoli (decriptati)
const UsersSlice = createSlice({
    name: "UsersSlice",
    initialState,
    reducers: {
        setIsModalForgotPswVisible: (state, action: PayloadAction<boolean>) => {
            state.isModalForgotPswVisible = action.payload;
        },

        isResendPswHasBeenSend: (state, action: PayloadAction<boolean>) => {
            state.resendPswHasBeenSend = action.payload;
        },
    },
});

export const { setIsModalForgotPswVisible, isResendPswHasBeenSend } = UsersSlice.actions;
export default UsersSlice.reducer;
