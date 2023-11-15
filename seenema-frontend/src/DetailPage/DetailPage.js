import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import api from '../Homepage/js/api'; // Adjust the import path to your api.js
import './DetailPage.css';
import NavigationBar from '../Homepage/js/Header'; // Import the Header component
import starImage from '../assets/Star.png';


const DetailPage = () => {
    const {movieId} = useParams();
    const [movie, setMovie] = useState(null);

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

    if (!movie) {
        return <div>Loading...</div>;
    }

    // Render movie details
    return (
        <div>
            <NavigationBar/> {/* Include the NavigationBar at the top */}
            <div className="detail-movie-container">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}
                     className="detail-movie-poster"/>
                <h1 className="detail-movie-title">{movie.title}</h1>
                <div className="detail-movie-info">
                    <img src={starImage} alt="Star" className="detail-star-icon"/>
                    <span className="detail-rating">{movie.vote_average}</span>
                    <span className="detail-year">{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <p className="detail-movie-overview">{movie.overview}</p>
                {/* Add more details as needed */}
            </div>
        </div>
    );
};

export default DetailPage;