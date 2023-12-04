import React, {useContext, useState} from 'react';
import {Navbar, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/SeenemaLogo.png';
import '../css/Header.css';
import {Link, NavLink} from "react-router-dom";
import '../../Auth/JavaScript/SignIn';
import SearchBar from './SearchBar';
import {AuthContext} from "../../Auth/JavaScript/AuthContext";
import {Button} from "@mui/material";


// NavigationBar component
const NavigationBar = ({onSearch, isGenre, genreId}) => {
    const {user} = useContext(AuthContext);

    const [dropdownOpen, setDropdownOpen] = useState(false); // Add state for dropdown

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleDropdownClose = () => {
        setDropdownOpen(false);
    };
    return (
        <div className="bg-navbar">
            <Navbar expand="lg">
                <Navbar.Brand>
                    <Link to="/">
                        <img
                            src={logo}
                            width="65"
                            height="65"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBar onSearch={onSearch} isGenre={isGenre} genreId={genreId}/>
                </Navbar.Collapse>
                    {user ? (
                        <NavDropdown title={
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor"
                                 className="bi bi-person header-dropdown" viewBox="0 0 16 16"
                                 onClick={handleDropdownToggle}>
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                        } id="nav-dropdown" align="end" onClick={handleDropdownClose}>
                            <LoggedInOptions/>
                        </NavDropdown>
                    ) : (
                        <NotLoggedOptions/>
                    )}
            </Navbar>
        </div>
    );
};

// Drop down options to show when user is not logged in
const NotLoggedOptions = () => {
    return (
        <div>
            <Button>
                <NavLink to="/signIn" className="generic-button-header button-header">
                    Sign In
                </NavLink>
            </Button>
            <Button className="navbar-button">
                <NavLink to="/signUp" className="generic-button-header button-header" style={{marginRight: "20px"}}>
                    Sign Up
                </NavLink>
            </Button>
        </div>
    );
};

// Drop down options to show when user is logged in
const LoggedInOptions = () => {
    return (
        <div>
            <NavDropdown.Item href={"/profile"}>
                Profile
            </NavDropdown.Item>
            <NavDropdown.Item href={"/myList"}>My List</NavDropdown.Item>
            <NavDropdown.Item href={"/suggestionsList"}>Friend Suggestions List</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href={"/signOut"}>
                Sign Out
            </NavDropdown.Item>
        </div>
    );
};
export default NavigationBar;
