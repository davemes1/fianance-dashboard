import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../AuthService"; // Import the signUp function from your AuthService

function Signup() {
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState(null);
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate();
    // Handle form submission
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await signUp(email, password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <h1>Signup</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? "Signing up..." : "Signup"}
                </button>
            </form>
        </div>
    );
}

export default Signup;