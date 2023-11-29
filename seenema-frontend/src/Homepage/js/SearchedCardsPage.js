import React from "react";
import "../css/SearchedCardsPage.css";
import MovieCard from "./MovieCard";

const SearchedCardsPage = ({movies}) => { // Accept movies as props
    return (
        <div className="movie-container-searched">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    );
};


export default SearchedCardsPage;