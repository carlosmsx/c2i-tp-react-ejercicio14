import React from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';

const Header = () => {
    return (
        <Navbar bg="danger" variant="dark" expand="lg">
            <Container>
            <Navbar.Brand as={Link} to="/">Recetas</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink className="nav-item nav-link" end to="/">Inicio</NavLink>
                    <NavLink className="nav-item nav-link" end to="/receta/administrar">Administrar</NavLink>
                    <NavLink className="nav-item nav-link" end to="/receta/crear">Crear</NavLink>
                    <NavLink className="nav-item nav-link" end to="/login">Iniciar Sesion</NavLink>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;