import React, {useState} from 'react';
import Header from './Header';
import MovieList from "./MovieList";
import "../css/Homepage.css"
import "../../App.css"
import Sidebar from "./Sidebar";

// Defining homepage component as a functional component
function Homepage() {
    const [searchValue, setSearchValue] = useState('');
    const [headerHeight, setHeaderHeight] = useState(0);

    const handleSearchChange = (value) => {
        setSearchValue(value);
    }
    return (
        <div className="home-layout" style={{'--headerHeight': `${headerHeight}px`}}>
            {/*Header Component */}
            <div><Header onChange={handleSearchChange} onHeightChange={setHeaderHeight}/>
            </div>
            <div className="homepage-main-content">
                {/* Sidebar */}
                <div className="homepage-sidebar">
                    <Sidebar/>
                </div>
                <div className="main-content-area">
                    {/* Rendering MovieList component */}
                    <MovieList searchValue={searchValue}/>
                </div>

            </div>
        </div>
    );
}

export default Homepage;
