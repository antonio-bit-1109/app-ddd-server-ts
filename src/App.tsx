import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./app/FEATURES/components/GENERAL/MainPage";
import LoginComp from "./app/FEATURES/components/AUTH/LoginComp";
import GetAllBook from "./app/FEATURES/components/BOOK/GetAllBook";
import GetUserInfo from "./app/FEATURES/components/USER/GetLoggedUserInfo";
import AdminPanel from "./app/FEATURES/components/ADMIN/AdminPanel";
import GetAllUsers from "./app/FEATURES/components/USER/GetAllUsers";
import CreateNewBook from "./app/FEATURES/components/ADMIN/CreateNewBook";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginComp />} />
                    <Route path="/Home" element={<MainPage />}>
                        <Route index element={<GetAllBook />} />
                        <Route path="Settings" element={<GetUserInfo />} />
                        <Route path="adminPanel" element={<AdminPanel />} />
                    </Route>
                    <Route path="/Admin" element={<AdminPanel />}>
                        <Route index element={<GetAllUsers />} />
                        <Route path="Books" element={<GetAllBook admin={"ADMIN"} />} />
                        <Route path="Books/CreateBook" element={<CreateNewBook />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
