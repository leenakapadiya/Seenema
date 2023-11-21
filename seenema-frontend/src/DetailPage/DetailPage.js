import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../Homepage/js/api'; // API import for fetching movie details
import './DetailPage.css'; // Importing CSS for styling
import starImage from '../assets/Star.png'; // Star icon for rating display
import Header from '../Homepage/js/Header'; // Header component import

const DetailPage = () => {
    const {movieId} = useParams(); // Getting movie ID from URL params

    // State variables for storing movie data
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [director, setDirector] = useState('');
    const [rating, setRating] = useState('');
    const [videos, setVideos] = useState([]);
    const [streamingServices, setStreamingServices] = useState(null);

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
                const mpaRating = usReleaseDates ? usReleaseDates.release_dates[0].certification : 'Rating not available';
                setRating(mpaRating);

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

    // Render loading text if data is not yet loaded
    if (!movie || cast.length === 0 || !director) {
        return <div>Loading...</div>;
    }

    // Formatted data for display
    const formattedRating = movie.vote_average.toFixed(1);
    const formattedReleaseYear = new Date(movie.release_date).getFullYear();
    const formattedRuntime = movie.runtime;
    const formattedGenres = movie.genres.map((genre) => genre.name).join(', ');
    const formattedCastNames = cast.map((actor) => actor.name).join(', ');

    // Main return statement for rendering the detail page
    return (
        <div>
            <Header /> {/* Include the Header component */}
            <div className="detail-page-wrapper" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                <div className="detail-movie-overlay" />
                <div className="detail-movie-container">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="detail-movie-poster" />
                    <h1 className="detail-movie-title">{movie.title}</h1>
                    <div className="detail-movie-info">
                        <div className="detail-user-rating-box">
                            <img src={starImage} alt="Star" className="detail-user-rating-star" />
                            <span>{formattedRating}</span>
                        </div>
                        <span className="detail-year">{formattedReleaseYear}</span>
                        <span className="detail-movie-runtime">{formattedRuntime} min</span>
                        <span className="detail-movie-MPArating">{rating}</span>
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
                        <button className="generic-button button-watchlist">Add to Watchlist</button>
                        <button className="generic-button button-friends-watchlist">Add to Friend's Watchlist</button>
                    </div>
                    <div className="watch-on-services">
                        <h2>Available on:</h2>
                        <div className="services-container">
                            {streamingServices && streamingServices.US && streamingServices.US.flatrate && streamingServices.US.flatrate.map((service) => (
                                <div key={service.provider_id} className="service">
                                    <img src={`https://image.tmdb.org/t/p/w500${service.logo_path}`} alt={service.provider_name} />
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