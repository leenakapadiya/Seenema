import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard'; // Adjust the path as necessary
import api from './api';
import Header from "./Header";
import Sidebar from "./Sidebar";
import '../css/GenreMoviesPage.css'
const GenreMoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');
    const { genreId } = useParams();

    const [searchValue, setSearchValue] = useState('');
    const filteredMovies = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchValue.toLowerCase());
    });


    useEffect(() => {
        // Fetch Movies by Genre
        const fetchMoviesByGenre = async () => {
            try {
                const response = await api.get(`/discover/movie`, {
                    params: {
                        with_genres: genreId
                    }
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies by genre:', error);
            }
        };

        // Fetch Genre Name
        const fetchGenreName = async () => {
            try {
                const response = await api.get('/genre/movie/list');
                const genre = response.data.genres.find(g => g.id.toString() === genreId);
                if (genre) setGenreName(genre.name);
            } catch (error) {
                console.error('Error fetching genre name:', error);
            }
        };

        fetchMoviesByGenre();
        fetchGenreName();
    }, [genreId]);

    const handleSearchChange = (value) => {
        setSearchValue(value);
    }
    return (
        <div className="home-layout">
            <div><Header onChange={handleSearchChange} /></div>
            <div className="homepage-main-content">
                <div className="homepage-sidebar">
                    <Sidebar activeGenreId={parseInt(genreId)} />
                </div>
                <div className="main-content-area-GenrePage">
                    <h2 className="genre-heading-GenreMoviePage">{'All ' + genreName + ' Movies'}</h2>
                    <div className ="movie-grid">
                        {filteredMovies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                        {/*{filteredMovies.length > 0 ? (*/}
                        {/*    filteredMovies.map(movie => (*/}
                        {/*        <MovieCard key={movie.id} movie={movie} />*/}
                        {/*    ))*/}
                        {/*) : (*/}
                        {/*    <p>No movies found matching your search criteria.</p>*/}
                        {/*)}*/}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenreMoviesPage;
