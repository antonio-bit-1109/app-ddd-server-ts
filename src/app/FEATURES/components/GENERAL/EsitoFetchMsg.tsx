import { useEffect, useState } from "react";
import { handleErrorCases } from "../../../../helpers/narrowingErrorRTKQuery";

interface Iprops {
    isLoading: boolean | null;
    isSuccess: boolean | null;
    isError: boolean | null;
    data?: { message: string };
    error: unknown | string;
}

const EsitoFetchMsg = ({ isLoading, isSuccess, isError, data, error }: Iprops) => {
    console.log(data);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        let id: number;
        if ((isSuccess && data) || isSuccess || (isError && error)) {
            setIsVisible(true);
            id = setTimeout(() => {
                setIsVisible(false);
            }, 2500);
        }

        return () => {
            clearInterval(id);
        };
    }, [data, isSuccess, isError, error]);

    if (isLoading) {
        return (
            <div className=" shadow-orange-200 border-spacing-3 font-semibold text-center my-3 border-solid border-2 border-gray-700 py-4 text-gray-500 bg-gray-200 rounded-md">
                <p>Attendere...</p>
            </div>
        );
    }

    if (isError && error && isVisible) {
        const msgErr = handleErrorCases(error);
        return (
            <div className=" flex flex-wrap shadow-orange-200 border-spacing-3 font-semibold text-center my-3 border-solid border-2 border-red-700 py-4 text-red-500 bg-red-200 rounded-md">
                <p>{msgErr}</p>
            </div>
        );
    }

    if (isSuccess && isVisible && !data) {
        const dataDefault = { message: "dati randomici caricati con successo." };

        return (
            <div className=" shadow-orange-200 border-spacing-3 font-semibold text-center my-3 border-solid border-2 border-green-700 py-4 text-green-500 bg-green-200  rounded-md">
                <p>{dataDefault.message}</p>
            </div>
        );
    }

    if (isSuccess && data && isVisible) {
        return (
            <div className=" shadow-orange-200 border-spacing-3 font-semibold text-center my-3 border-solid border-2 border-green-700 py-4 text-green-500 bg-green-200  rounded-md">
                <p>{data.message}</p>
            </div>
        );
    }
};

export default EsitoFetchMsg;
