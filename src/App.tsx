import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./app/FEATURES/components/GENERAL/MainPage";
import LoginComp from "./app/FEATURES/components/AUTH/LoginComp";
import GetAllBook from "./app/FEATURES/components/BOOK/GetAllBook";
import GetUserInfo from "./app/FEATURES/components/USER/GetLoggedUserInfo";
import AdminPanel from "./app/FEATURES/components/ADMIN/AdminPanel";
import GetAllUsers from "./app/FEATURES/components/USER/GetAllUsers";
import CreateNewBook from "./app/FEATURES/components/ADMIN/CreateNewBook";
import CreateNewUser from "./app/FEATURES/components/ADMIN/CreateNewUser";
import RegisterComp from "./app/FEATURES/components/AUTH/RegisterComponent";
import LandingPage from "./app/FEATURES/components/AUTH/LandingPage";
import { ResetUserPsw_page } from "./app/FEATURES/components/USER/ResetUserPsw_page";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />}>
                        <Route index element={<LoginComp />} />
                        <Route path="Register" element={<RegisterComp />} />
                    </Route>

                    {/* <Route path="/Register" element={<RegisterComp />} /> */}
                    <Route path="/Home" element={<MainPage />}>
                        <Route index element={<GetAllBook />} />
                        <Route path="Settings" element={<GetUserInfo />} />
                        <Route path="adminPanel" element={<AdminPanel />} />
                    </Route>
                    <Route path="/Admin/Users" element={<AdminPanel />}>
                        <Route index element={<GetAllUsers />} />
                        <Route path="CreateUser" element={<CreateNewUser />} />
                        {/* <Route path="Books" element={<GetAllBook admin={"ADMIN"} />} /> */}
                    </Route>
                    <Route path="/Admin/Books" element={<AdminPanel />}>
                        <Route index element={<GetAllBook admin={"ADMIN"} />} />
                        <Route path="CreateBook" element={<CreateNewBook />} />
                    </Route>

                    <Route path="/resetPassword" element={<ResetUserPsw_page />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
