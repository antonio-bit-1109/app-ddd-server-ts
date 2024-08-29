import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
// import GetRandomInfoFromScraping from "./GetRandomInfoFromScraping";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../api/store";
import { useEffect, useState } from "react";
// import EsitoFetchMsg from "../GENERAL/EsitoFetchMsg";
import { IdataForm } from "../../../../interfaces/interfaces";
import { useCreateBookMutation } from "../../../api/_APISLICES/bookApiSlice";
import GetRandomInfoFromScraping from "./GetRandomInfoFromScraping";
import { RootState } from "../../../api/store";
import { useSelector } from "react-redux";
import EsitoFetchMsg from "../GENERAL/EsitoFetchMsg";

export function FormCreateNewBook() {
    const [createBook, { isLoading, isSuccess, isError, data, error }] = useCreateBookMutation();

    const {
        randomArrayData,
        isSuccessStatus,
        isLoadingStatus,
        isErrorStatus,
        errorData,
        titolo,
        prezzo,
        autore,
        numPagine,
        tema,
        isCopertinaRigida,
    } = useSelector((store: RootState) => store.scrapedData);

    const [dataForm, setdataForm] = useState<IdataForm>({
        titolo: null,
        autore: null,
        prezzo: null,
        numaPagine: null,
        tematica: null,
        isCopertinaRigida: null,
    });

    useEffect(() => {
        if (
            isSuccessStatus &&
            randomArrayData &&
            titolo &&
            prezzo &&
            autore &&
            numPagine &&
            tema &&
            typeof isCopertinaRigida === "boolean"
        ) {
            setdataForm({
                titolo: titolo,
                autore: autore,
                prezzo: prezzo,
                numaPagine: numPagine,
                tematica: tema,
                isCopertinaRigida: isCopertinaRigida,
            });
        }

        return () => {
            setdataForm({
                titolo: null,
                autore: null,
                prezzo: null,
                numaPagine: null,
                tematica: null,
                isCopertinaRigida: null,
            });
        };
    }, [autore, isCopertinaRigida, isSuccessStatus, numPagine, prezzo, randomArrayData, tema, titolo]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { titolo, autore, prezzo, numaPagine, tematica, isCopertinaRigida } = dataForm;
        if (
            titolo !== null &&
            autore !== null &&
            prezzo !== null &&
            numaPagine !== null &&
            tematica !== null &&
            isCopertinaRigida !== null
        ) {
            createBook({
                titolo, // Changed from nomeLibro to titolo
                prezzo, // Changed from prezzoLibro to prezzo
                autore, // Changed from autoreLibro to autore
                numaPagine, // Changed from pagine to numaPagine
                isCopertinaRigida,
                tematica,
            });
            console.log("book creato.");
        } else {
            console.log("campi del form non riempiti");
        }
    };

    return (
        <Card className="w-auto p-8 flex" color="white" shadow={true}>
            <div className="flex items-center justify-between">
                {" "}
                <Typography variant="h4" color="blue-gray">
                    Nuovo Libro
                </Typography>
                <GetRandomInfoFromScraping />
            </div>

            <Typography color="gray" className="mt-1 font-normal">
                inserisci nuovo libro
            </Typography>

            <EsitoFetchMsg
                isLoading={isLoadingStatus}
                isSuccess={isSuccessStatus}
                isError={isErrorStatus}
                error={errorData}
            />

            <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Titolo
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        crossOrigin={undefined}
                        value={dataForm.titolo ? dataForm.titolo : ""}
                        onChange={(e) => {
                            setdataForm({ ...dataForm, titolo: e.target.value });
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Prezzo
                    </Typography>
                    <Input
                        type="number"
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        crossOrigin={undefined}
                        value={dataForm.prezzo ? dataForm.prezzo : ""}
                        onChange={(e) => {
                            setdataForm({ ...dataForm, prezzo: parseInt(e.target.value) });
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Autore
                    </Typography>
                    <Input
                        type="string"
                        size="lg"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        crossOrigin={undefined}
                        value={dataForm.autore ? dataForm.autore : ""}
                        onChange={(e) => {
                            setdataForm({ ...dataForm, autore: e.target.value });
                        }}
                    />{" "}
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        numero pagine
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
                        value={dataForm.numaPagine ? dataForm.numaPagine : ""}
                        onChange={(e) => {
                            setdataForm({ ...dataForm, numaPagine: parseInt(e.target.value) });
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Tematica libro
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                        placeholder="N° pagine libro"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        crossOrigin={undefined}
                        value={dataForm.tematica ? dataForm.tematica : ""}
                        onChange={(e) => {
                            setdataForm({ ...dataForm, tematica: e.target.value });
                        }}
                    />
                    <Checkbox
                        label={
                            <Typography variant="small" color="gray" className="flex items-center font-normal">
                                La copertina è rigida?
                                {/* <a href="#" className="font-medium transition-colors hover:text-gray-900">
                                    &nbsp;Terms and Conditions
                                </a> */}
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                        crossOrigin={undefined}
                        checked={dataForm.isCopertinaRigida ? dataForm.isCopertinaRigida : false}
                        onChange={(e) => {
                            setdataForm({ ...dataForm, isCopertinaRigida: e.target.checked });
                        }}
                    />
                </div>

                <Button className="mt-6" fullWidth type="submit">
                    CREA
                </Button>
                <EsitoFetchMsg
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    isError={isError}
                    error={error}
                    data={data}
                />
            </form>
        </Card>
    );
}
