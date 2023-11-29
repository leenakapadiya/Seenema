import React, {useState} from 'react';
import {Form, FormControl, Button} from 'react-bootstrap';
import {X} from 'react-bootstrap-icons'

const SearchBar = ({onSearch}) => {
    const [searchValue, setSearchValue] = useState("")
    const handleSearchEnter = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value.trim() === "") {
                const value = "";
                onSearch(value, false);
            } else {
                e.preventDefault();
                const value = e.target.value.trim(); // Trim leading/trailing spaces
                setSearchValue(value)
                onSearch(value, true); // Trigger the search only when Enter is pressed
            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value.trim())
        if (e.target.value.trim() === "") {
            const value = "";
            onSearch(value);
        }
    }

    const clearSearch = () => {
        onSearch("")
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
                    <Button variant="light" onClick={clearSearch} style={{ border: 'none', backgroundColor: 'transparent' }}>
                        <X size={20} />
                    </Button>
                )}
            </Form>
        </div>
    );
};

export default SearchBar;
