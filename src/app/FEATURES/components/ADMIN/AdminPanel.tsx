// import GetAllUsers from "../USER/GetAllUsers";
import { useDispatch, useSelector } from "react-redux";
import NavBarComp from "../GENERAL/NavBarComp";
import { FormEditBook } from "./FormEditBook";
import { FormEditUser } from "./FormEditUser";
import { ModalDefault } from "./ModalDefault";
import { SideBar } from "./SideBar";
import { Outlet, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../../../api/store";
import { ModalEditBookIsOpen, setBookId_EditImg } from "../BOOK/bookSlice";
// import SendEditImgFetch_RTKQUERY from "./SendEditImgFetch_RTKQUERY";
// import SendEditImgFetch_RTKQUERY from "./SendEditImgFetch_RTKQUERY";
// import SendEditImgFetch_RTKQUERY from "./SendEditImgFetch_RTKQUERY";

const AdminPanel = () => {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const { isModalEditBookOpen } = useSelector((store: RootState) => store.book);

    const handleModalToggle = (isOpen: boolean) => {
        dispatch(ModalEditBookIsOpen(isOpen));
    };

    const resetIdBook = (value: null | string) => {
        dispatch(setBookId_EditImg(value));
    };

    // const sendEditImageFetch = () => {
    //     const [sendImg, { isLoading, isSuccess, isError, data, error }] = useEditBookImageMutation();
    // };

    return (
        <>
            <NavBarComp />
            <section className="flex">
                <SideBar />

                {/* il render viene modificato a pagina "intera" se la location rispecchia un certo path */}
                <div
                    className={` bg-blue-gray-300 ${
                        location.pathname === "/Admin/Books/CreateBook" ||
                        location.pathname === "/Admin/Users/CreateUser"
                            ? "w-full"
                            : "w-2/7"
                    } h-[calc(100vh-64px)] overflow-y-scroll`}
                >
                    <Outlet />
                </div>
                {location.pathname === "/Admin/Users" && (
                    <div className="flex-grow h-[calc(100vh-64px)] flex justify-center items-center ">
                        <FormEditUser />
                    </div>
                )}
                {location.pathname === "/Admin/Books" && (
                    <div className="flex-grow h-[calc(100vh-64px)] flex justify-center items-center ">
                        <FormEditBook />
                    </div>
                )}
            </section>
            <ModalDefault
                state={isModalEditBookOpen}
                setter={handleModalToggle}
                resetStateSetter={resetIdBook}
                resetStateValue={null}
                title="Nuova Immagine Libro"
                text="carica la nuova immagine per il libro"
                FETCH="editImgBook"
                INPUT="file"
                labelString="carica nuova immagine"
            />
        </>
    );
};

export default AdminPanel;
