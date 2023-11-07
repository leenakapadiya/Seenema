import React, { useState } from "react"
import { signUp } from "./Auth"
import {signIn} from "./Auth";
import ConfirmSignUp from "./ConfirmSignUp";
import {useForm} from "react-hook-form";
import Form from "../CSS/Form.css"
import {Link} from "react-router-dom";
import SignIn from "./SignIn";
import seenemaLogo from "../SeenemaLogo.png";

export default function SignUp() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const { register } = useForm();
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            await signUp(firstname, lastname, email, password)
            setSuccess(true)
        } catch (err) {
            setError(err.message)
        }
    }

    if (success) {
        return (
            <ConfirmSignUp email={email}/>
        )
    }

    return (
        <div>
            <div className= "logo">
                <img
                    src={seenemaLogo}
                    alt={"Logo is here"}
                    style={{ width: "200px", height: "150px", marginRight: "10px" }}
                />
            </div>
            <form onSubmit={handleSubmit}>
                <h1>SignUp</h1>
                <div>
                    <label>First Name</label>
                    <input name="First Name" required {...register('First Name', {
                        onChange: (e) => setFirstname(e.target.value)
                    })} />
                </div>
                <div>
                    <label>Last Name</label>
                    <input name="Last Name" required {...register('Last Name', {
                        onChange: (e) => setLastname(e.target.value)
                    })} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email"  required {...register('email', {
                        onChange: (e) => setEmail(e.target.value)
                    })} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" required {...register('password', {
                        onChange: (e) => setPassword(e.target.value)
                    })} />
                </div>
                {error && <p>{error}</p>}
                <button>Sign Up</button>
                {/*<p className= "para">Already have an account? <Link to = "/SignIn"> Sign In </Link></p>*/}
            </form>
        </div>
    )
}