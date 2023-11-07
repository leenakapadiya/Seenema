import React from 'react';
import Header from './Header';
import MovieList from "./MovieList";
import "../css/Homepage.css"


function App() {
    return (
        <div className="App">
            <Header />

            <MovieList />

        </div>
    );
}

export default App;
