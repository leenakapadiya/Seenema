import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {signOut} from "./Auth";

// component for user sign out
function SignOut() {
    // State variables to handle the code
    const navigate = useNavigate();
    const [error, setError] = useState("")


    // handles the signOut of the user
    const handleSignOut = async () => {
        try {
            // try to confirm signOut and then navigate to sign in page
            await signOut();
            navigate("/signIn");
        } catch (err) {
            // Set the error message
            setError(err.message)
        }
    };

    let nothing;
    handleSignOut().then(r => nothing);

    return <div>{error && <p>{error}</p>}</div>;

}

export default SignOut;
