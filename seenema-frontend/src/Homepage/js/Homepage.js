import React from 'react';
import Header from './Header';
import MovieList from "./MovieList";
import "../css/Homepage.css"
import "../../App.css"

// Defining homepage component as a functional component
function Homepage() {
    return (
        <div className="home">
            {/* Rendering Header component */}
            <Header/>

            {/* Rendering MovieList component */}
            <MovieList/>
        </div>
    );
}

export default Homepage;
