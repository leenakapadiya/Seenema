import { Paper } from "@material-ui/core";
import React from "react";
import "../css/MovieCard.css";
import starImage from '../../assets/Star.png';

const MovieCard = ({ movie }) => {
    const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '';
    const rating = movie.vote_average && movie.vote_average >= 1 ? movie.vote_average.toFixed(1) : 'N/A';
    const releaseFullDate = movie.release_date;
    const year = releaseFullDate.substring(0,4);
    return (
        <div className="container">
            <Paper className="card" style={{ backgroundImage: `url(${posterPath})` }} />
            <div className="card-name">{movie.title}</div>
            <div className="card-rating">
                {<img src={starImage} alt="Star" className="star-icon" />}
                <span className="rating">{rating}</span>
                <div className="year">{year}</div>
            </div>
        </div>
    );
};

export default MovieCard;
