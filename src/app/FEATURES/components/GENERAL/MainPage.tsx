import { Outlet } from "react-router-dom";

import NavBarComp from "./NavBarComp";

const MainPage = () => {
    return (
        <>
            {" "}
            <NavBarComp />
            <Outlet />
        </>
    );
};

export default MainPage;
