import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

/* accepts a function onChange as a parameter which sets SearchValue in Homepage.js*/
const SearchBar = ({onChange}) => {
  const handleSearchChange = (e) => {
    const value = e.target.value
    /* updates the searchValue to what the user typed in */
    onChange(value);
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
          onChange = {handleSearchChange}
        />
      </Form>
    </div>
  );
};

export default SearchBar;
