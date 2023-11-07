import React from 'react';
import Header from './Header';
import MovieList from "./MovieList";
import "../css/Homepage.css"


function Homepage() {
    return (
        <div className="home">
            <Header />
            <MovieList />
        </div>
    );
}

export default Homepage;
