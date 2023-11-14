import React, {useState} from "react";
import {useForm} from "react-hook-form";
import { confirmPassword } from "./Auth"
import {Link} from "react-router-dom"
import seenemaLogo from "../../assets/SeenemaLogo.png";
import "../CSS/Form.css";
import Lottie from "lottie-react";
import Success from "../../assets/Success.json";
import Mail from "../../assets/Mail.json";

// component for reset password
export default function ResetPassword(callback) {
    // State variables to handle the code
    const [email, setEmail] = useState("")
    const [confirmationCode, setConfirmationCode] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const { register } = useForm();

    // handles the submission of the form
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            // try to perform confirmPassword using provided email, verification code and new password
            await confirmPassword(email, confirmationCode, newPassword)
            setSuccess(true)
        } catch (err) {
            // Set the error message
            setError(err.message)
        }
    }

    // if success is ture, it renders the component with animation and a button to sign in page
    if (success) {
        return (
            <div className="bg-Poster">
                <div className="auth-Form">
                    <div className= "logo-auth">
                        <img
                            src={seenemaLogo}
                            alt={"Logo is here"}
                        />
                    </div>
                    <h4 className="confirmation-reset">Your password has been reset successfully!</h4>
                    <div style={{width: "80%", paddingLeft: "20%"}}>
                        <Lottie loop={true} animationData={Success}/>
                    </div>
                    <button style={{marginTop: "30px"}} className="button-auth"><Link to="/SignIn" style={{color: 'inherit', textDecoration: "none"}}>Back to Sign In</Link></button>
                    </div>
            </div>
        )
    }

    // renders the resetPassword component
    return (
        <div className="bg-Poster">
            <div className="auth-Form">
                <div className= "logo-auth">
                    <img
                        src={seenemaLogo}
                        alt={"Logo is here"}
                    />
                </div>
                < form onSubmit={handleSubmit}>
                    <div className="heading-auth">
                        <h2>Reset Password</h2>
                    </div>
                    <h4 className="confirmation-name">Check your email for the confirmation code to reset your password.</h4>
                    <div style={{width: "60%", paddingLeft: "35%"}}>
                        <Lottie loop={true} animationData={Mail}/>
                    </div>
                    <div>
                        <label className="label-names">Email</label>
                            <input className="auth-input" name="email" placeholder="Enter your email" required {...register('email', {
                                onChange: (e) => setEmail(e.target.value)
                            })} />
                    </div>
                    <div>
                        <label className="label-names">Confirmation code</label>
                        <input className="auth-input" name="confirmationCode" placeholder="Enter your verfication code"{...register('confirmationCode', {
                            onChange: (e) => setConfirmationCode(e.target.value)
                        })} />
                    </div>
                    <div>
                        <label className="label-names">New Password</label>
                        <input className="auth-input" name="New password" type="password" placeholder="Enter your new password" required {...register('password', {
                            onChange: (e) => setNewPassword(e.target.value)
                        })} />
                    </div>
                    {error && <p style={{paddingTop: "20px", color: "#E63946", textAlign: "left"}}>{error}</p>}
                    <button style={{marginTop: "30px", marginBottom: "20px" }} className="button-auth">Reset Password</button>
                    <br/>
                </form>
                <Link to="/SignIn" style={{color: 'inherit'}}>Back to Sign In</Link>
            </div>
        </div>
    )
}