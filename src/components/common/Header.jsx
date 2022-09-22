import React from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';

const Header = (props) => {
    return (
        <Navbar bg="danger" variant="dark" expand="lg">
            <Container>
            <Navbar.Brand as={Link} to="/">Recetas</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink className="nav-item nav-link" end to="/">Inicio</NavLink>
                    {props.adminLogged?<NavLink className="nav-item nav-link" end to="/receta/administrar">Administrar</NavLink>:null}
                    {props.adminLogged?<NavLink className="nav-item nav-link" end to="/receta/crear">Crear</NavLink>:null}
                    {props.sesionIniciada?
                        <NavLink className="nav-item nav-link" end to="/logoff">Cerrar Sesion</NavLink>:
                        <NavLink className="nav-item nav-link" end to="/login">Iniciar Sesion</NavLink>
                    }
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;