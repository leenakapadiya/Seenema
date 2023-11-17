import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const handleSearchChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value.trim(); // Trim leading/trailing spaces
      if (value !== '') {
        onSearch(value); // Trigger the search only when Enter is pressed
      }
    }
  };

  return (
    <div className="search-bar-home">
      <Form className="d-flex ms-auto me-3 search-bar-home">
        <FormControl
          type="search"
          placeholder="Search any movies..."
          className="me-2 search-input"
          aria-label="Search"
          style={{ backgroundColor: '#313036', color: 'white', border: 'none' }}
          onKeyDown={handleSearchChange} // Listen for keydown event
        />
      </Form>
    </div>
  );
};

export default SearchBar;
