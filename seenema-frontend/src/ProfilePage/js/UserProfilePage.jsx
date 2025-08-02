import "bootstrap/dist/css/bootstrap.min.css";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../css/UserProfilePage.css";
import MyListPage from "../../MyListPage/js/MyMoviesList";
import {AuthContext} from "../../Auth/js/AuthContext";
import FriendsList from "./FriendsList";
import ListOfMovies from "../../SuggestionsListPage/js/ListOfMovies.js";
import Loading from "../../assets/loading.json";
import Lottie from "lottie-react";
import backgroundImage from "../../assets/FrostedGlassBackground.png";
import MyMoviesList from "../../MyListPage/js/MyMoviesList";
import { Film } from "lucide-react";
import { Users } from "lucide-react";
import { Mail } from "lucide-react";
import { fetchAllMovieProviders } from "../../TMDB/tmdb.js";
import BACKEND_API_URL from '../../Homepage/js/backendApi';
import StreamingPlatformsDropdown from "../../Auth/js/StreamingPlatformsDropDown";

// Component representing the user profile page
const UserProfilePage = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const [friendEmail, setFriendEmail] = useState("");
    const [friendsList, setFriendsList] = useState(new Set());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showFriendsList, setShowFriendsList] = useState(false);
    const [myList, setMyList] = useState([]);
    const [suggestionsList, setSuggestionsList] = useState([]);
    const [streamingPlatforms, setStreamingPlatforms] = useState([]);
    const [providerOptions, setProviderOptions] = useState([]);
    const [editingPlatforms, setEditingPlatforms] = useState(false);
    const myListSize = myList.length;
    const suggestionsListSize = suggestionsList.length;
    const streamingPlatformsSize = streamingPlatforms.length;
    const [showAllPlatforms, setShowAllPlatforms] = useState(false);
    const maxVisible = 8;
    const visiblePlatforms = showAllPlatforms ? streamingPlatforms : streamingPlatforms.slice(0, maxVisible);
    const [loadingPlatforms, setLoadingPlatforms] = useState(true);

    // Function to navigate back
    const handleGoBack = () => {
        navigate(-1);
    };

    // Function to add a friend
    const handleAddFriend = async () => {
        try {
            setLoading(true);
            // Send a request to add a friend
            const response = await fetch(`${BACKEND_API_URL}/addFriend`, {
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
            const response = await fetch(`${BACKEND_API_URL}/getUserInfo`, {
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

    const handleSavePlatforms = async () => {
        setEditingPlatforms(false);
        await fetch(`${BACKEND_API_URL}/addStreamingPlatforms`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: user.email,
                streamingPlatforms: streamingPlatforms,
            }),
        });
    // Optionally, refresh user info here
    };

   useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await fetch(`${BACKEND_API_URL}/getUserInfo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Email: user.email }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("User info:", data);
                setMyList(data.Movies || []);
                setSuggestionsList(data.MovieSuggestionsList || []);
                let platforms = [];
                try {
                    platforms = JSON.parse(data.StreamingPlatforms || "[]");
                } catch (e) {
                    platforms = [];
                }
                setStreamingPlatforms(platforms);
            }
            setLoadingPlatforms(false);
        };
        fetchUserInfo();
        const getProviders = async () => {
            const providersList = await fetchAllMovieProviders('US');
            const formatted = providersList.map(provider => ({
                value: provider.provider_id,
                label: provider.provider_name,
                logo: provider.logo_path
            }));
            setProviderOptions(formatted);
        };
        getProviders();
        handleGetFriendsList();
    }, []);

    const userPlatforms = providerOptions.filter(opt => streamingPlatforms.includes(opt.value));

    // Render the UserProfilePage component
    return (
        <div className="profile-body">
            <div className="back-button-profile">
                <button onClick={handleGoBack} className="generic-button">Back</button>
            </div>

            <div className="user-profile-page">
                <img src={backgroundImage} alt="Background" className="background-image" />

                {/* Profile Header */}
                <div className="profile-slab">
                    <div className="avatar">
                        {user.given_name?.[0] || "U"}
                    </div>
                    <h2>{`${user.given_name} ${user.family_name}`}</h2>
                    <p className="email">{user.email}</p>
                    <br/>
                    {streamingPlatformsSize >= 0 && (
                        <div className="profile-platforms-section">
    {streamingPlatforms.length === 0 ? (
      editingPlatforms ? (
        <div className="edit-platforms-modal">
          <div style={{width: "100%", marginBottom: "18px"}}>
            <StreamingPlatformsDropdown
              value={streamingPlatforms}
              onChange={setStreamingPlatforms}
            />
          </div>
          <button onClick={handleSavePlatforms} className="edit-platforms-btn">Save</button>
          <br/>
          <button onClick={() => setEditingPlatforms(false)} className="edit-platforms-btn">Cancel</button>
        </div>
      ) : (
        <button
          className="edit-platforms-btn"
          onClick={() => setEditingPlatforms(true)}
          style={{margin: "12px auto", display: "block"}}
        >
          Add Streaming Platforms
        </button>
      )
    ) : (
      <>
        <div className="platforms-header-row">
          <h4>Streaming Platforms</h4>
          <button className="edit-platforms-btn" onClick={() => setEditingPlatforms(true)}>Edit</button>
        </div>
        {loadingPlatforms ? (
          <div className="platforms-loader">
            <Lottie loop={true} animationData={Loading} style={{height: 40}} />
          </div>
        ) : editingPlatforms ? (
          <div className="edit-platforms-modal">
            <div style={{width: "100%", marginBottom: "18px"}}>
              <StreamingPlatformsDropdown
                value={streamingPlatforms}
                onChange={setStreamingPlatforms}
              />
            </div>
            <button onClick={handleSavePlatforms} className="edit-platforms-btn">Save</button>
            <br/>
            <button onClick={() => setEditingPlatforms(false)} className="edit-platforms-btn">Cancel</button>
          </div>
        ) : (
          <div className="platforms-list">
            {visiblePlatforms.map((platform, idx) => (
              <div className="platform-pill-card" key={idx}>
                {platform.logo && (
                  <img
                    src={`https://image.tmdb.org/t/p/w45${platform.logo}`}
                    alt={platform.label}
                    className="platform-icon-img"
                  />
                )}
                <span className="platform-name">{platform.label}</span>
              </div>
            ))}
            {streamingPlatforms.length > maxVisible && (
              <button className="show-more-btn" onClick={() => setShowAllPlatforms(v => !v)}>
                {showAllPlatforms ? "Show Less" : `+${streamingPlatforms.length - maxVisible} more`}
              </button>
            )}
          </div>
        )}
      </>
    )}
                        </div>
                    )}
                </div>

                {/* Row for Stats */}
                <div className="profile-stat-section">
                    <div className="profile-stats-row">
                        <div className="stat-box">
                            <br/>
                            <Film size={32} color="#E63946" className="icon" />
                            <br/>
                            <h2 className="stat-number">{myListSize}</h2>
                            <br/>
                            <p className="stat-name">WatchList</p>
                        </div>
                        <div className="stat-box clickable"
                            onClick={() => setShowFriendsList((prev) => !prev)}>
                            <br/>
                            <Users size={32} color="#E63946" className="icon" />
                            <h2 className="stat-number">{friendsList.size}</h2>
                            <br/>
                            <p className="stat-name">Friends</p>
                        </div>
                    </div>
                    {showFriendsList && (
                        <div className="friends-list-wrapper">
                            <FriendsListSlab loading={loading} friendsList={friendsList} />
                        </div>
                    )}
                </div>

                {/* Row for Add Friend + Suggestion */}
                <div className="friend-actions-row">
                        <div className="add-friend-modern">
                            <h3 className="section-title">Add a Friend</h3>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={18} color="#aaa" />
                                <input
                                type="email"
                                placeholder="Friend’s email address"
                                value={friendEmail}
                                onChange={(e) => {
                                    setFriendEmail(e.target.value);
                                    setError(null);
                                }}
                                className="friend-input-modern"
                                />
                            </div>
                            <button onClick={handleAddFriend} className="add-friend-modern-button">
                                ➕ Add Friend
                            </button>
                            {error && <p className="error-modern-msg">{error}</p>}
                        </div>

                        <div className="friend-suggestions">
                            <button onClick={() => navigate("/suggestionsList")} className="generic-button">
                                <h2>{suggestionsListSize}</h2>
                            Friend Suggestions →
                            </button>
                        </div>
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
