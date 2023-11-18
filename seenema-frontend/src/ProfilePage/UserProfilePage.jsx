import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext } from "react";
import "./UserProfilePage.css";
import { AuthContext } from "../Auth/JavaScript/AuthContext";

const Card = () => {
    const { user, signOut } = useContext(AuthContext);

    return (
        <div>
            <div className="page">
                <div className="main-container">
                    {user && (
                        <div className="profile-component">
                            <h1>Profile</h1>
                            <h2>{`${user.given_name} ${user.family_name}`}</h2>
                            <h3>Email: {user.email}</h3>
                        </div>
                    )}
                    <button onClick={signOut}
                            style={{ marginTop: "30px", marginBottom: "20px" }}
                            className="button-profile"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
