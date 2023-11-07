import React from "react";
import "../css/CardRow.css";
import { Paper } from "@material-ui/core";
import MovieCard from "./MovieCard";

const CardRow = ({ movies }) => { // Accept movies as props
    return (
        <div>
                <div className="Cards">
                    <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
                        <div className="movie-container">
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </div>
                </div>
        </div>


    );
};


export default CardRow;
