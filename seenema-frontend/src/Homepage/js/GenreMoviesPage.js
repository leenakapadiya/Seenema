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
            var page = 1;
            var num_movies = 0;
            const {data} = await api.get(`/search/movie`, {
                params: {
                    query: searchTerm,
                    page: page
                }
            });
            var searchResults = data.results;
            console.log(data)
            var length = searchResults.length;
            var result = [];
            console.log(data.total_pages)
            while(page <= data.total_pages && num_movies <= 20){
                const {data} = await api.get(`/search/movie`, {
                    params: {
                        query: searchTerm,
                        page: page
                    }
                });
                page++;
                searchResults = data.results;
                for(var i = 0; i < searchResults.length; i++){
                    const genre_ids = searchResults[i].genre_ids;
                    const movieIsInGenre = genre_ids.some(genre_id => genre_id == genreId)
                    console.log(movieIsInGenre)
                    if(movieIsInGenre){
                        console.log(num_movies);
                        num_movies++;
                        result = result.concat(searchResults[i]);
                    }
                }
            }
            setMovies(result.splice(0, 20))
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
            <div><Header onSearch={handleSearchChange}/></div>
            <div className="homepage-main-content">
                <div className="homepage-sidebar">
                    <Sidebar activeGenreId={parseInt(genreId)}/>
                </div>
                <div className="main-content-area-GenrePage">
                    {(isSearchActive) && (movies.length == 0) ? (
                        <>
                            <h2 className="genre-heading-GenreMoviePage">{'No ' + genreName + ' Movies Found'}</h2>
                            <div className="movie-grid-genre-page">
                                {movies.map(movie => (
                                    <MovieCard key={movie.id} movie={movie}/>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                        <h2 className="genre-heading-GenreMoviePage">{'All ' + genreName + ' Movies'}</h2>
                        <div className="movie-grid-genre-page">
                            {movies.map(movie => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </div>
                        </>
                    )}
                   
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
