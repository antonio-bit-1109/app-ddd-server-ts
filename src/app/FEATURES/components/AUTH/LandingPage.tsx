import { FaBookAtlas } from "react-icons/fa6";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            {" "}
            <div className="flex flex-col ">
                <FaBookAtlas color="#6366F1" className="mx-auto h-20 w-auto" />

                <h3 className="mt-8 text-center text-2xl font-extrabold leading-3 tracking-wide"> 📕Libri Belli📕</h3>
                <div className="flex justify-center mt-10 gap-32">
                    <div
                        onClick={() => {
                            navigate("/");
                        }}
                        className="cursor-pointer w-40 text-center"
                    >
                        <h2
                            className={` ${
                                location.pathname === "/" ? "font-bold text-3xl text-red-300" : "font-medium text-2xl"
                            }  `}
                            // className={
                            //     location.pathname === "/"
                            //         ? "text-3xl"
                            //         : `text-2xl font-bold leading-9 tracking-tight text-gray-900`
                            // }
                        >
                            Accedi alla pagina
                        </h2>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/Register");
                        }}
                        className="cursor-pointer flex justify-center items-center"
                    >
                        <h2
                            className={` ${
                                location.pathname === "/Register"
                                    ? "font-bold text-3xl text-blue-300"
                                    : "font-medium text-2xl"
                            }  `}
                            // className="  text-2xl font-bold leading-9 tracking-tight text-gray-900"
                        >
                            Registrati
                        </h2>
                    </div>
                </div>
            </div>
            {<Outlet />}
        </div>
    );
};

export default LandingPage;
