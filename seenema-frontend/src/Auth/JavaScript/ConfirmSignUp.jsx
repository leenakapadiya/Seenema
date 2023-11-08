import React, { useState } from "react"
import { confirmSignUp } from "./Auth"
import SignIn from "./SignIn";
import {useForm} from "react-hook-form";
import seenemaLogo from '../../assets/SeenemaLogo.png';
import "../CSS/Form.css";

export default function ConfirmSignUp({email}) {
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const { register } = useForm();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            await confirmSignUp(email, code)
            setSuccess(true)
        } catch (err) {
            setError(err.message)
        }
    }

    if (success) {
        return (
            <SignIn />
        )
    }

    return (
        <div className="bg-Poster">
            <div className="auth-Form">
                <div className= "logo-auth">
                    <img
                        src={seenemaLogo}
                        alt={"Logo is here"}
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="heading-auth">
                        <h2>Enter your verification code</h2>
                    </div>
                    <div>
                        <h4 className="conformation-name"> A verification code has been sent to your email.</h4>
                        <label className="label-names">Secure verification code</label>
                        <input className="auth-input" name="code" {...register('code', {
                            onChange: (e) => setCode(e.target.value)
                        })} />
                    </div>
                    {error && <p style={{paddingTop: "20px", color: "#E63946", textAlign: "left"}}>{error}</p>}
                    <button style={{marginTop: "70px"}} className="button-auth">Submit</button>
                </form>
            </div>
        </div>
    )
}