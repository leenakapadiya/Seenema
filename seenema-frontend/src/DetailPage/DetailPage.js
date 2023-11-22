import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import api from '../Homepage/js/api'; // Adjust the import path to your api.js
import './DetailPage.css';
import starImage from '../assets/Star.png';
import {AuthContext} from "../Auth/JavaScript/AuthContext";


const DetailPage = () => {
    const {movieId} = useParams();
    const { user } = useContext(AuthContext);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAddedToMyList, setIsAddedToMyList] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await api.get(`/movie/${movieId}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovie();
    }, [movieId]);

    const handleAddToMyList = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://9acdf5s7k2.execute-api.us-west-2.amazonaws.com/dev/addMovieToMyList', {
                method: 'POST',
                body: JSON.stringify({
                    username: user.email,
                    movieId: movieId,
                }),
            });

            if (response.ok) {
                console.log('Movie added to My List successfully!');
            } else {
                console.error('Failed to add movie to My List:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error adding movie to My List:', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!movie) {
        return <div>Loading...</div>;
    }
    // Calculating average rating of movie, setting it 'N/A' if avg rating is < 0
    const rating = movie.vote_average && movie.vote_average >= 1 ? movie.vote_average.toFixed(1) : 'N/A';

    // Render movie details
    return (
        <div>
            {/*<NavigationBar/> /!* Include the NavigationBar at the top *!/*/}
            <div className="detail-movie-container">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}
                     className="detail-movie-poster"/>
                <h1 className="detail-movie-title">{movie.title}</h1>
                <div className="detail-movie-info">
                    <img src={starImage} alt="Star" className="detail-star-icon"/>
                    <span className="detail-rating">{rating}</span>
                    <span className="detail-year">{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <p className="detail-movie-overview">{movie.overview}</p>
                <button onClick={handleAddToMyList} className="button-auth-detail">
                    Add to My List
                </button>
                <button style={{marginTop: "30px", marginBottom: "20px"}} className="button-auth-detail"><Link
                    to="/Homepage"
                    style={{color: 'inherit'}}>Back</Link></button>
                {/* Add more details as needed */}
            </div>
        </div>
    );
};

export default DetailPage;