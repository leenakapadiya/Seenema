import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useState } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import "./UserProfilePage.css";
import { AuthContext } from "../Auth/JavaScript/AuthContext";
import FriendsList from "./FriendsList";
import Loading from "../assets/loading.json";
import Lottie from "lottie-react";

const UserProfilePage = () => {
    const navigate = useNavigate();
    const { user, signOut } = useContext(AuthContext);
    const [friendEmail, setFriendEmail] = useState("");
    const [friendsList, setFriendsList] = useState(new Set());
    const [loading, setLoading] = useState(false);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleAddFriend = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://qr6gmhloff.execute-api.us-west-2.amazonaws.com/dev/addFriend", {
                method: "POST",
                body: JSON.stringify({
                    username: user.email,
                    friendUsername: friendEmail,
                }),
            });

            if (response.ok) {
                console.log("Friend added successfully!");
                setFriendsList((prevFriendsList) => new Set([...prevFriendsList, friendEmail]));
                setFriendEmail("");
            } else {
                console.error("Failed to add friend:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error adding friend:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{marginTop: "10%"}}>
            <div style={{ width: "5px", alignContent: "end", marginLeft: "95%" }}>
                <span onClick={handleGoBack} style={{ cursor: "pointer", textDecoration: 'none', color: "white" }}>X</span>
            </div>
            <div className="row">
                {/*<div className="page">*/}
                    <div className="col">
                        <div className="main-container" style={{marginTop: "20%"}}>
                            <div className="header">
                                <h3>Profile</h3>
                                <hr/>
                            </div>
                            <p>Name: {`${user.given_name} ${user.family_name}`}</p>
                            <p>Email: {user.email}</p>
                            <br />
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="main-container">
                                <h3> Add Friend </h3>
                                <hr/>
                                {loading ? (
                                    <div className="loading-container">
                                        <Lottie loop={true} animationData={Loading} />
                                    </div>
                                ) : (
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="  Friend's Email"
                                            value={friendEmail}
                                            onChange={(e) => setFriendEmail(e.target.value)}
                                            style={{marginRight: "30px" , borderRadius: "10px"}}
                                        />
                                        <button onClick={handleAddFriend} className="button-profile" disabled={loading}>
                                            Add Friend
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            {friendsList.size > 0 && (
                                <FriendsList
                                    friendEmail={friendEmail}
                                    setFriendEmail={setFriendEmail}
                                    handleAddFriend={handleAddFriend}
                                    loading={loading}
                                    friendsList={friendsList}
                                />
                            )}
                        </div>
                    </div>

                {/*</div>*/}
            </div>
        </div>
    );
};

export default UserProfilePage;
