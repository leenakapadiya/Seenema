import React, {useContext} from 'react';
import {Navbar, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/SeenemaLogo.png';
import '../css/Header.css';
import {Link} from "react-router-dom";
import '../../Auth/JavaScript/SignIn';
import SearchBar from './SearchBar';
import {AuthContext} from "../../Auth/JavaScript/AuthContext";

// NavigationBar component
const NavigationBar = ({onChange}) => {
    const { user } = useContext(AuthContext);
    return (
        <div className="bg-navbar">
            <Navbar expand="lg">
                <Navbar.Brand href="#home">
                    <img
                        src={logo}
                        width="65"
                        height="65"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBar onChange={onChange}/>

                    <NavDropdown title={
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor  "
                             className="bi bi-person-circle profile-logo" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    } id="nav-dropdown" align="end">
                        {/* If User is logged in, show dropdown for logged-in user else show dropdown for not logged in user*/}
                        {user ? (
                            <div>
                                <LoggedInOptions />
                            </div>
                        ) : (
                            <NotLoggedOptions />
                            )}
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

// Drop down options to show when user is not logged in
const NotLoggedOptions = () => {
    return (
        <div>
            <NavDropdown.Item>
                <Link to="/signIn" style={{textDecoration: 'none', color: 'inherit'}}>Sign In</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
                <Link to="/signUp" style={{textDecoration: 'none', color: 'inherit'}}>Sign Up</Link>
            </NavDropdown.Item>
        </div>
    );
};

// Drop down options to show when user is logged in
const LoggedInOptions = () => {
    return (
        <div>
            <NavDropdown.Item>
                <Link to="/profile" style={{textDecoration: 'none', color: 'inherit'}}>Profile</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>My List</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item>
                <Link to="/signOut" style={{textDecoration: 'none', color: 'inherit'}}>Sign Out</Link>
            </NavDropdown.Item>
        </div>
    );
};
export default NavigationBar;
