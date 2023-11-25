import React, {useEffect, useState} from 'react';
import api from '../../Homepage/js/api';
import MovieCard from '../../Homepage/js/MovieCard';

const ListOfMovies = ({moviesList}) => {
    const [suggestedMoviesListMovies, setSuggestedMoviesListMovies] = useState([]);

    useEffect(() => {
        const fetchMySuggestionListMovies = async () => {
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

                setSuggestedMoviesListMovies(moviesData.filter((movie) => movie !== null)); // Remove null entries
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            }
        };

        fetchMySuggestionListMovies();
    }, [moviesList]);

    console.log('SuggestionListMovies:', suggestedMoviesListMovies);

    return (
        <div>
            <div className="Cards">
                <div style={{width: '100%', overflow: 'auto', display: 'flex'}}>
                    <div className="movie-container-searched">
                        {suggestedMoviesListMovies.map((movie) => (
                            <MovieCard key={movie?.id} movie={movie}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListOfMovies;
