import React, {useEffect, useState} from "react"
import CardRow from "./CardRow"
import api from "./api"
import '../css/MovieList.css'
import MovieCard from "./MovieCard"
import Lottie from "lottie-react";
import NoResultsFound from "../../assets/NoResultsFound.json";
import Success from "../../assets/Success.json";

const MovieList = (searchValue) => {
    // State Variables for different categories of the movies.
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [isFull, setIsFull] = useState(false);

    // useEffect to fetch movie data
    // Async func to fetch the searched movies
    const fetchSearchMovies = async (searchValue, page) => {
        const title = searchValue.searchValue;

        try {
            const {data} = await api.get("search/movie", {
                params: {
                    query: title,
                    page: page
                },
            })
            if(data.results.length < 20){
                setIsFull(true);
            }
            if (page === 1) {
                setSearchResults(data.results);
            } else {
                setSearchResults(prev => [...prev, ...data.results]);
            }console.log(data)
        } catch (error) {
            console.error('Failed to fetch the searched movie:', error);
        }
    }
    useEffect(() => {

        // Async func to fetch top-rated movies
        const fetchTopRatedMovies = async () => {
            try {
                const {data} = await api.get("movie/top_rated");
                setTopRatedMovies(data.results);
            } catch (error) {
                console.error('Failed to fetch top rated movies:', error);
            }
        };

        // Async func to fetch upcoming movies
        const fetchUpcomingMovies = async () => {
            try {
                const {data} = await api.get("movie/upcoming");
                setUpcomingMovies(data.results);
            } catch (error) {
                console.error('Failed to fetch upcoming movies:', error);
            }
        };

        // Async func to fetch Popular movies
        const fetchPopularMovies = async () => {
            try {
                const {data} = await api.get("movie/popular");
                setPopularMovies(data.results);
            } catch (error) {
                console.error('Failed to fetch popular movies:', error);
            }
        };

        // Async func to fetch now playing movies
        const fetchNowPlayingMovies = async () => {
            try {
                const {data} = await api.get("movie/now_playing");
                setNowPlayingMovies(data.results);
            } catch (error) {
                console.error('Failed to fetch now playing movies:', error);
            }
        };

        if (searchValue !== '') {
            fetchSearchMovies(searchValue, currentPage);
        }
        fetchTopRatedMovies();
        fetchUpcomingMovies();
        fetchPopularMovies();
        fetchNowPlayingMovies();
    }, [searchValue]);

    const handleLoadMore = () => {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        fetchSearchMovies(searchValue, newPage);
    }
    // Rendering the component with movie data
    return (
        <>
            {(searchResults.length > 0) && (searchValue.searchValue !== '') && (!isFull)? (
                <>
                    <h2 className="search-header">Search Results</h2>
                    <div className="movie-grid-search">
                       {searchResults.map(movie => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </div>
                    <div className="load-more-container-movie-page">
                        <button onClick={handleLoadMore} className="generic-button-load-more-movie button-load-more-search">
                            Load More
                        </button>
                    </div>
                </>
            ) : (searchValue.searchValue === "") ? (
                <>
                    <h2 className="header-home">Now Playing</h2>
                    <CardRow movies={nowPlayingMovies}/>
                    <h2 className="header-home">Top Rated Movies</h2>
                    <CardRow movies={topRatedMovies}/>
                    <h2 className="header-home">Upcoming Movies</h2>
                    <CardRow movies={upcomingMovies}/>
                    <h2 className="header-home">Popular Movies</h2>
                    <CardRow movies={popularMovies}/>`
                </>
            ) : (searchResults.length === 0 && searchValue.searchValue !== '') ? (
                <>
                    <h2 className="header-home">No Results Found </h2>
                    <div style={{width: "70%", paddingLeft: "30%", paddingTop: "10%"}}>
                        <Lottie loop={true} animationData={NoResultsFound}/>
                    </div>
                </>
            ) : (
                <>
                <h2 className="search-header">Search Results</h2>
                    <div className="movie-grid-search">
                       {searchResults.map(movie => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </div>
                </>
            ) 
        }
        </>
    );
};

export default MovieList;
