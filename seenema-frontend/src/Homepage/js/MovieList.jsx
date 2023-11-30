import React, {useEffect, useState} from "react"
import CardRow from "./CardRow"
import api from "./api"
import '../css/MovieList.css'
import SearchedCardsPage from "./SearchedCardsPage"
import Lottie from "lottie-react";
import NoResultsFound from "../../assets/NoResultsFound.json";
import MovieCard from "./MovieCard"
import Success from "../../assets/Success.json";
import { useParams } from "react-router-dom"

const MovieList = () => {
    // State Variables for different categories of the movies.
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([])
    const searchTerm = useParams();

    // useEffect to fetch movie data
    useEffect(() => {
        // Async func to fetch the searched movies
        const fetchSearchMovies = async () => {
            if((searchTerm.searchTerm !== undefined)){
                console.log("here");
                const title = searchTerm.searchTerm;
                try {
                    const {data} = await api.get("search/movie", {
                        params: {
                            query: title,
                            page: 1
                        },
                    })
                    setSearchResults(data.results);
                } catch (error) {
                    console.error('Failed to fetch the searched movie:', error);
                }
            }
        }

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

        fetchSearchMovies();
        fetchTopRatedMovies();
        fetchUpcomingMovies();
        fetchPopularMovies();
        fetchNowPlayingMovies();
    }, [searchTerm.searchTerm]);

    // Rendering the component with movie data
    return (
        <div>
            {(searchResults.length > 0) && (searchTerm.searchTerm !== undefined)  ? (
                <>
                    <h2 className="header-home">Search Results</h2>
                    <div className="movie-grid-search">
                       {searchResults.map(movie => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </div>
                </>
            ) : (searchTerm.searchTerm === undefined) ? (
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
            ) : (searchResults.length === 0) ? (
                <>
                    <h2 className="header-home">No Results Found </h2>
                    <div style={{width: "70%", paddingLeft: "30%", paddingTop: "10%"}}>
                        <Lottie loop={true} animationData={NoResultsFound}/>
                    </div>
                    <SearchedCardsPage movies={searchResults}/>
                </>
            ) : (

                <>
                    <h2 className="header-home">Search Results </h2>
                    <div className="movie-grid-search">
                       {searchResults.map(movie => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </div>
                </>
            )
            }
        </div>
    );
};

export default MovieList;
