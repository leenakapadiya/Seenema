import React, {useState} from 'react';
import {Button, Form, FormControl} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import '../css/searchBar.css';
import '../css/Header.css';

// SearchBar component definition with props
const SearchBar = ({onSearch, isGenre, genreId}) => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    // Function to handle the Enter key event in the search bar
    const handleSearchEnter = (e) => {
        // Check if the key pressed is 'Enter'
        if (e.key === 'Enter') {
            // Check if the search input is empty
            if (e.target.value.trim() === "") {
                const value = "";
                onSearch(value, false);
                // Navigate based on the genre flag
                if (isGenre) {
                    navigate(`/genre/${genreId}`)
                } else {
                    navigate(`/Homepage`)
                }
            } else {
                e.preventDefault();
                // Trim and format the search input value
                const value = e.target.value.trim(); // Trim leading/trailing spaces
                const valueWithNoSpace = value.replace(" ", "-")

                // Conditional navigation based on genre
                if (isGenre) {
                    navigate(`/genre/${genreId}/${valueWithNoSpace}`)
                } else {
                    navigate(`/search/${valueWithNoSpace}`);
                }
                // Call the onSearch function with the formatted value
                onSearch(value, true);
                setSearchValue(value);

            }
        }
    };

    // Function to handle changes in the search input
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
        // Check and act if the search input is empty
        if (e.target.value.trim() === "") {
            const value = "";
            onSearch(value);
            if (isGenre) {
                navigate(`/genre/${genreId}`)
            } else {
                navigate(`/Homepage`)
            }
        }
    }

    // Function to handle changes in the search input
    const clearSearch = () => {
        setSearchValue("")
        onSearch("")
        // Conditional navigation based on genre
        if (isGenre) {
            navigate(`/genre/${genreId}`)
        } else {
            navigate(`/Homepage`)
        }
    }

    return (
        <div className="search-bar-home">
            <Form className="d-flex ms-auto me-3 search-bar-home">
                <FormControl
                    type="search"
                    placeholder="Search any movies..."
                    className="me-2 search-input"
                    aria-label="Search"
                    style={{backgroundColor: '#313036', color: 'white', border: 'none'}}
                    onKeyDown={handleSearchEnter}
                    onChange={handleSearchChange}
                    value={searchValue}
                />
                {searchValue && (
                    <Button type="button" className="clear-search-button" onClick={clearSearch}
                            style={{backgroundColor: '#313036'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path
                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </Button>
                )}
            </Form>
        </div>
    );
};

export default SearchBar;
