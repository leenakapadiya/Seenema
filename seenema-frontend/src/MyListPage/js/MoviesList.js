import React, {useEffect, useState} from 'react';
import api from '../../Homepage/js/api';
import MovieCard from '../../Homepage/js/MovieCard';
import "../css/MovieList.css"

const MoviesList = ({moviesList}) => {
    const [myListMovies, setMyListMovies] = useState([]);

    useEffect(() => {
        const fetchMyListMovies = async () => {
            try {
                const moviesData = await Promise.all(
                    moviesList.map(async (movieId) => {
                        try {
                            const response = await api.get(`movie/${movieId}`);
                            return response.data;
                        } catch (error) {
                            console.error(`Failed to fetch movie details for ID ${movieId}:`, error);
                            return null; // Return null for failed requests
                        }
                    })
                );

                console.log('moviesData:', moviesData);

                setMyListMovies(moviesData.filter((movie) => movie !== null)); // Remove null entries
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            }
        };

        fetchMyListMovies();
    }, [moviesList]);

    console.log('myListMovies:', myListMovies);

    return (
        <div>
            <div className="Cards">
                <div style={{width: '100%', overflow: 'auto', display: 'flex'}}>
                    <div className="movie-container-searched">
                        {myListMovies.map((movie) => (
                            <MovieCard key={movie?.id} movie={movie}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviesList;
