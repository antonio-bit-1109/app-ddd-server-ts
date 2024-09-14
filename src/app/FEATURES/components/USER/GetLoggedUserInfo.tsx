import { Button } from "@material-tailwind/react";
import { dummyFetch } from "../../../../helpers/URL_BUILDER/fetchDiprova";

const GetLoggedUserInfo = () => {
    return (
        <div className="w-full h-[calc(100vh-64px)] flex justify-center items-center">
            <Button
                className="text-6xl"
                onClick={() => {
                    dummyFetch();
                }}
            >
                fai fetch
            </Button>
        </div>
    );
};

export default GetLoggedUserInfo;
