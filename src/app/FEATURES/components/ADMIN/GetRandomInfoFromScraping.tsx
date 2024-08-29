import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { useLazyGetInfoFromScrapingQuery } from "../../../api/_APISLICES/bookApiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../api/store";
import { useEffect } from "react";
import {
    resetScrapingDataSlice,
    salvaArrayData,
    salvaErrorData,
    salvaIsErrorStatus,
    salvaIsLoadingStatus,
    salvaIsSuccessStatus,
} from "../SCRAPING_DATA/scrapingDataSlice";

// import { useLazyGetInfoFromScrapingQuery } from "../../../api/_APISLICES/bookApiSlice";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../api/store";
// import {
//     resetIsErrorBoolean,
//     resetRandomDatiBook,
//     resetStatoError,
//     resetStatoPending,
//     resetStatoSuccess,
//     resetSuccessMsg,
//     salvaIsError,
//     salvaRandomDatiBook,
//     salvaStatoError,
//     salvaStatoPending,
//     salvaStatoSuccess,
//     salvaSuccessMsg,
// } from "../BOOK/bookSlice";
// import { handleErrorCases } from "../../../../helpers/narrowingErrorRTKQuery";
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
        dispatch(salvaIsLoadingStatus(isLoading));
        dispatch(salvaIsErrorStatus(isError));
        dispatch(salvaIsSuccessStatus(isSuccess));
        if (data) {
            dispatch(salvaArrayData(data.array));
        }
        if (error) {
            dispatch(salvaErrorData(error));
        }
    }, [isLoading, isSuccess, isError, data, error, dispatch]);

    const getRandomInfo = () => {
        dispatch(resetScrapingDataSlice());
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
