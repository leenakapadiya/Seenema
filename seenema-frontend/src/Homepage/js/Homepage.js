import React, {useState} from 'react';
import Header from './Header';
import MovieList from "./MovieList";
import "../css/Homepage.css"
import "../../App.css"

// Defining homepage component as a functional component
function Homepage() {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (value) => {
        setSearchValue(value);
    }
    return (
        <div className="home">
            {/* Rendering Header component */}
            <Header onSearch={handleSearchChange}/>
              
            {/* Rendering MovieList component */}
            <MovieList searchValue={searchValue}/>
        </div>
    );
}

export default Homepage;
