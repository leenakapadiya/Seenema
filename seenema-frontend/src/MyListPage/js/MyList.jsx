import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../Auth/js/AuthContext";
import Loading from "../../assets/loading.json";
import NoMovieYet from "../../assets/NoDataYet.json";
import Lottie from "lottie-react";
import '../../Homepage/css/MovieList.css';
import '../../Auth/js/Auth';
import MyMoviesList from "./MyMoviesList";
import '../css/MyList.css';

// Component representing the user's movie list
const MyList = () => {
    // React Router's navigation hook
    const navigate = useNavigate();
    // Accessing user information from the authentication context
    const {user} = useContext(AuthContext);
    // State to store the user's movie list and loading state
    const [moviesList, setMoviesList] = useState(new Set());
    const [loading, setLoading] = useState(false);

    // Function to navigate back to the previous page
    const handleGoBack = () => {
        navigate(-1);
    };

    // Function to fetch the user's movie list from the server
    const handleGetMoviesList = async () => {
        try {
            setLoading(true);
            // Fetch user information, including the movie list, from the server
            const response = await fetch("https://9acdf5s7k2.execute-api.us-west-2.amazonaws.com/dev/getUserInfo", {
                method: "POST",
                body: JSON.stringify({
                    Email: user.email
                })
            });

            if (response.ok) {
                console.log("Movies list fetched successfully!");
                // Parse the response data
                const userData = await response.json();

                // Check if the Movies array exists and is an array before using it
                if (userData.Movies && Array.isArray(userData.Movies)) {
                    const movieList = userData.Movies;
                    // Set the movie list in the component state
                    setMoviesList(new Set(movieList));
                } else {
                    console.error("Invalid movies list data:", userData);
                }
            } else {
                console.error("Failed to fetch movie list:", response.status, response.statusText);

                // Log the error response when the request is not successful
                const errorResponse = await response.text();
                console.error("Error response:", errorResponse);
            }
        } catch (error) {
            console.error("Error fetching movie list:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Effect hook to fetch the user's movie list when the component mounts
    useEffect(() => {
        handleGetMoviesList();
    }, []);

    // Render the MyList component
    return (
        <div className="my-list-whole">
            <div className="mylist-header">
                <button onClick={handleGoBack} className="generic-button button-back-mylist">Back
                </button>
                <h2 className="my-list-title">My List</h2>
            </div>
            <div className="list-main-area">
                {loading ? (
                    <div className="loading-container-my-list">
                        <Lottie loop={true} animationData={Loading}/>
                    </div>
                ) : (
                    <div>
                        {moviesList.size > 0 ? (
                            <MyMoviesList
                                moviesList={Array.from(moviesList)}
                            />
                        ) : (
                            <div>
                                <p className="No-Movie-Collection-yet">No movie collections yet.</p>
                                <div className="no-data-yet-my-list">
                                    <Lottie loop={true} animationData={NoMovieYet}/>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
};
export default MyList;
