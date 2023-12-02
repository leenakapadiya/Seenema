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
    const [error, setError] = useState(null);

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
                const errorResponse = await response.json().catch(() => null); // Handle potential JSON parsing errors
                const errorMessage = errorResponse?.message || "Failed to add friend. Please try again."; // Set a generic error message if message is not available

                // Check for a specific condition in the error response and customize the message accordingly
                if (response.status === 500) {
                    setError("Incorrect email. Please try again.");
                } else {
                    setError(errorMessage);
                }
                console.error("Failed to add friend:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error adding friend:", error.message);
        } finally {
            setLoading(false);
        }
    };
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
                            {error && <p style={{color: "white"}}>{error}</p>}
                        </div>
                    </div>
                    <FriendsListSlab loading={loading} friendsList={friendsList} />
                </div>
            </div>
        </div>
    );
};
const FriendsListSlab = ({ loading, friendsList }) => {
    const isScrollable = friendsList.size > 0 && friendsList.size > 5;

    return (
        <div
            className={`friends-list-slab ${isScrollable ? 'scrollable' : ''}`}
            style={{ minHeight: friendsList.size === 0 ? '420px' : 'auto' }}
        >
            {loading ? (
                <LoadingSection />
            ) : (
                <FriendsListSection friendsList={friendsList} />
            )}
        </div>
    );
};

const LoadingSection = () => (
    <>
        <h3>Friends List</h3>
        <hr />
        <div className="loading-container">
            <Lottie loop={true} animationData={Loading} />
        </div>
    </>
);

const FriendsListSection = ({ friendsList }) => (
    <>
        {friendsList.size > 0 ? (
            <FriendsList friendsList={Array.from(friendsList)} />
        ) : (
            <div>
                <h3>Friends List</h3>
                <hr />
                <p className="No-friends-yet">No friends yet.</p>
            </div>
        )}
    </>
);

export default UserProfilePage;
