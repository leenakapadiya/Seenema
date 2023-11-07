import React, { useState } from "react"
import { signIn } from "./Auth"
import ConfirmSignUp from "./ConfirmSignUp";
import {useForm} from "react-hook-form";
import Form from "../CSS/Form.css"
import seenemaLogo from '../../assets/SeenemaLogo.png';
import Homepage from "../../Homepage/js/Homepage";

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const { register } = useForm();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            await signIn(email, password)
            setSuccess(true)
            // Redirect to the app's main page or dashboard
        } catch (err) {
            setError(err.message)
        }
    }

    if (success) {
        return (
            <div>
                <Homepage/>
            </div>
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
                        <h1>SignIn</h1>
                    </div>
                    <div>
                        <label className="label-names">Email</label>
                            <input className="auth-input" name="email" required {...register('email', {
                                onChange: (e) => setEmail(e.target.value)
                            })} />
                    </div>
                    <div>
                        <label className="label-names">Password</label>
                        <input className="auth-input" name="password" type="password" required {...register('password', {
                            onChange: (e) => setPassword(e.target.value)
                        })} />
                    </div>
                    {error && <p>{error}</p>}
                    <button className="button-auth">Sign In</button>
                </form>
            </div>
        </div>
    )
}