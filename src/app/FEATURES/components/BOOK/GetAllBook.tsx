import { useEffect } from "react";
import { useLazyGetAllBookQuery } from "../../../api/_APISLICES/bookApiSlice";
import { EcommerceCard } from "./EcommerceCard";
import { handleErrorCases } from "../../../../helpers/narrowingErrorRTKQuery";

interface IProps {
    admin?: string;
}

const GetAllBook = ({ admin }: IProps) => {
    const [trigger, { isLoading, isError, isSuccess, data, error }] = useLazyGetAllBookQuery();

    useEffect(() => {
        trigger();
    }, [trigger]);

    // return <div>GetAllBook</div>;
    if (isLoading) {
        return <div>caricamento...</div>;
    }

    if (isError && error) {
        const errMsg = handleErrorCases(error);
        return <div>{errMsg}</div>;
    }

    if (isSuccess && data) {
        return (
            <div className={` ${admin ? "block mx-6" : "flex flex-wrap"} justify-center gap-5 mt-3 `}>
                {data.Books.map((book) => (
                    <div key={book._id}>
                        {" "}
                        <EcommerceCard book={book} admin={admin} />
                    </div>
                ))}
            </div>
        );
    }
};

export default GetAllBook;
