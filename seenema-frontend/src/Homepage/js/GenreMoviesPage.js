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
    const [isSearchActive, setIsSearchActive] = useState(false);

    const searchMoviesByGenreAndName = useCallback(async (searchTerm) => {
        setLoading(true);
        try {
            const response = await api.get(`/search/movie`, {
                params: {
                    query: searchTerm,
                    with_genres: genreId // This should ensure that the search is constrained to the selected genre
                }
            });
            // If necessary, further filter the results to ensure they belong to the selected genre
            const filteredResults = response.data.results.filter(movie => movie.genre_ids.includes(parseInt(genreId)));
            setMovies(filteredResults);
            setLoading(false);
        } catch (error) {
            console.error('Error searching movies:', error);
            setLoading(false);
        }
    }, [genreId]);


    const fetchMoviesByGenre = useCallback(async (page) => {
        setLoading(true);
        try {
            const response = await api.get(`/discover/movie`, {
                params: {
                    with_genres: genreId,
                    page: page
                }
            });
            if (page === 1) {
                setMovies(response.data.results.slice(0, 20));
            } else {
                setMovies(prev => [...prev, ...response.data.results]);
            }
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
        if (value.trim() !== '') {
            searchMoviesByGenreAndName(value);
            setIsSearchActive(true);
        } else {
            fetchMoviesByGenre(currentPage); // fetch current page of genre when search is cleared
            setIsSearchActive(false);
        }
    };

    return (
        <div className="home-layout">
            <div><Header onChange={handleSearchChange}/></div>
            <div className="homepage-main-content">
                <div className="homepage-sidebar">
                    <Sidebar activeGenreId={parseInt(genreId)}/>
                </div>
                <div className="main-content-area-GenrePage">
                    <h2 className="genre-heading-GenreMoviePage">{'All ' + genreName + ' Movies'}</h2>
                    <div className="movie-grid-genre-page">
                        {movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </div>
                    {!loading && !isSearchActive && (
                        <div className="load-more-container-genre-page">
                            <button onClick={handleLoadMore} className="load-more-button-genre-page">
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
