import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { useLazyGetInfoFromScrapingQuery } from "../../../api/_APISLICES/bookApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../api/store";
import {
    resetIsErrorBoolean,
    resetRandomDatiBook,
    resetStatoError,
    resetStatoPending,
    resetStatoSuccess,
    resetSuccessMsg,
    salvaIsError,
    salvaRandomDatiBook,
    salvaStatoError,
    salvaStatoPending,
    salvaStatoSuccess,
    salvaSuccessMsg,
} from "../BOOK/bookSlice";
import { handleErrorCases } from "../../../../helpers/narrowingErrorRTKQuery";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../api/store";
// import {
//     resetRandomDatiBook,
//     resetStatoError,
//     resetStatoPending,
//     salvaRandomDatiBook,
//     salvaStatoError,
//     salvaStatoPending,
// } from "../BOOK/bookSlice";
// import { handleErrorCases } from "../../../../helpers/narrowingErrorRTKQuery";

const GetRandomInfoFromScraping = () => {
    const dispatch: AppDispatch = useDispatch();
    const [trigger, { isLoading, isError, isSuccess, data, error }] = useLazyGetInfoFromScrapingQuery();

    useEffect(() => {
        if (isSuccess || isError || isLoading) {
            dispatch(resetStatoPending());
            dispatch(resetStatoError());
            dispatch(resetStatoSuccess());
        }

        if (isLoading) {
            dispatch(salvaStatoPending(isLoading));
            return;
        }
        if (isError && error) {
            dispatch(resetStatoPending());
            const errMsg = handleErrorCases(error);
            dispatch(salvaStatoError(errMsg || "errore durante il recupero di dati randomici."));
            dispatch(salvaIsError(isError));
            return;
        }
        if (isSuccess && data) {
            dispatch(resetStatoPending());
            dispatch(salvaRandomDatiBook(data.array));
            dispatch(salvaStatoSuccess(isSuccess));
            dispatch(salvaSuccessMsg("dati randomici estratti con successo."));
            return;
        }

        return () => {
            dispatch(resetStatoPending());
            dispatch(resetStatoError());
            dispatch(resetRandomDatiBook());
            dispatch(resetStatoSuccess());
            dispatch(resetIsErrorBoolean());
            dispatch(resetSuccessMsg());
        };
    }, [data, dispatch, error, isError, isLoading, isSuccess]);

    const getRandomInfo = () => {
        trigger();
    };

    return (
        <div
            onClick={getRandomInfo}
            className="border border-solid border-black rounded-full p-1 cursor-pointer bg-blue-gray-500 hover:bg-blue-gray-200 hover:border-gray-600"
        >
            <GiPerspectiveDiceSixFacesRandom size={50} />
        </div>
    );
};

export default GetRandomInfoFromScraping;
