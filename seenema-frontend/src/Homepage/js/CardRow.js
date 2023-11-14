import React from "react";
import "../css/CardRow.css";
import MovieCard from "./MovieCard";

// Defining a CardRow component
// CardRow takes movies as a prop from its parent component
const CardRow = ({movies}) => {
    return (
        <div>
            <div className="Cards">
                <div style={{width: "100%", overflow: "auto", display: "flex"}}>
                    <div className="movie-container">
                        {/* Map each of the movie in movies array to a MovieCard component */}
                        {movies.map((movie) => (
                            // Renders a movie card for each of the movie
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>


    );
};


export default CardRow;
