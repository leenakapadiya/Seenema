import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {signOut} from "./Auth";
import {AuthContext} from "./AuthContext";

// component for user sign out
function SignOut() {
    // State variables to handle the code
    const navigate = useNavigate();
    const [error, setError] = useState("")
    let {user} = useContext(AuthContext);


    // handles the signOut of the user
    const handleSignOut = async () => {
        try {
            // try to confirm signOut and then navigate to sign in page
            await signOut();
            user = null;

            //TODO: when user sign out it should go to the default home page
        } catch (err) {
            // Set the error message
            setError(err.message)
        }
    };

    useEffect(() => {
        navigate("/Homepage");
    }, []);

    let nothing;
    handleSignOut().then(r => nothing);

    return <div>{error && <p>{error}</p>}</div>;

}

export default SignOut;
