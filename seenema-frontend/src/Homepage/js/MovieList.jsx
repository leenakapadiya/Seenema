import { useEffect, useState } from "react"
import axios from "axios";
import CardRow from "./CardRow"
import api from "./api"
import '../css/MovieList.css'

const MovieList = () => {
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

    useEffect(() => {


        const fetchTopRatedMovies = async () => {
            try {
                const { data } = await api.get("movie/top_rated");
                setTopRatedMovies(data.results);
            } catch (error) {
                console.error('Failed to fetch top rated movies:', error);
            }
        };

        const fetchUpcomingMovies = async () => {
            try {
                const { data } = await api.get("movie/upcoming");
                setUpcomingMovies(data.results);
            } catch (error) {
                console.error('Failed to fetch upcoming movies:', error);
            }
        };

        const fetchPopularMovies = async () => {
            try {
                const { data } = await api.get("movie/popular");
                setPopularMovies(data.results);
            } catch (error) {
                console.error('Failed to fetch popular movies:', error);
            }
        };

        const fetchNowPlayingMovies = async () => {
            try {
                const { data } = await api.get("movie/now_playing");
                setNowPlayingMovies(data.results);
            } catch (error) {
                console.error('Failed to fetch now playing movies:', error);
            }
        };


        fetchTopRatedMovies();
        fetchUpcomingMovies();
        fetchPopularMovies();
        fetchNowPlayingMovies()

    }, []);

    return (
        <div>
            <h2 className="header-home">Now Playing</h2>
            <CardRow movies={nowPlayingMovies} />
            <h2 className="header-home">Top Rated Movies</h2>
            <CardRow movies={topRatedMovies} />
            <h2 className="header-home">Upcoming Movies</h2>
            <CardRow movies={upcomingMovies} />
            <h2 className="header-home">Popular Movies</h2>
            <CardRow movies={popularMovies} />
        </div>
    );
};

export default MovieList;
