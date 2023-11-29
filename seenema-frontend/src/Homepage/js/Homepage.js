import React, { useState } from 'react';
import Header from './Header';
import MovieList from "./MovieList";
import "../css/Homepage.css"
import "../../App.css"
import Sidebar from "./Sidebar";

// Defining homepage component as a functional component
function Homepage() {
    const [searchValue, setSearchValue] = useState('');
    const [showSearchFlag, setShowSearchFlag] = useState(false);

    const handleSearchChange = (value, showSearch) => {
        if (value !== undefined) {
            setSearchValue(value);
        }
        setShowSearchFlag(showSearch);
    }

    return (
        <div className="home-layout">
            {/*Header Component */}
            <div><Header onSearch={handleSearchChange} /></div>
            <div className="homepage-main-content">
                {/* Sidebar */}
                <div className="homepage-sidebar">
                    <Sidebar />
                </div>
                <div className="main-content-area">
                    {/* Rendering MovieList component */}
                    <MovieList searchValue={searchValue} showSearchFlag={showSearchFlag} />
                </div>
            </div>
        </div>
    );
}

export default Homepage;