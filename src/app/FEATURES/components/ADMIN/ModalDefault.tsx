import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../api/store";
import { Input } from "@material-tailwind/react";
// import { BaseQueryFn, QueryDefinition } from "@reduxjs/toolkit/query";
import React, { useCallback, useEffect, useState } from "react";
import { useEditBookImageMutation } from "../../../api/_APISLICES/bookApiSlice";
import EsitoFetchMsg from "../GENERAL/EsitoFetchMsg";
import { useSelector } from "react-redux";
import { RootState } from "../../../api/store";

interface IProps {
    state: boolean;
    title: string;
    text: string;
    setter: (state: boolean) => void;
    resetStateSetter: (state: string | null) => void;
    resetStateValue: string | null;
    FETCH: string;
    // RTKQUERY_FETCH: QueryDefinition<any, BaseQueryFn, any, any>;
}

export function ModalDefault({
    state,
    setter,
    resetStateSetter,
    resetStateValue,
    title,
    text,
    FETCH,
}: // RTKQUERY_FETCH,
IProps) {
    const [editImg, { isSuccess, isLoading, isError, error, data, reset }] = useEditBookImageMutation();
    const [image, setImage] = useState<File | null>(null);
    const { bookId_edit_img } = useSelector((store: RootState) => store.book);
    const handleOpen = (extraAction?: boolean) => {
        setter(!state);

        if (extraAction) {
            resetIdBook();
        }
    };

    const resetIdBook = useCallback(() => {
        resetStateSetter(resetStateValue);
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
            // id1 = setTimeout(() => {
            //     setter(false);
            // }, 2000);
        }

        if (isSuccess && data) {
            id1 = setTimeout(() => {
                setter(false);
            }, 2000);
            return;
        }

        return () => {
            setImage(null);
            clearTimeout(id);
            clearTimeout(id1);
        };
    }, [resetIdBook, state, isError, error, isSuccess, data, setter, reset]);

    const handleFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        } else {
            console.error("nessun immagine caricata");
        }
    };

    const sendImage = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("sono qui");
        const myFormData = new FormData();
        if (image && bookId_edit_img) {
            myFormData.append("imageFile", image);
            myFormData.append("bookId", bookId_edit_img);
            chooseFetch(FETCH, myFormData);
            // editImg({ file: myFormData });
        } else {
            console.log("sono qui");
            return;
        }
    };

    const chooseFetch = (fetchname: string, data: FormData) => {
        switch (fetchname) {
            case "editImgBook":
                editImg({ file: data });
                break;

            default:
                break;
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
                    sendImage(e);
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
                                type="file"
                                size="lg"
                                label="carica immagine"
                                crossOrigin={undefined}
                                onChange={handleFileImage}
                                // icon={<BsImageFill />}
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
