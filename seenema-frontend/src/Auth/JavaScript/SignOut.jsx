import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {signOut} from "./Auth";

function SignOut() {
    const navigate = useNavigate();
    const [error, setError] = useState("")

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate("/signIn");
        } catch (err) {
            setError(err.message)
        }
    };
    let nothing;
    handleSignOut().then(r => nothing);

    return <div>{error && <p>{error}</p>}</div>;

}

export default SignOut;
