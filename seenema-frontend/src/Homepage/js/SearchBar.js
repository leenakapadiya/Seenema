import React, {useState} from 'react';
import {Form, FormControl, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/searchBar.css';
import '../css/Header.css';

const SearchBar = ({onSearch, isGenre, genreId}) => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    
    const handleSearchEnter = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value.trim() === "") {
                const value = "";
                onSearch(value, false);
                if(isGenre){
                    navigate(`/genre/${genreId}`)
                }
                else{
                    navigate(`/Homepage`)
                }
            } else {
                e.preventDefault();
                const value = e.target.value.trim(); // Trim leading/trailing spaces
                const valueWithNoSpace = value.replace(" ", "-")

                if(isGenre){
                    navigate(`/genre/${genreId}/${valueWithNoSpace}`)
                }
                else{
                    navigate(`/search/${valueWithNoSpace}`);
                }
                onSearch(value, true); // Trigger the search only when Enter is pressed
                setSearchValue(value);

            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
        if (e.target.value.trim() === "") {
            const value = "";
            onSearch(value);
            if(isGenre){
                navigate(`/genre/${genreId}`)
            }
            else{
                navigate(`/Homepage`)
            }
        }
    }

    const clearSearch = () => {
        setSearchValue("")
        onSearch("")
        if(isGenre){
            navigate(`/genre/${genreId}`)
        }
        else{
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </Button>
                )}
            </Form>
        </div>
    );
};

export default SearchBar;
