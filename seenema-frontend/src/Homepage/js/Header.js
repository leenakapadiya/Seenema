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
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor  "
                                 className="bi bi-person-circle header-dropdown" viewBox="0 0 16 16"
                                 onClick={handleDropdownToggle}
                            style={{
                            }}>
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fillRule="evenodd"
                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
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
                {/*<NavLink to="/profile" style={{textDecoration: 'none', color: 'inherit'}}>Profile</NavLink>*/}
            </NavDropdown.Item>
            <NavDropdown.Item href={"/myList"}>My List</NavDropdown.Item>
            <NavDropdown.Item href={"/suggestionsList"}>Friend Suggestions List</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href={"/signOut"}>
                Sign Out
                {/*<NavLink to="/signOut" style={{textDecoration: 'none', color: 'inherit'}}>Sign Out</NavLink>*/}
            </NavDropdown.Item>
        </div>
    );
};
export default NavigationBar;
