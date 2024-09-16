export interface Itoken {
    accessToken: { token: string };
}

export interface IRefreshResponse {
    token: string;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IBook {
    _id: string;
    NomeLibro: string;
    PrezzoLibro: number;
    Autore: string;
    PagineLibro: number;
    CopertinaRigida: boolean;
    TematicaLibro: string;
    ImgCopertina?: string;
}

export interface IBook_noImg {
    id: string;
    titolo: string;
    prezzo: number;
    autore: string;
    numPagine: number;
    copertinaRigida: boolean | null;
    tema: string;
    // ImgCopertina: string;
}

export interface IdecriptToken {
    UserInfo: {
        userId: string;
        nomeUser: string;
        isActive: boolean;
        roles: string[];
    };
    iat: number;
    exp: number;
}

export interface IUser {
    _id: string;
    Nome: string;
    Cognome: string;
    Email: string;
    Password: string;
    IsActive: boolean;
    Ruoli: string[];
}

export interface IRandomDataArray {
    array: (string | number | boolean)[];
}

export interface IdataForm {
    titolo: null | string;
    autore: null | string;
    prezzo: null | number;
    numaPagine: null | number;
    tematica: null | string;
    isCopertinaRigida: null | boolean;
}

// export interface IdataForm_extra {
//     nomeLibro: string;
//     prezzoLibro: string;
//     autoreLibro: number;
//     pagine: number;
//     tematica: string;
//     isCopertinaRigida: boolean;
// }

export interface IdataCreateUser {
    email: string;
    nomeUtente: string;
    cognome: string;
    password: string;
}

export interface IdataResetPassword {
    password: string;
    idUser: string;
}
