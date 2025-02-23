import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TaskPage from "./pages/TaskPage";
import { useEffect, useState } from "react";

const App = () => {
    const [currUser, setCurrUser] = useState(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        return {
            isLoggedIn: isLoggedIn === "true",
            fullName: "Guest",
        };
    });

    const afterLogin = (respObj) => {
        const newStateOfUser = { isLoggedIn: true, fullName: respObj.data.user.fullName };
        localStorage.setItem("isLoggedIn", true);
        setCurrUser(newStateOfUser);
    };

    const getLoggedInUserInfo = async () => {
        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/me", {
                credentials: "include",
            });
            const respObj = await resp.json();
            setCurrUser({
                isLoggedIn: true,
                fullName: respObj.data.user.fullName,
                email: respObj.data.user.email,
            });
        } catch (err) {
            console.error("Error fetching user info:", err);
        }
    };

    useEffect(() => {
        if (currUser.isLoggedIn) {
            getLoggedInUserInfo();
        }
    }, [currUser.isLoggedIn]);

    const handleLogout = async () => {
        try {
            localStorage.removeItem("isLoggedIn");
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/logout", {
                credentials: "include",
            });
            const respObj = await resp.json();
            if (respObj.status === "success") {
                setCurrUser({
                    isLoggedIn: false,
                    fullName: "Guest",
                });
            } else {
                alert("Error in Logout! " + respObj.message);
            }
        } catch (err) {
            console.error("Error during logout:", err);
        }
    };

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Home Page with nested routes */}
                    <Route
                        path="/"
                        element={
                            currUser.isLoggedIn ? (
                                <HomePage currUser={currUser} handleLogout={handleLogout} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    >
                        {/* Nested route for Tasks */}
                        <Route path="tasks" element={<TaskPage />} />
                    </Route>

                    {/* Login Page */}
                    <Route
                        path="/login"
                        element={currUser.isLoggedIn ? <Navigate to="/" /> : <LoginPage afterLogin={afterLogin} />}
                    />

                    {/* Signup Page */}
                    <Route
                        path="/sign-up"
                        element={currUser.isLoggedIn ? <Navigate to="/" /> : <SignUpPage />}
                    />

                    {/* Catch-all route: Redirect to Home Page */}
                    <Route
                        path="*"
                        element={
                            currUser.isLoggedIn ? (
                                <Navigate to="/" />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;