const LoginPage = () => {
    const handleLogin = async (e) => {
        // H.W. --> login
    };
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" name="email" required />
                {/* Uncontrolled Inputs */}
                <input type="password" placeholder="Password" name="password" required />
                {/* Uncontrolled Inputs */}
                <button>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
