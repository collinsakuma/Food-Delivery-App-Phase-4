import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <div className="container">
            <h1 className="row">Flat Cake Factory</h1>
            {showLogin ? (
                <>
                    <LoginForm onLogin={onLogin} />
                    <p>
                        Don't have an account? &nbsp;
                        <button onClick={() => setShowLogin(false)}>
                            Sign Up
                        </button>
                    </p>
                </>
                ) : (
                <>
                    <SignUpForm onLogin={onLogin} />
                    <p>
                        Already have an account? &nbsp;
                        <button onClick={() => setShowLogin(true)}>
                            Log In
                        </button>
                    </p>
                </>
            )}
        </div>
    )
}

export default Login;