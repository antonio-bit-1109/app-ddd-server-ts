import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../api/store";
// import { IBook_noImg } from "../../../../interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { selectedBookEdit } from "../BOOK/bookSlice";
import { AreAllDefaultValues } from "../../../../helpers/helperFunctions";
import { useEditBookMutation } from "../../../api/_APISLICES/bookApiSlice";
import { IBook_noImg } from "../../../../interfaces/interfaces";
import EsitoFetchMsg from "../GENERAL/EsitoFetchMsg";

export function FormEditBook() {
    const dispatch: AppDispatch = useDispatch();
    const { selectedBookForEdit } = useSelector((store: RootState) => store.book);

    const [sendEdit, { isError, isSuccess, isLoading, data, error }] = useEditBookMutation();

    //data da inviare con modifiche
    const [bookData, setBookData] = useState<IBook_noImg>({
        id: "",
        titolo: "",
        prezzo: 0,
        autore: "",
        numPagine: 0,
        copertinaRigida: null,
        tema: "",
    });

    useEffect(() => {
        if (selectedBookForEdit) {
            setBookData({ ...bookData, id: selectedBookForEdit._id });
            return;
        }
        return () => {
            dispatch(selectedBookEdit(null));
        };
    }, [dispatch, selectedBookForEdit, bookData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(bookData);
        const isAllDefault = AreAllDefaultValues(bookData);
        if (!isAllDefault) {
            sendEdit({
                id: bookData.id,
                titolo: bookData.titolo,
                prezzo: bookData.prezzo,
                autore: bookData.autore,
                numPagine: bookData.numPagine,
                copertinaRigida: bookData.copertinaRigida,
                tema: bookData.tema,
            });
            return;
        }

        console.log("nessun valore è stato modificato. Modifica prima qualche campo.");
        return;
        // se tutti i valori defautl allora nono invia la edit
    };

    return (
        <>
            <Card className="w-2/4 p-8" color="transparent" shadow={true}>
                <Typography variant="h4" color="blue-gray">
                    Modifica libro
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Clicca su un libro per modificarne i dati.
                </Typography>{" "}
                <Typography color="gray" className="mt-1 font-normal">
                    <EsitoFetchMsg
                        isError={isError}
                        data={data}
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                        error={error}
                    />
                </Typography>
                <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Modifica Titolo
                        </Typography>
                        <Input
                            type="text"
                            size="lg"
                            placeholder="nuovo nome libro"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            crossOrigin={undefined}
                            value={selectedBookForEdit?.NomeLibro}
                            onChange={(e) => {
                                setBookData({ ...bookData, titolo: e.target.value });
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Modifica Prezzo
                        </Typography>
                        <Input
                            type="number"
                            size="lg"
                            placeholder="nuovo prezzo libro"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            crossOrigin={undefined}
                            value={selectedBookForEdit?.PrezzoLibro}
                            onChange={(e) => {
                                setBookData({
                                    ...bookData,
                                    prezzo: Number(e.target.value),
                                });
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Modifica Autore
                        </Typography>
                        <Input
                            type="text"
                            size="lg"
                            placeholder="nuovo autore libro"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            crossOrigin={undefined}
                            value={selectedBookForEdit?.Autore}
                            onChange={(e) => {
                                setBookData({ ...bookData, autore: e.target.value });
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Modifica Tema del Libro
                        </Typography>
                        <Input
                            type="text"
                            size="lg"
                            placeholder="nuovo tema libro"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            crossOrigin={undefined}
                            value={selectedBookForEdit?.TematicaLibro}
                            onChange={(e) => {
                                setBookData({ ...bookData, tema: e.target.value });
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Modifica numero pagine
                        </Typography>
                        <Input
                            type="number"
                            size="lg"
                            placeholder="N° pagine libro"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            crossOrigin={undefined}
                            value={selectedBookForEdit?.PagineLibro}
                            onChange={(e) => {
                                setBookData({ ...bookData, numPagine: Number(e.target.value) });
                            }}
                        />
                        <Checkbox
                            label={
                                <Typography variant="small" color="gray" className="flex items-center font-normal">
                                    Copertina Rigida
                                    {/* <a href="#" className="font-medium transition-colors hover:text-gray-900">
                                &nbsp;Terms and Conditions
                            </a> */}
                                </Typography>
                            }
                            containerProps={{ className: "-ml-2.5" }}
                            crossOrigin={undefined}
                            checked={selectedBookForEdit?.CopertinaRigida}
                            onChange={(e) => {
                                setBookData({ ...bookData, copertinaRigida: e.target.checked });
                            }}
                        />
                    </div>
                    <Button type="submit" className="mt-6" fullWidth>
                        MODIFICA
                    </Button>
                </form>
            </Card>
        </>
    );
}
