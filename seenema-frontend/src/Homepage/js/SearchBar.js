import React from 'react';
import {Form, FormControl} from 'react-bootstrap';

const SearchBar = ({onSearch}) => {
    const handleSearchEnter = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value.trim() === "") {
                const value = "";
                onSearch(value, false);
            } else {
                e.preventDefault();
                const value = e.target.value.trim(); // Trim leading/trailing spaces
                onSearch(value, true); // Trigger the search only when Enter is pressed
            }
        }
    };

    const handleSearchChange = (e) => {
        if (e.target.value.trim() === "") {
            const value = "";
            onSearch(value);
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
            </Form>
        </div>
    );
};

export default SearchBar;
