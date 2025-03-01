import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

const HomePage = ({ currUser, handleLogout }) => {
    return (
        <div style={styles.container}>
            <Navbar currUser={currUser} handleLogout={handleLogout} />

            <div style={styles.content}>
                <h1>Welcome to the Home Page</h1>
                <p>Hello, {currUser.fullName}! You are now logged in.</p>

                <Outlet />
            </div>
            <footer style={styles.footer}>
                <p>&copy; 2023 Task Management App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full viewport height
        backgroundColor: "#f5f5f5", // Light gray background
    },
    content: {
        flex: 1, // Takes up remaining space
        padding: "20px",
        textAlign: "center",
    },
    footer: {
        backgroundColor: "#333", // Dark background
        color: "#fff", // White text
        textAlign: "center",
        padding: "10px",
        position: "relative",
        bottom: 0,
        width: "100%",
    },
};