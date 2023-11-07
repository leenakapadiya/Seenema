import React, { useState } from "react"
import { confirmSignUp } from "./Auth"
import SignIn from "./SignIn";
import {useForm} from "react-hook-form";
import Form from "../CSS/Form.css"
import seenemaLogo from "../SeenemaLogo.png";

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
                        <h1>Enter your verification code</h1>
                    </div>
                    <div>
                        <h4 className="conformation-name"> A verification code has been sent to your email. Please enter the code that you received.</h4>
                        <label className="label-names">Secure verification code</label>
                        <input className="auth-input" name="code" {...register('code', {
                            onChange: (e) => setCode(e.target.value)
                        })} />
                    </div>
                    <button className="button-auth">Submit</button>
                </form>
            </div>
            {error && <p>{error}</p>}
        </div>
    )
}