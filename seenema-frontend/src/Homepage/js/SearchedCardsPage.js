import React from "react";
import "../css/SearchedCardsPage.css";
import MovieCard from "./MovieCard";

// SearchedCardsPage component. It takes 'movies' as a prop.
const SearchedCardsPage = ({movies}) => {
    return (
        <div>
            <div className="Cards">
                <div style={{width: "100%", overflow: "auto", display: "flex"}}>
                    <div className="movie-container-searched">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>


    );
};


export default SearchedCardsPage;