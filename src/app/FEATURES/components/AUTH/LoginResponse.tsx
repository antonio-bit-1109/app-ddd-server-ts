import { useDispatch, useSelector } from "react-redux";
import { Itoken } from "../../../../interfaces/interfaces";
import { AppDispatch, RootState } from "../../../api/store";
import { setToken } from "./tokenSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EsitoFetchMsg from "../GENERAL/EsitoFetchMsg";

interface IRtkQuery_response {
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    data: Itoken | undefined;
    error: unknown;
}

const LoginResponse = ({ isError, isLoading, isSuccess, data, error }: IRtkQuery_response) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((store: RootState) => store.token);

    useEffect(() => {
        if (token) {
            navigate("/Home");
            return;
        }

        if (isSuccess && data) {
            dispatch(setToken(data.accessToken));
        }
    }, [token, navigate, dispatch, isSuccess, data]);

    // if (isLoading) {
    //     return <p>attendere...</p>;
    // }

    // if (isSuccess && data) {
    //     return <p>login effettuato con successo!</p>;
    // }

    // if (isError && error) {
    //     return <p>errore! sistema i casi di errore</p>;
    // }

    // return null;
    //  return <div className="font-serif">LoginResponse</div>;

    return <EsitoFetchMsg isLoading={isLoading} isError={isError} isSuccess={isSuccess} error={error} />;
};

export default LoginResponse;
