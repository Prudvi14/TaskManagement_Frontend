import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useState } from "react";

// when ever the value of STATE variable changes
// the component is Re-Rendered (Re-Run) (line - by -line)

// all state variables will get wiped out and the app will again work as fresh app
// after you refresh the page

// we will use localStorage to remember if the user is logged in or not
// this is just to start the app, for any proper validation --> the backend will user token
// token is safely stored in cookies, which javascript cannot access because we have sent httpOnly: true
const App = () => {
    const [currUser, setCurrUser] = useState(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
            return {
                isLoggedIn: true,
                fullName: "Guest",
            };
        } else {
            return {
                isLoggedIn: false,
                fullName: "Guest",
            };
        }
    });

    const afterLogin = (respObj) => {
        const newStateOfUser = { isLoggedIn: true, fullName: respObj.data.user.fullName };
        // window.console.log --> console.log() because window is a global object
        // window.localStorage.setItem --> localStorage.setItem
        localStorage.setItem("isLoggedIn", true);
        setCurrUser(newStateOfUser);
    };

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={currUser.isLoggedIn ? <HomePage currUser={currUser} /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/login"
                        element={currUser.isLoggedIn ? <Navigate to="/" /> : <LoginPage afterLogin={afterLogin} />}
                    />
                    <Route path="/sign-up" element={currUser.isLoggedIn ? <Navigate to="/" /> : <SignUpPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
