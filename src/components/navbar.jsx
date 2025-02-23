import { Link } from "react-router-dom";

const Navbar = ({ currUser, handleLogout }) => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.left}>
                <span style={styles.greeting}>Hello, {currUser.fullName}</span>
            </div>
            <div style={styles.right}>
                <Link to="/tasks" style={styles.link}>Tasks</Link>
                <button onClick={handleLogout} style={styles.button}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;

// Inline styles for the Navbar component
const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#333", // Dark background
        padding: "10px 20px",
        color: "#fff", // White text
    },
    left: {
        display: "flex",
        alignItems: "center",
    },
    right: {
        display: "flex",
        alignItems: "center",
        gap: "20px", // Space between links and button
    },
    greeting: {
        fontSize: "18px",
        fontWeight: "bold",
    },
    link: {
        color: "#fff", // White text
        textDecoration: "none",
        fontSize: "16px",
    },
    button: {
        backgroundColor: "#ff4d4d", // Red button
        color: "#fff", // White text
        border: "none",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
    },
};