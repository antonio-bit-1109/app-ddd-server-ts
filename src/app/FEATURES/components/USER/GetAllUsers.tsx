import { useEffect } from "react";
import { useLazyGetAllUsersQuery } from "../../../api/_APISLICES/userApiSlice";
import { CardSimple } from "../GENERAL/CardSimple";
// import { IUser } from "../../../../interfaces/interfaces";

const GetAllUsers = () => {
    const [trigger, { isLoading, isSuccess, isError, error, data }] = useLazyGetAllUsersQuery();
    // return <></>;

    useEffect(() => {
        trigger();
    }, [trigger]);

    if (isError && error) {
        return " errore durante la get di tutti gli utenti.";
    }

    if (isLoading) {
        return "caricamento...";
    }

    if (isSuccess && data && data.length > 0) {
        if (data.length > 0) {
            return (
                <>
                    {data.map((user, index) => (
                        <CardSimple key={index} data={user} />
                    ))}
                </>
            );
        }
        return <div>Non ci sono utenti da visualizzare.</div>;
    }
};

export default GetAllUsers;
