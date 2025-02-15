import { useState } from "react";
import { Link } from "react-router";

const SignUpPage = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [email, setEmail] = useState(false);
    const [fullName, setFullName] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
    };

    const handleSendOtp = async (e) => {
        try {
            e.preventDefault();
            // you can do some validation on email using regex (H.W.)
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/otps", {
                method: "POST",
                body: JSON.stringify({
                    email: e.target.userEmail.value,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });

            console.log(resp);
            const respObj = await resp.json();
            console.log(respObj);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            {isOtpSent ? (
                <form onSubmit={handleRegister}>
                    <input type="text" value={email} readOnly />
                    {/* Controlled Inputs */}
                    <input type="text" value={fullName} readOnly />
                    {/* Controlled Inputs */}
                    <input type="text" placeholder="OTP" name="otp" required />
                    {/* Uncontrolled Inputs */}
                    <input type="password" placeholder="Password" name="password" required />
                    {/* Uncontrolled Inputs */}
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" required />
                    {/* Uncontrolled Inputs */}
                    <button>Register</button>
                </form>
            ) : (
                <form onSubmit={handleSendOtp}>
                    <input type="text" placeholder="Full Name" name="fullName" required />
                    {/* Uncontrolled Inputs */}
                    <input type="email" placeholder="Email" name="userEmail" required />
                    {/* Uncontrolled Inputs */}
                    <button>Send OTP</button>
                </form>
            )}
            <Link to="/login">Login</Link>
        </div>
    );
};

export default SignUpPage;
