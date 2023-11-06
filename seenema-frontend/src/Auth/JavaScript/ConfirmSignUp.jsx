import React, { useState } from "react"
import { confirmSignUp } from "./Auth"
import SignIn from "./SignIn";
import {useForm} from "react-hook-form";
import Form from "../CSS/Form.css"

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
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Enter your verification code</h1>
                <div>
                    <h4> A verification code has been sent to your email. Please enter the code that you received.</h4>
                    <label>Secure verification code</label>
                    <input name="code" {...register('code', {
                        onChange: (e) => setCode(e.target.value)
                    })} />
                </div>
                <button>Submit</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}