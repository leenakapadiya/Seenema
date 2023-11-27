import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import api from '../Homepage/js/api'; // API import for fetching movie details
import './DetailPage.css'; // Importing CSS for styling
import starImage from '../assets/Star.png'; // Star icon for rating display
import {AuthContext} from "../Auth/JavaScript/AuthContext";
import '../SuggestionsListPage/css/SuggestedMoviesList.css';

const DetailPage = () => {
    // State variables for storing movie data
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [director, setDirector] = useState('');
    const [ageRating, setAgeRating] = useState('');
    const [videos, setVideos] = useState([]);
    const [streamingServices, setStreamingServices] = useState(null);
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const {movieId} = useParams(); // Getting movie ID from URL params
    const [friendEmail, setFriendEmail] = useState("");
    const [addedToWatchlist, setAddedToWatchlist] = useState(false);
    let {userEmail} = useParams();
    userEmail = user ? user.email : "";

    let rating = "";

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                // Fetch and set the main movie details
                const movieResponse = await api.get(`/movie/${movieId}`);
                setMovie(movieResponse.data);

                // Fetch and set streaming service details
                const streamingServicesResponse = await api.get(`/movie/${movieId}/watch/providers`);
                console.log(streamingServicesResponse.data.results);
                setStreamingServices(streamingServicesResponse.data.results);

                // Fetch and set movie release dates for rating
                const releaseDatesResponse = await api.get(`/movie/${movieId}/release_dates`);
                const releaseDatesData = releaseDatesResponse.data;

                // Extract the MPA rating for the US (if available)
                const usReleaseDates = releaseDatesData.results.find(r => r.iso_3166_1 === 'US');
                setAgeRating(usReleaseDates ? usReleaseDates.release_dates[0].certification : 'Rating not available');

                // Fetch cast and director details
                const creditsResponse = await api.get(`/movie/${movieId}/credits`);
                const castData = creditsResponse.data.cast;
                const directorData = creditsResponse.data.crew.find(crewMember => crewMember.job === 'Director');

                // Set state for cast (limited to 10 members) and director
                setCast(castData.slice(0, 10));
                setDirector(directorData ? directorData.name : 'N/A');

                // Fetch and set trailers and clips (limited to 2)
                const videosResponse = await api.get(`/movie/${movieId}/videos`);
                setVideos(videosResponse.data.results.slice(0, 2)); // Here we slice the array to only get the first two videos

            } catch (error) {
                console.error('Error fetching details:', error);
            }
            // Fetch the trailers and clips
            const videosResponse = await api.get(`/movie/${movieId}/videos`);
            setVideos(videosResponse.data.results);
        };

        fetchMovieDetails();
    }, [movieId]); // Effect dependency on movieId

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                // Fetch the user's watchlist information
                const isMovieInList = user ? await isMovieInMyList(userEmail, movieId): false;

                // Set the state to reflect whether the movie is in the user's watchlist
                setAddedToWatchlist(isMovieInList);

                // Notify other tabs/windows about the change
                window.postMessage({ type: 'watchlistUpdated', movieId, isMovieInList }, '*');

            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        fetchMovieDetails();
    }, [movieId, userEmail, user]); // Effect dependency on movieId and userEmail

    const fetchUserInfo = async () => {
        try {
            const response = await fetch('https://9acdf5s7k2.execute-api.us-west-2.amazonaws.com/dev/getUserInfo', {
                method: 'POST',
                body: JSON.stringify({ email: userEmail }), // Replace userEmail with the actual email
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const userInfo = await response.json();
                // Update state based on the fetched user information
                setAddedToWatchlist(userInfo.watchlist.includes(movieId));
            } else {
                console.error('Failed to fetch user information:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching user information:', error.message);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, [userEmail, movieId]); // Call fetchUserInfo when userEmail or movieId changes



    const handleAddToMyList = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://9acdf5s7k2.execute-api.us-west-2.amazonaws.com/dev/addMovieToMyList', {
                method: 'POST',
                body: JSON.stringify({
                    username: userEmail,
                    movieId: movieId,
                }),
            });

            if (response.ok) {
                console.log('Movie added to My List successfully!');
                console.log('Before setting addedToWatchlist:', addedToWatchlist);
                setAddedToWatchlist(true); // Set the state to indicate that the movie has been added
                localStorage.setItem('watchlist', JSON.stringify([...(JSON.parse(localStorage.getItem('watchlist')) || []), movieId]));
                console.log('After setting addedToWatchlist:', addedToWatchlist);
            } else {
                console.error('Failed to add movie to My List:', response.status, response.statusText);
            }
            // Notify other tabs/windows about the change
            window.postMessage({ type: 'watchlistUpdated', movieId, isMovieInList: true }, '*');
        } catch (error) {
            console.error('Error adding movie to My List:', error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleAddToSuggestionsList = async () => {
        try {
            setLoading(true);
            const response = await fetch(' https://9acdf5s7k2.execute-api.us-west-2.amazonaws.com/dev/addMoviesToFriendsSuggestionsList', {
                method: 'POST',
                body: JSON.stringify({
                    username: user.email,
                    friendUsername: friendEmail,
                    movieId: movieId,
                }),
            });

            if (response.ok) {
                console.log('Movie added to' + friendEmail + 'Suggestions List successfully!');
            } else {
                console.error('Failed to add movie to Suggestions List:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error adding movie to Suggestions List:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const isMovieInMyList = async (userEmail, movieId) => {
        try {
            // Fetch the user's watchlist information from local storage
            const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
            // Check if the current movie is in the user's watchlist
            const isMovieInList = watchlist.includes(movieId);
            return isMovieInList;
        } catch (error) {
            console.error('Error fetching my list:', error.message);
            return false;
        }
    };

    useEffect(() => {
        isMovieInMyList(userEmail, movieId);
    }, []);

    // Call fetchUserInfo when the component mounts
    useEffect(() => {
        fetchUserInfo();
    }, []); // Call fetchUserInfo on component mount



    // Render loading text if data is not yet loaded
    if (!movie || cast.length === 0 || !director) {
        return <div>Loading...</div>;
    }
    // Calculating average rating of movie, setting it 'N/A' if avg rating is < 0
    rating = movie.vote_average && movie.vote_average >= 1 ? movie.vote_average.toFixed(1) : 'N/A'

    // Formatted data for display
    // const formattedRating = movie.vote_average.toFixed(1);
    const formattedReleaseYear = new Date(movie.release_date).getFullYear();
    const formattedRuntime = movie.runtime;
    const formattedGenres = movie.genres.map((genre) => genre.name).join(', ');
    const formattedCastNames = cast.map((actor) => actor.name).join(', ');

    const handleButtonClick = async () => {
        try {
            if (addedToWatchlist) {
                // Handle the case where the movie is already in the watchlist
                console.log('Movie is already in the watchlist');
            } else {
                // Handle the case where the movie is not in the watchlist
                await handleAddToMyList();
            }
        } catch (error) {
            console.error('Error handling button click:', error);
        }
    };


    // Main return statement for rendering the detail page
    return (
        <div className="detail-page-layout">
            <div className="detail-page-wrapper"
                 style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}}>
                <div className="detail-movie-overlay"/>
                <div className="detail-movie-container">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}
                         className="detail-movie-poster"/>
                    <h1 className="detail-movie-title">{movie.title}</h1>
                    <div className="detail-movie-info">
                        <div className="detail-user-rating-box">
                            <img src={starImage} alt="Star" className="detail-user-rating-star"/>
                            <span>{rating}</span>
                        </div>
                        <span className="detail-year">{formattedReleaseYear}</span>
                        <span className="detail-movie-runtime">{formattedRuntime} min</span>
                        <span className="detail-movie-MPArating">{ageRating}</span>
                    </div>
                    <div className="detail-movie-genre-list">
                        {formattedGenres}
                    </div>
                    <p className="detail-movie-overview">{movie.overview}</p>
                    <div className="detail-movie-cast">
                        <span className="detail-cast-title">Starring : </span>
                        {formattedCastNames}
                    </div>
                    <div className="detail-movie-director">
                        <span className="detail-cast-title">Director : </span>
                        <span>{director}</span>
                    </div>
                    <div className="button-container">
                        <Link to="/Homepage" className="generic-button button-back">Back</Link>
                        <button
                            className={`generic-button button-watchlist ${addedToWatchlist ? 'added-to-watchlist' : ''}`}
                            onClick={handleButtonClick}
                            disabled={addedToWatchlist}
                        >
                            {addedToWatchlist ? 'Added to Watchlist' : 'Add to Watchlist'}
                        </button>
                        <div className="add-to-friendList-field">
                            <input
                                type="text"
                                placeholder="  Friend's Email"
                                value={friendEmail}
                                onChange={(e) => setFriendEmail(e.target.value)}
                                className={"add-friend-input"}
                            />
                            <button onClick={handleAddToSuggestionsList} className="generic-button button-add-friend-suggestions-list">
                                Add to Friend's Watchlist
                            </button>
                        </div>
                        {/*<button className="generic-button button-friends-watchlist" onClick={handleAddToSuggestionsList}>Add to Friend's Watchlist</button>*/}
                    </div>
                    <div className="watch-on-services">
                        <h2>Available on:</h2>
                        <div className="services-container">
                            {streamingServices && streamingServices.US && streamingServices.US.flatrate && streamingServices.US.flatrate.map((service) => (
                                <div key={service.provider_id} className="service">
                                    <img src={`https://image.tmdb.org/t/p/w500${service.logo_path}`}
                                         alt={service.provider_name}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="trailers-and-clips">
                        <h2>Trailers and Clips</h2>
                        <div className="videos">
                            {videos.slice(0, 2).map((video) => (
                                <iframe
                                    key={video.id}
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title={video.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="video-iframe"
                                ></iframe>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DetailPage;
