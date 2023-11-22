import "bootstrap/dist/css/bootstrap.min.css";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./UserProfilePage.css";
import { AuthContext } from "../Auth/JavaScript/AuthContext";
import FriendsList from "./FriendsList";
import Loading from "../assets/loading.json";
import Lottie from "lottie-react";

const UserProfilePage = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const [friendEmail, setFriendEmail] = useState("");
    const [friendsList, setFriendsList] = useState(new Set());
    const [loading, setLoading] = useState(false);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleAddFriend = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://9acdf5s7k2.execute-api.us-west-2.amazonaws.com/dev/addFriend", {
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
    //TODO: when user has no friends it should show the message "No friends yet"
    //TODO: when user enters friend's email which does not exist in the database, it should return an error message
    const handleGetFriendsList = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://9acdf5s7k2.execute-api.us-west-2.amazonaws.com/dev/getUserInfo", {
                method: "POST",
                body: JSON.stringify({
                    Email: user.email
                }),
            });

            if (response.ok) {
                console.log("Friend list fetched successfully!");
                const userData = await response.json();

                // Check if Friends array exists before using map
                if (userData.Friends && Array.isArray(userData.Friends)) {
                    const friendEmails = userData.Friends;
                    setFriendsList(new Set(friendEmails));
                } else {
                    console.error("Invalid friend list data:", userData);
                }
            } else {
                console.error("Failed to fetch friend list:", response.status, response.statusText);

                // Log the response when it's not OK
                const errorResponse = await response.text();
                console.error("Error response:", errorResponse);
            }
        } catch (error) {
            console.error("Error fetching friend list:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch friends list on component mount
    useEffect(() => {
        handleGetFriendsList();
    }, []); // Empty dependency array ensures it runs only once on mount

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
                                <hr />
                                {/*{loading ? (*/}
                                {/*    <div className="loading-container">*/}
                                {/*        <Lottie loop={true} animationData={Loading} />*/}
                                {/*    </div>*/}
                                {/*) : (*/}
                                    <div className= "add-friend-field">
                                        <input
                                            type="text"
                                            placeholder="  Friend's Email"
                                            value={friendEmail}
                                            onChange={(e) => setFriendEmail(e.target.value)}
                                            className={"add-friend-input"}
                                        />
                                        <button onClick={handleAddFriend} className="button-profile" disabled={loading}>
                                            Add Friend
                                        </button>
                                    </div>
                                {/*)}*/}
                            </div>
                        </div>
                        {loading ? (
                            <div className="loading-container">
                                <Lottie loop={true} animationData={Loading} />
                            </div>
                        ) : (
                        <div className="row">
                            {friendsList.size > 0 && (
                                <FriendsList
                                    friendsList={Array.from(friendsList)}
                                />
                            )}
                        </div>
                        )}
                    </div>

                {/*</div>*/}
            </div>
        </div>
    );
};

export default UserProfilePage;
