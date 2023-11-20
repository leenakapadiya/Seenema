import "bootstrap/dist/css/bootstrap.min.css";
import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfilePage.css";
import { AuthContext } from "../Auth/JavaScript/AuthContext";
import Loading from "../assets/loading.json";
import Lottie from "lottie-react";

const UserProfilePage = () => {
    const navigate = useNavigate();
    const { user, signOut } = useContext(AuthContext);
    const [friendEmail, setFriendEmail] = useState("");
    const [friendsList, setFriendsList] = useState(new Set()); // Add state for friends list
    const [loading, setLoading] = useState(false);


    const handleGoBack = () => {
        navigate(-1); // Use history.goBack() to go back to the previous page
    };

    const handleAddFriend = async () => {
        try {
            setLoading(true); // Set loading to true before making the API call
            // Make an API call to add friend
            const response = await fetch("https://qr6gmhloff.execute-api.us-west-2.amazonaws.com/dev/addFriend", {
                method: "POST",
                body: JSON.stringify({
                    username: user.email,
                    friendUsername: friendEmail,
                }),
            });

            // Check if the API call was successful (status code 2xx)
            if (response.ok) {
                console.log("Friend added successfully!");
                // Add any additional logic or UI updates as needed

                // Add the new friend to the friends list
                setFriendsList((prevFriendsList) => new Set([...prevFriendsList, friendEmail]));

                // Clear the input field
                setFriendEmail("");
            } else {
                console.error("Failed to add friend:", response.status, response.statusText);
                // Handle the error or show an error message to the user
            }
        } catch (error) {
            console.error("Error adding friend:", error.message);
            // Handle the error or show an error message to the user
        } finally {
            setLoading(false); // Set loading to false after the API call is complete
        }
    };

    return (
        <div>
            <div className="page">
                <div className="main-container">
                    {/*{user && (*/}
                        <div className="profile-component">
                            {/*<div style={{width: "60%", paddingLeft: "35%"}}>*/}
                            {/*    <Lottie loop={true} animationData={Loading}/>*/}
                            {/*</div>*/}
                            <button type="button" className="close" aria-label="Close" onClick={handleGoBack}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="header">
                                <h1>Profile</h1>
                            </div>
                            <h2>{`${user.given_name} ${user.family_name}`}</h2>
                            <h3>Email: {user.email}</h3>
                        </div>
                    {/*)}*/}
                    <hr/>
                    <h3>Friends</h3>
                    <div>
                        {loading ? (
                            <div style={{ width: "60%", paddingLeft: "35%" }}>
                                <Lottie loop={true} animationData={Loading} />
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Friend's Email"
                                    value={friendEmail}
                                    onChange={(e) => setFriendEmail(e.target.value)}
                                />
                                <button onClick={handleAddFriend} className="button-profile" disabled={loading}>
                                    Add Friend
                                </button>
                            </div>
                        )}
                    </div>
                    <ul>
                        {/* Display the friends list */}
                        {Array.from(friendsList).map((friend, index) => (
                            <li key={index}>{friend}</li>
                        ))}
                    </ul>
                    <hr/>
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
