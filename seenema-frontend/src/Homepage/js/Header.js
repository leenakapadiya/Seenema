import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/Header.css';
import '../images/search.png';
import logo from '../images/seenemaLogo.png';
function NavScrollExample() {


    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container fluid >
                <Navbar.Brand href="#" style={{color: '#959499'}} className="custom-logo">
                    <img
                        src={logo}
                        width="65"
                        height="65"
                        className="d-inline-block align-top"
                        alt="Logo"

                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">

                    <div className="search-bar">

                        <Form className="d-flex">

                            <Form.Control

                                type="search"

                                placeholder="Search for movies.."
                                className="me-2 search-input"
                                aria-label="Search"
                                style={{backgroundColor: '#313036', color: 'white', border: "none"}}
                            />


                        </Form>
                    </div>
                    <NavDropdown title={
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor  "
                             className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    } id="nav-dropdown" align="end">
                        <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">My List</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action/3.3">Log Out</NavDropdown.Item>
                    </NavDropdown>


                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;