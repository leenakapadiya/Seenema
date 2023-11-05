import React, { useState } from "react"
import { confirmSignUp } from "./Auth"
import SignIn from "./SignIn";
import {useForm} from "react-hook-form";
import Form from "./Form.css"

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
            <h1>Confirm Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h4>Please check your email. The verification code has been sent to your email.</h4>
                    <label>Confirmation code</label>
                    <input name="code" {...register('code', {
                        onChange: (e) => setCode(e.target.value)
                    })} />
                </div>
                <button>Confirm</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}