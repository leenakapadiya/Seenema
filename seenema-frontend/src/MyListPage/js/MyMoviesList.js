import React, {useEffect, useState} from 'react';
import api from '../../Homepage/js/api';
import MovieCard from '../../Homepage/js/MovieCard';
import "../css/MyMovieList.css"

// Component representing the list of movies in the user's collection
const MyMoviesList = ({moviesList}) => {
    // State to store the details of movies in the user's collection
    const [myListMovies, setMyListMovies] = useState([]);

    // Effect hook to fetch movie details for each movie ID in the user's collection
    useEffect(() => {
        // Function to fetch movie details for each movie ID in the user's collection
        const fetchMyListMovies = async () => {
            try {
                // Use Promise.all to concurrently fetch details for all movies
                const moviesData = await Promise.all(
                    moviesList.map(async (movieId) => {
                        try {
                            // Fetch movie details using the API
                            const response = await api.get(`movie/${movieId}`);
                            return response.data;
                        } catch (error) {
                            // Log an error if fetching details for a movie fails
                            console.error(`Failed to fetch movie details for ID ${movieId}:`, error);
                            return null; // Return null for failed requests
                        }
                    })
                );
                // Set the state with non-null movie details (remove failed requests)
                setMyListMovies(moviesData.filter((movie) => movie !== null)); // Remove null entries
            } catch (error) {
                // Log an error if fetching movies fails
                console.error('Failed to fetch movies:', error);
            }
        };
        // Invoke the fetchMyListMovies function when the moviesList prop changes
        fetchMyListMovies();
    }, [moviesList]);

    // Render the MyMoviesList component
    return (
        <div>
            <div className="Cards">
                <div style={{width: '100%', overflow: 'auto', display: 'flex'}}>
                    <div className="movie-container-mylist">
                        {myListMovies.map((movie) => (
                            <MovieCard key={movie?.id} movie={movie}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyMoviesList;
