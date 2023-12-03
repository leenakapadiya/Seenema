import React, {useState} from 'react';
import {Form, FormControl, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
                if(isGenre){
                    navigate(`/genre/${genreId}/${value}`)
                }
                else{
                    navigate(`/search/${value}`);
                }
                onSearch(value, true); // Trigger the search only when Enter is pressed
                setSearchValue(value);

            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value.trim())
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
                />
                {searchValue && (
                    <Button type="button" className="clear-search-button" onClick={clearSearch}
                            style={{backgroundColor: '#313036', border: 'none', color: 'white'}}>
                        X
                    </Button>
                )}
            </Form>
        </div>
    );
};

export default SearchBar;
