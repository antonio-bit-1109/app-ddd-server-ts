import { IBook_noImg } from "../interfaces/interfaces";

export const AreAllDefaultValues = (obj: IBook_noImg): boolean => {
    if (
        //   obj._id === "" &&
        obj.autore === "" &&
        obj.copertinaRigida === null &&
        obj.titolo === "" &&
        obj.numPagine === 0 &&
        obj.tema === "" &&
        obj.prezzo === 0
    ) {
        return true;
    }

    return false;
};
