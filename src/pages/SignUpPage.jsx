import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (e.target.password.value !== e.target.confirmPassword.value) {
                alert("Password does not match!");
                return;
            }
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/register`, {
                method: "POST",
                body: JSON.stringify({
                    email,
                    fullName,
                    otp: e.target.otp.value,
                    password: e.target.password.value,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const respObj = await resp.json();
            if (respObj.status === "success") {
                navigate("/login");
            } else {
                alert(respObj.message);
            }
        } catch (err) {
            alert("An error occurred during registration.");
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/otps`, {
                method: "POST",
                body: JSON.stringify({
                    email: e.target.userEmail.value,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const respObj = await resp.json();
            if (respObj.status === "success") {
                setIsOtpSent(true);
                setFullName(e.target.fullName.value);
                setEmail(e.target.userEmail.value);
            } else {
                alert("Error: " + respObj.message);
            }
        } catch (err) {
            alert("An error occurred while sending OTP.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Sign Up</h1>
                {isOtpSent ? (
                    <form onSubmit={handleRegister} style={styles.form}>
                        <input
                            type="text"
                            value={email}
                            readOnly
                            style={styles.inputDisabled}
                        />
                        <input
                            type="text"
                            value={fullName}
                            readOnly
                            style={styles.inputDisabled}
                        />
                        <input
                            type="text"
                            placeholder="OTP"
                            name="otp"
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
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            style={styles.input}
                            required
                        />
                        <button type="submit" style={styles.button}>
                            Register
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSendOtp} style={styles.form}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="fullName"
                            style={styles.input}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="userEmail"
                            style={styles.input}
                            required
                        />
                        <button type="submit" style={styles.button}>
                            Send OTP
                        </button>
                    </form>
                )}
                <p style={styles.text}>
                    Already have an account?{" "}
                    <Link to="/login" style={styles.link}>
                        Login
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
    inputDisabled: {
        padding: "0.8rem",
        borderRadius: "4px",
        border: "1px solid #ddd",
        fontSize: "16px",
        backgroundColor: "#f0f0f0",
        color: "#666",
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

export default SignUpPage;