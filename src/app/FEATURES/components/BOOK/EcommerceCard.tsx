import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { IBook /* IBook_noImg */ } from "../../../../interfaces/interfaces";
import { localHostPath } from "../../../../helpers/localHost";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../api/store";
import { ModalEditBookIsOpen, selectedBookEdit, setBookId_EditImg } from "./bookSlice";
import { RiImageAddFill } from "react-icons/ri";
interface EcommerceCardProps {
    book: IBook;
    admin?: string;
}

export function EcommerceCard({ book, admin }: EcommerceCardProps) {
    const dispatch: AppDispatch = useDispatch();
    const isCopertinaRigida = (bool: boolean) => {
        switch (bool) {
            case true:
                return "SI";
            case false:
                return "NO";

            default:
                return "No Info";
        }
    };

    const handleEdit = (item: IBook) => {
        dispatch(selectedBookEdit(item));
    };
    const handleAddToCart = (item: IBook) => {
        console.log("aggiungi logica di aggiunta al carrello", +item);
    };

    const capitalLetters = (title: string) => {
        const divide = title.split(" ");
        console.log(divide);
        const capitalizedWords = divide.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return capitalizedWords.join(" ");
    };

    return (
        <Card className={`${admin && "my-3"} w-96`}>
            <CardHeader shadow={false} floated={false} className="h-52 relative">
                <Typography color="blue-gray" className=" font-bold py-4 text-lg flex justify-center">
                    {capitalLetters(book.NomeLibro)}
                </Typography>
                {admin && (
                    <div
                        onClick={() => {
                            dispatch(ModalEditBookIsOpen(true));
                            dispatch(setBookId_EditImg(book._id));
                        }}
                        className="absolute top-5 right-5 cursor-pointer border-solid border-2 p-1 rounded-md bg-blue-gray-100"
                    >
                        <RiImageAddFill size={40} className="  fill-blue-gray-300 hover:fill-blue-gray-400" />
                    </div>
                )}
                <img
                    src={`${localHostPath}/imgs/${book.ImgCopertina}`}
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                        ${book.PrezzoLibro}
                    </Typography>
                </div>
                <Typography variant="small" color="gray" className="font-normal opacity-75">
                    Autore: {book.Autore}
                </Typography>{" "}
                <Typography variant="small" color="gray" className="font-normal opacity-75">
                    Tema: {book.TematicaLibro}
                </Typography>{" "}
                <Typography variant="small" color="gray" className="font-normal opacity-75">
                    Copertina Rigida: {isCopertinaRigida(book.CopertinaRigida)}
                </Typography>{" "}
                <Typography variant="small" color="gray" className="font-medium opacity-75">
                    Pagine: {book.PagineLibro}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    onClick={
                        admin === "ADMIN"
                            ? () => {
                                  handleEdit(book);
                              }
                            : () => {
                                  handleAddToCart(book);
                              }
                    }
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                    {admin === "ADMIN" ? "Modifica Prodotto" : " Add to Cart"}
                </Button>
            </CardFooter>
        </Card>
    );
}
