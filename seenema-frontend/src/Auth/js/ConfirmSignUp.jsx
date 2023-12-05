import React, {useState} from "react"
import {confirmSignUp} from "./Auth"
import {useForm} from "react-hook-form";
import seenemaLogo from '../../assets/SeenemaLogo.png';
import "../css/Form.css";
import Lottie from "lottie-react";
import Mail from "../../assets/Mail.json";
import Loading from "../../assets/loading.json";
import {Navigate} from "react-router-dom";

// component to confirm user sign-up with a verification code
export default function ConfirmSignUp({email}) {
    // State variables to handle the code
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const {register} = useForm();
    const [loading, setLoading] = useState(false);

    // handles the submission of the form
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            // try to confirm signup using provided email and verification code
            setLoading(true);
            await confirmSignUp(email, code)
            setSuccess(true)
        } catch (err) {
            // Set the error message
            setError(err.message)
        } finally {
            // Stop loading animation, whether successful or not
            setLoading(false);
        }
    }

    // renders the confirmSignUp component
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
                    <Navigate to="/signIn" replace={true}/>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="heading-auth">
                        <h2>Enter your verification code</h2>
                    </div>
                    <div>
                        <h4 className="confirmation-name"> A verification code has been sent to your email.</h4>
                        <div style={{width: "60%", paddingLeft: "35%"}}>
                            <Lottie loop={true} animationData={Mail}/>
                        </div>
                        <label className="label-names">Secure verification code</label>
                        <input className="auth-input" name="code"
                               placeholder="Enter your verfication code"{...register('code', {
                            onChange: (e) => setCode(e.target.value)
                        })} />
                    </div>
                    {error && <p style={{paddingTop: "20px", color: "#E63946", textAlign: "left"}}>{error}</p>}
                        {loading ? (
                            <div className="loading-confirmation">
                                <Lottie loop={true} animationData={Loading}/>
                            </div>
                        ) : (
                            <button style={{ marginTop: "30px" }} className="generic-button-auth button-auth" disabled={loading}>
                                Submit
                            </button>
                        )}
                </form>
            </div>
        </div>
    )
}