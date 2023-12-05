import React, {useState} from "react"
import {forgotPassword} from "./Auth";
import {Link, Navigate} from "react-router-dom"
import "../css/Form.css";
import seenemaLogo from "../../assets/SeenemaLogo.png";

// Component for forgot password
export default function ForgotPassword() {
    // State variables to handle the code
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    // handles the submission of the form
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            // try to perform forgotPassword using provided email
            await forgotPassword(email)
            setSuccess(true)
        } catch (err) {
            // Set the error message
            setError(err.message)
        }
    }

    // renders the forgotPassword component
    return (
        <div className="bg-Poster">
            <div className="auth-Form">
                <div className="logo-auth">
                    <img
                        src={seenemaLogo}
                        alt={"Logo is here"}
                    />
                </div>
                {success && (
                    <Navigate to="/resetPassword" replace={true}/>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="heading-auth">
                        <h2>Forgot Password</h2>
                    </div>
                    <label className="label-names">Email</label>
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <p style={{paddingTop: "20px", color: "#E63946", textAlign: "left"}}>{error}</p>}
                    <button style={{marginTop: "30px", marginBottom: "20px"}} className="generic-button-auth button-auth">Submit</button>
                </form>
                <Link to="/SignIn" style={{color: 'inherit'}}>Back to Sign In</Link>
            </div>
        </div>
    )
}