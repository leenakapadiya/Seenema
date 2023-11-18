import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import MovieCard from './MovieCard'; // Adjust the path as necessary
import api from './api';
import Header from "./Header";
import Sidebar from "./Sidebar";
import '../css/GenreMoviesPage.css';

const GenreMoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const {genreId} = useParams();
    const [searchValue, setSearchValue] = useState('');

    const fetchMoviesByGenre = useCallback(async (page) => {
        setLoading(true);
        try {
            const response = await api.get(`/discover/movie`, {
                params: {
                    with_genres: genreId,
                    page: page
                }
            });
            setMovies(prev => [...prev, ...response.data.results]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movies by genre:', error);
            setLoading(false);
        }
    }, [genreId]); // Add genreId as a dependency

    const fetchGenreName = useCallback(async () => {
        try {
            const response = await api.get('/genre/movie/list');
            const genre = response.data.genres.find(g => g.id.toString() === genreId);
            if (genre) setGenreName(genre.name);
        } catch (error) {
            console.error('Error fetching genre name:', error);
        }
    }, [genreId]); // Add genreId as a dependency

    useEffect(() => {
        setCurrentPage(1); // Reset page number on genre change
        setMovies([]); // Clear existing movies
        fetchMoviesByGenre(1); // Fetch first page of movies
        fetchGenreName();
    }, [genreId, fetchMoviesByGenre, fetchGenreName]);


    const handleLoadMore = () => {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        fetchMoviesByGenre(newPage);
    }

    const handleSearchChange = (value) => {
        setSearchValue(value);
    }

    return (
        <div className="home-layout">
            <div><Header onChange={handleSearchChange}/></div>
            <div className="homepage-main-content">
                <div className="homepage-sidebar">
                    <Sidebar activeGenreId={parseInt(genreId)}/>
                </div>
                <div className="main-content-area-GenrePage">
                    <h2 className="genre-heading-GenreMoviePage">{'All ' + genreName + ' Movies'}</h2>
                    <div className="movie-grid">
                        {movies.filter(movie => movie.title.toLowerCase().includes(searchValue.toLowerCase())).map(movie => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </div>
                    {!loading && (
                        <div className="load-more-container-genre-page">
                            <button onClick={handleLoadMore} className="load-more-button">
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GenreMoviesPage;
