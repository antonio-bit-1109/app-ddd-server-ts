import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import jwt from
import { IdecriptToken } from "../../../../interfaces/interfaces";
import { jwtDecode } from "jwt-decode";
export interface TokenInterface {
    token: null | string;
    username: null | string;
    roles: null | string[];
    isAccountActive: null | boolean;
}

const initialState: TokenInterface = {
    token: null,
    username: null,
    roles: null,
    isAccountActive: null,
};

// state relativi alla memorizzazione del token dell utente loggato al momento, e dati username, ruoli (decriptati)
const TokenSlice = createSlice({
    name: "TokenSlice",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<{ token: string }>) => {
            const myToken = action.payload.token;
            console.log(myToken);
            state.token = myToken;

            if (myToken) {
                const decriptToken: IdecriptToken = jwtDecode(myToken);
                console.log(decriptToken);
                state.username = decriptToken.UserInfo.nomeUser;
                state.roles = decriptToken.UserInfo.roles;
                state.isAccountActive = decriptToken.UserInfo.isActive;
            }
        },

        clearToken: (state) => {
            state.token = null;
        },
    },
});

export const { setToken, clearToken } = TokenSlice.actions;
export default TokenSlice.reducer;
