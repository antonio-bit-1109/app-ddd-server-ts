import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../api/store";
import { Input } from "@material-tailwind/react";
// import { BaseQueryFn, QueryDefinition } from "@reduxjs/toolkit/query";
import React, { useCallback, useEffect, useState } from "react";
import { useEditBookImageMutation } from "../../../api/_APISLICES/bookApiSlice";
import EsitoFetchMsg from "../GENERAL/EsitoFetchMsg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../api/store";
import { useResetPasswordMutation } from "../../../api/_APISLICES/userApiSlice";
import { isResendPswHasBeenSend } from "../USER/usersSlice";

interface IProps {
    state: boolean;
    title: string;
    text: string;
    setter: (state: boolean) => void;
    resetStateSetter?: (state: string | null) => void;
    resetStateValue?: string | null;
    FETCH: "editImgBook" | "resetPasswordUser";
    INPUT: string;
    labelString: string;
}

export function ModalDefault({
    state,
    setter,
    resetStateSetter,
    resetStateValue,
    title,
    text,
    FETCH,
    INPUT,
    labelString,
}: // RTKQUERY_FETCH,
IProps) {
    const dispatch: AppDispatch = useDispatch();
    //chiama sempre tutti i metodi di RTKquery che fanno la fetch
    const [editImgBook_Method, editImageResponse] = useEditBookImageMutation();
    const [sendEmailToResetPsw_Method, SendEmailResponse] = useResetPasswordMutation();

    // Crea una mappa di funzioni con il nomi delle proprietà uguali ai possibili valori di FETCH
    const fetchMethods = {
        editImgBook: editImgBook_Method,
        resetPasswordUser: sendEmailToResetPsw_Method,
        // Aggiungi altri metodi qui in futuro
    };

    const fetchStates = {
        editImgBook: editImageResponse,
        resetPasswordUser: SendEmailResponse,
        // Aggiungi altri stati qui in futuro
    };

    const fetchMethod = fetchMethods[FETCH];
    const FetchResponse = fetchStates[FETCH];

    const { isSuccess, isLoading, isError, error, data, reset } = FetchResponse;

    const [dataToSend, setDataToSend] = useState<File | null | string>(null);
    const { bookId_edit_img } = useSelector((store: RootState) => store.book);
    const handleOpen = (extraAction?: boolean) => {
        setter(!state);

        if (extraAction) {
            resetIdBook();
        }
    };

    const resetIdBook = useCallback(() => {
        if (resetStateSetter && resetStateValue) {
            resetStateSetter(resetStateValue);
            return;
        }
        return null;
    }, [resetStateSetter, resetStateValue]);

    useEffect(() => {
        let id: number;
        let id1: number;
        if (!state) {
            resetIdBook();
            return;
        }

        if ((isSuccess && data) || (isError && error)) {
            setter(true);
            id = setTimeout(() => {
                reset();
            }, 2500);
        }

        if (isSuccess && data) {
            id1 = setTimeout(() => {
                setter(false);
            }, 2000);

            if (FETCH === "resetPasswordUser") {
                dispatch(isResendPswHasBeenSend(true));
            }
            return;
        }

        return () => {
            setDataToSend(null);
            clearTimeout(id);
            clearTimeout(id1);
        };
    }, [resetIdBook, state, isError, error, isSuccess, data, setter, reset, dispatch, FETCH]);

    const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (FETCH === "editImgBook") {
            if (e.target.files && e.target.files[0]) {
                setDataToSend(e.target.files[0]);
            } else {
                console.error("nessun immagine caricata");
            }
            return;
        }

        if (FETCH === "resetPasswordUser") {
            e.preventDefault();
            setDataToSend(e.target.value);
        } else {
            console.error("nessun email caricata");
        }
        return;
    };

    const sendDataToServer = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("sono qui");
        if ((dataToSend as File) && bookId_edit_img && fetchMethod === editImgBook_Method) {
            const myFormData = new FormData();
            console.log("sto inviando l'immagine");
            myFormData.append("imageFile", dataToSend as File);
            myFormData.append("bookId", bookId_edit_img);
            fetchMethod({ file: myFormData });
            return;
        }
        if (dataToSend && typeof dataToSend === "string" && fetchMethod === sendEmailToResetPsw_Method) {
            console.log("sto inviando l'email");
            fetchMethod({ email: dataToSend });
            return;
        } else {
            console.log("non sono ne nel caso in cui invio una mail ne nel caso dove invio il file immagine.");
            return;
        }
    };

    return (
        <Dialog
            open={state}
            handler={() => {
                handleOpen(false);
            }}
        >
            <form
                action="POST"
                onSubmit={(e) => {
                    sendDataToServer(e);
                }}
            >
                <DialogHeader>{title}</DialogHeader>
                <DialogBody>{text}</DialogBody>
                <DialogBody>
                    {(isSuccess && data) || (isError && error) ? (
                        <EsitoFetchMsg
                            isLoading={isLoading}
                            isError={isError}
                            isSuccess={isSuccess}
                            data={data}
                            error={error}
                        />
                    ) : (
                        <div className="flex w-72 flex-col items-end gap-6">
                            <Input
                                type={INPUT}
                                size="lg"
                                label={labelString}
                                crossOrigin={undefined}
                                onChange={handleData}
                            />
                        </div>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => {
                            handleOpen(true);
                        }}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button type="submit" variant="gradient" color="green">
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
}
