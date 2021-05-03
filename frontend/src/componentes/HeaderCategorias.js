import React from 'react';
import logo from '../utils/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../acciones/accionesUsuario';


const HeaderCategorias = () => {
	const dispatch = useDispatch();

	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { infoUsuario } = usuarioLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<Navbar collapseOnSelect expand="lg" bg="light">
			<Container>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto px-5">
						<LinkContainer to='/comida' className="mx-5"><Nav.Link>Comida</Nav.Link></LinkContainer>
						<LinkContainer to='/ropa-y-accesorios' className="mx-5"><Nav.Link>Ropa y accesorios</Nav.Link></LinkContainer>
						<LinkContainer to='/salud-y-belleza' className="mx-5"><Nav.Link>Salud y belleza</Nav.Link></LinkContainer>
						<LinkContainer to='/electronica' className="mx-5"><Nav.Link>Electrónica</Nav.Link></LinkContainer>
						<LinkContainer to='/otros' className="mx-5"><Nav.Link>Otros</Nav.Link></LinkContainer>
				</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default HeaderCategorias;
