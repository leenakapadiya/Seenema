import React from "react";
import "../css/SearchedCardsPage.css";
import MovieCard from "./MovieCard";

const SearchedCardsPage = ({movies}) => { // Accept movies as props
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