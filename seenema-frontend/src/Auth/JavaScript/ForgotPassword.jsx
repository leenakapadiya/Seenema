import React, {useState} from "react"
import {forgotPassword} from "./Auth";
import {Link} from "react-router-dom"
import "../CSS/Form.css";
import seenemaLogo from "../../assets/SeenemaLogo.png";
import ResetPassword from "./ResetPassword";

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            await forgotPassword(email)
            setSuccess(true)
        } catch (err) {
            setError(err.message)
        }
    }

    if (success) {
        return (
            <div>
                <ResetPassword/>
            </div>
        )
    }

    return (
        <div className="bg-Poster">
            <div className="auth-Form">
                <div className="logo-auth">
                    <img
                        src={seenemaLogo}
                        alt={"Logo is here"}
                    />
                </div>
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
                    <button style={{marginTop: "30px", marginBottom: "20px"}} className="button-auth">Submit</button>
                </form>
                <Link to="/SignIn" style={{color: 'inherit'}}>Back to Sign In</Link>
            </div>
        </div>
    )
}