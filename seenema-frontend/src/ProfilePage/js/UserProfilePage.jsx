import "bootstrap/dist/css/bootstrap.min.css";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../css/UserProfilePage.css";
import {AuthContext} from "../../Auth/JavaScript/AuthContext";
import FriendsList from "./FriendsList";
import Loading from "../../assets/loading.json";
import Lottie from "lottie-react";
import backgroundImage from "../../assets/Profile-Background.png";

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
                // handleGetFriendsList();
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
        <div className="profile-body">
            <div className="back-button-profile">
                <button onClick={handleGoBack} className="generic-button">Back</button>
            </div>
            <div className="user-profile-page">
                <img src={backgroundImage} alt="Background" className="background-image"/>
                {/*<div className="page">*/}
                <div className="left-column">
                    <div className="profile-slab" style={{marginTop: "20%"}}>
                        <h3>Profile</h3>
                        <hr/>
                        <p>Name: {`${user.given_name} ${user.family_name}`}</p>
                        <p>Email: {user.email}</p>
                        <br/>
                    </div>
                </div>
                <div className="right-column">
                    <div className="add-friend-slab">
                        <h3> Add Friend </h3>
                        <hr/>
                        <div className="add-friend-field">
                            <input
                                type="text"
                                placeholder="  Friend's Email"
                                value={friendEmail}
                                onChange={(e) => setFriendEmail(e.target.value)}
                                className={"add-friend-input"}
                            />
                            <button onClick={handleAddFriend} className="generic-button button-add-friend-profile">Add
                                Friend
                            </button>
                        </div>
                        {/*)}*/}
                    </div>
                    {loading ? (
                        <div className="loading-container">
                            <Lottie loop={true} animationData={Loading}/>
                        </div>
                    ) : (
                        <div
                            className={`friends-list-slab ${friendsList.size > 0 && friendsList.size > 5 ? 'scrollable' : ''}`}
                            style={{minHeight: friendsList.size === 0 ? '420px' : 'auto'}}>
                            {friendsList.size > 0 ? (
                                <FriendsList friendsList={Array.from(friendsList)}/>
                            ) : (
                                <div>
                                    <h3>Friends List</h3>
                                    <hr/>
                                    <p className="No-friends-yet">No friends yet.</p>
                                </div>
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
