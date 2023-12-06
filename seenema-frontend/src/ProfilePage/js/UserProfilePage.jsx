import "bootstrap/dist/css/bootstrap.min.css";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../css/UserProfilePage.css";
import {AuthContext} from "../../Auth/js/AuthContext";
import FriendsList from "./FriendsList";
import Loading from "../../assets/loading.json";
import Lottie from "lottie-react";
import backgroundImage from "../../assets/Profile-Background.png";

// Component representing the user profile page
const UserProfilePage = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const [friendEmail, setFriendEmail] = useState("");
    const [friendsList, setFriendsList] = useState(new Set());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to navigate back
    const handleGoBack = () => {
        navigate(-1);
    };

    // Function to add a friend
    const handleAddFriend = async () => {
        try {
            setLoading(true);
            // Send a request to add a friend
            const response = await fetch("https://9acdf5s7k2.execute-api.us-west-2.amazonaws.com/dev/addFriend", {
                method: "POST",
                body: JSON.stringify({
                    username: user.email,
                    friendUsername: friendEmail,
                }),
            });

            if (response.ok) {
                console.log("Friend added successfully!");
                // Update the friends list in the state
                setFriendsList((prevFriendsList) => new Set([...prevFriendsList, friendEmail]));
                setFriendEmail("");
            } else {
                // Handle errors in the response
                const errorResponse = await response.json().catch(() => null); // Handle potential JSON parsing errors
                const errorMessage = errorResponse?.message || "Failed to add friend. Please try again."; // Set a generic error message if message is not available

                // Check for a specific condition in the error response and customize the message accordingly
                if (response.status === 500) {
                    setError("Incorrect email or email not registered. Please try again.");
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

    // Function to get the user's friends list
    const handleGetFriendsList = async () => {
        try {
            setLoading(true);
            // Send a request to get user information, including the friends list
            const response = await fetch("https://9acdf5s7k2.execute-api.us-west-2.amazonaws.com/dev/getUserInfo", {
                method: "POST",
                body: JSON.stringify({
                    Email: user.email
                }),
            });

            if (response.ok) {
                console.log("Friend list fetched successfully!");
                // Parse the response data
                const userData = await response.json();

                // Check if Friends array exists before using map
                if (userData.Friends && Array.isArray(userData.Friends)) {
                    const friendEmails = userData.Friends;
                    // Update the friends list in the state
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

    // Render the UserProfilePage component
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
                                onChange={(e) => {
                                    setFriendEmail(e.target.value);
                                    setError(null); // Reset the error when the user starts typing
                                }}
                                className={"add-friend-input"}
                            />
                            <button onClick={handleAddFriend} className="generic-button button-add-friend-profile">Add
                                Friend
                            </button>
                            {error && <p style={{color: "white"}}>{error}</p>}
                        </div>
                    </div>
                    <FriendsListSlab loading={loading} friendsList={friendsList}/>
                </div>
            </div>
        </div>
    );
};

// Component to display the Friends List section, considering loading state and whether it is scrollable
const FriendsListSlab = ({loading, friendsList}) => {
    const isScrollable = friendsList.size > 0 && friendsList.size > 5;

    return (
        <div
            className={`friends-list-slab ${isScrollable ? 'scrollable' : ''}`}
            style={{minHeight: friendsList.size === 0 ? '420px' : 'auto'}}
        >
            {loading ? (
                <LoadingSection/>
            ) : (
                <FriendsListSection friendsList={friendsList}/>
            )}
        </div>
    );
};

// Component to display loading animation
const LoadingSection = () => (
    <>
        <h3>Friends List</h3>
        <hr/>
        <div className="loading-container">
            <Lottie loop={true} animationData={Loading}/>
        </div>
    </>
);

// Component to display the Friends List or a message if no friends yet
const FriendsListSection = ({friendsList}) => (
    <>
        {friendsList.size > 0 ? (
            <FriendsList friendsList={Array.from(friendsList)}/>
        ) : (
            <div>
                <h3>Friends List</h3>
                <hr/>
                <p className="No-friends-yet">No friends yet.</p>
            </div>
        )}
    </>
);

export default UserProfilePage;
