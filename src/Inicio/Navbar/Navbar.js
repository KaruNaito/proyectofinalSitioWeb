import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Biblio/firebaseConfig/firebase';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';

const NavbarComponent = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSignOut = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      signOut(auth).then(() => {
        navigate('/');
      }).catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
    }
  };

  return (
    <Navbar  expand="lg" className='navbar-custom'>
      <Container>
        <Navbar.Brand as={Link} to="/">Inicio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Biblioteca">Biblioteca</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <Nav.Link as="button" className="btn btn-link" onClick={handleSignOut}>Cerrar Sesión</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/signin">Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to="/signup">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;