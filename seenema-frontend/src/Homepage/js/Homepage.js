import React, { useState } from 'react';
import Header from './Header';
import MovieList from "./MovieList";
import "../css/Homepage.css"
import "../../App.css"
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from 'react-router-dom';

// Defining homepage component as a functional component
function Homepage() {
    const [searchValue, setSearchValue] = useState('');
    const [showSearchFlag, setShowSearchFlag] = useState(false);
    const searchTerm = useParams();
    const navigate = useNavigate();

    const handleSearchChange = (showSearch) => {
        console.log(searchTerm.searchTerm)
        if(searchTerm !== undefined){
            setSearchValue(searchTerm);
            setShowSearchFlag(true);
            console.log(searchValue);
        }
        else  {
            setSearchValue();
        }
        setShowSearchFlag(showSearch);
    }

    const handleOnGenreChange = (selectedGenre) => {
        navigate(`/genre/${selectedGenre}`);
        setSearchValue("");
    }
    
    return (
        <div className="home-layout">
            {/*Header Component */}
            <div><Header onSearch={handleSearchChange} isGenre={false} /></div>
            <div className="homepage-main-content">
                {/* Sidebar */}
                <div className="homepage-sidebar">
                    <Sidebar onGenreChange={handleOnGenreChange}/>
                </div>
                <div className="main-content-area">
                    {/* Rendering MovieList component */}
                    <MovieList />
                </div>
            </div>
        </div>
    );
}

export default Homepage;