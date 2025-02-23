import { Link } from "react-router-dom";

const LoginPage = ({ afterLogin }) => {
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    email: e.target.email.value,
                    password: e.target.password.value,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const respObj = await resp.json();
            if (respObj.status === "success") {
                afterLogin(respObj);
            } else {
                alert(respObj.message);
            }
        } catch (err) {
            alert("An error occurred during login.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Login</h1>
                <form onSubmit={handleLogin} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>
                <p style={styles.text}>
                    Don't have an account?{" "}
                    <Link to="/sign-up" style={styles.link}>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

// Styling
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
    },
    card: {
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
    },
    title: {
        textAlign: "center",
        color: "#333",
        marginBottom: "1.5rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    input: {
        padding: "0.8rem",
        borderRadius: "4px",
        border: "1px solid #ddd",
        fontSize: "16px",
    },
    button: {
        backgroundColor: "#ff4d4d",
        color: "white",
        padding: "0.8rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
    },
    text: {
        textAlign: "center",
        marginTop: "1rem",
        color: "#666",
    },
    link: {
        color: "#007bff",
        textDecoration: "none",
        fontWeight: "bold",
    },
};

export default LoginPage;