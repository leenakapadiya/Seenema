import React, {useState} from 'react';
import Header from './Header';
import MovieList from "./MovieList";
import "../css/Homepage.css"
import "../../App.css"
import { useScrollTrigger } from '@material-ui/core';

// Defining homepage component as a functional component
function Homepage() {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (value) => {
        setSearchValue(value);
    }
    return (
        <div className="home">
            {/* Rendering Header component */}
            <Header onChange={handleSearchChange}/>
              
            {/* Rendering MovieList component */}
            <MovieList searchValue={searchValue}/>
        </div>
    );
}

export default Homepage;
