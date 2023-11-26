import {Link} from 'react-router-dom';
import {Paper} from "@material-ui/core";
import React from "react";
import "../css/MovieCard.css";
import starImage from '../../assets/Star.png';

// MovieCard component, taking movie object as a prop
const MovieCard = ({movie}) => {
    // Creating URL for the movie poster
    const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '';

    // Calculating average rating of movie, setting it 'N/A' if avg rating is < 0
    const rating = movie.vote_average && movie.vote_average >= 1 ? movie.vote_average.toFixed(1) : 'N/A';

    // Extracting full release date of a movie
    const releaseFullDate = movie.release_date;

    // Extracting the release year of a movie
    const year = releaseFullDate ? releaseFullDate.substring(0, 4) : 'N/A';
    return (
        <Link to={`/movie/${movie.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="container">

                {/* Displaying movie poster as a background image */}
                <Paper className="card" style={{backgroundImage: `url(${posterPath})`}}/>

                {/* Displaying movie title */}
                <div className="card-name">{movie.title}</div>

                {/* Displaying movie rating with a star icon and release year */}
                <div className="card-rating">
                    {<img src={starImage} alt="Star" className="star-icon"/>}
                    <span className="rating">{rating}</span>
                    <div className="year">{year}</div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
