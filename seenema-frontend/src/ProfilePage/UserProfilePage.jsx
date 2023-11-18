import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfilePage.css";
import { AuthContext } from "../Auth/JavaScript/AuthContext";

const UserProfilePage = () => {
    const navigate = useNavigate();
    const { user, signOut } = useContext(AuthContext);

    const handleGoBack = () => {
        navigate(-1); // Use history.goBack() to go back to the previous page
    };
    return (
        <div>
            <div className="page">
                <div className="main-container">
                    {user && (
                        <div className="profile-component">
                            <button type="button" className="close" aria-label="Close" onClick={handleGoBack}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="header">
                                <h1>Profile</h1>
                            </div>
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

export default UserProfilePage;
