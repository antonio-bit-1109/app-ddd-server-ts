import { Card, Input, Typography, Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSendNewPasswordMutation } from "../../../api/_APISLICES/userApiSlice";
import EsitoFetchMsg from "../GENERAL/EsitoFetchMsg";
// import { useForm } from "react-hook-form";

interface IDataToSend {
    password: string;
    idUser: string;
    checkPsw: string;
    iv: string;
}

export function ResetUserPsw_page() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idUser_Param = queryParams.get("idUser");
    const ivDecript = queryParams.get("iv");

    const [sendPsw, { isLoading, isError, isSuccess, data, error }] = useSendNewPasswordMutation();
    // const [isPswLongEnough, setIsPswLongEnough] = useState<boolean>(true);
    const [dataToSend, setDataToSend] = useState<IDataToSend>({
        password: "",
        idUser: "",
        checkPsw: "",
        iv: "",
    });

    // const [checkPsw, setCheckPsw] = useState<string>("");

    const [isErrorNotification, setIsErrorNotification] = useState<boolean>(false);

    useEffect(() => {
        let id: number;
        if (isErrorNotification) {
            setTimeout(() => {
                setIsErrorNotification(false);
            }, 2000);
        }

        if (idUser_Param && idUser_Param !== "" && ivDecript && ivDecript !== "") {
            setDataToSend((prevState) => ({
                ...prevState,
                idUser: idUser_Param,
                iv: ivDecript,
            }));
        }

        if (isSuccess) {
            setDataToSend({
                password: "",
                idUser: "",
                checkPsw: "",
                iv: "",
            });
            id = setTimeout(() => {
                navigate("/");
            }, 3000);
        }

        return () => {
            clearTimeout(id);
            setIsErrorNotification(false);
        };
    }, [isErrorNotification, idUser_Param, ivDecript, isSuccess, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const esitoCheck = confermPswInserted(dataToSend.checkPsw, dataToSend.password);

        if (esitoCheck) {
            sendPsw(dataToSend);
            return;
        }

        setIsErrorNotification(true);
    };

    const confermPswInserted = (pswClone: string, psw: string) => {
        if (psw === pswClone) {
            return true;
        }

        return false;
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Card className="h-60" color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Reset Password
                </Typography>
                <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-4">
                            Inserisci Nuova Password
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="inserisci la tua nuova password"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            type="password"
                            crossOrigin={undefined}
                            onChange={(e) => {
                                setDataToSend((prevState) => ({
                                    ...prevState,
                                    password: e.target.value,
                                }));
                            }}
                            value={dataToSend.password}
                        />

                        <Typography variant="h6" color="blue-gray" className="-mb-4">
                            Conferma Nuova Password
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="inserisci la tua nuova password"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            type="password"
                            crossOrigin={undefined}
                            onChange={(e) => {
                                setDataToSend((prevSTate) => ({
                                    ...prevSTate,
                                    checkPsw: e.target.value,
                                }));
                            }}
                            value={dataToSend.checkPsw}
                        />
                        <EsitoFetchMsg
                            isLoading={isLoading}
                            isSuccess={isSuccess}
                            isError={isError}
                            error={error}
                            data={data}
                        />
                    </div>
                    <div className=" mt-5">
                        <Button type="submit">Invia nuova Password </Button>
                    </div>
                    {isErrorNotification && (
                        <div className=" bg-red-500 p-4 rounded-lg text-red-900 mt-4">
                            Le due password non corrispondono.
                        </div>
                    )}
                </form>
            </Card>
        </div>
    );
}
