import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useState } from "react";

const App = () => {
    const [currUser, setCurrUser] = useState({
        isLoggedIn: false,
        fullName: "Guest",
    });

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={currUser.isLoggedIn ? <HomePage /> : <Navigate to="/sign-up" />} />
                    <Route path="/login" element={currUser.isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
                    <Route path="/sign-up" element={currUser.isLoggedIn ? <Navigate to="/" /> : <SignUpPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
