import React, { useEffect }  from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt,faSignOutAlt, faShoppingCart,faUser} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../Context/useAuth'

  
const NavbarComponent: React.FC = () => {
  const { user, logout ,isLoggedIn} = useAuth(); 

  useEffect(() => {
    console.log("Current User State:", user);
  }, [user]); 
  
  return (
    <Navbar bg="light" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Timeless Library Logo" className="img-fluid" style={{maxWidth: '100px'}} />
          Timeless Library
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/book">Books</Nav.Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/category/voluptaten">voluptaten</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/evenist">evenist</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/porro">porro</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/vel">vel</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/ethh">ethh</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/police">Police</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
          <Nav>
            {isLoggedIn() ? (
              <>
                <Nav.Link as={Link} to="/logout" className="btn btn-outline-danger" onClick={logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                  Logout
                </Nav.Link>
                <span className="navbar-text">
                  <FontAwesomeIcon icon={faUser} className="me-1" />
                  Welcome, {user?.userName}
                </span>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="btn btn-outline-success">
                <FontAwesomeIcon icon={faSignInAlt} className="me-1" /> Login
              </Nav.Link>
            )}
            <Nav.Link href="#" className="btn btn-outline-success ms-2">
              <FontAwesomeIcon icon={faShoppingCart} className="me-1" />Cart (0)
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;