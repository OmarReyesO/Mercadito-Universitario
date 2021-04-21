import React from 'react';
import logo from '../utils/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
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
			<Navbar bg='light' style={{height:"45px"}}>
				<Container style={{color: "#FFFFFF"}}>
					<LinkContainer to='/alimentos'>
						<Nav.Link>Alimentos</Nav.Link>
					</LinkContainer>
					<LinkContainer to='/ropa-y-accesorios'>
						<Nav.Link>Ropa y accesorios</Nav.Link>
					</LinkContainer>
					<LinkContainer to='/salud-y-belleza'>
						<Nav.Link>Salud y belleza</Nav.Link>
					</LinkContainer>
					<LinkContainer to='/electronica'>
						<Nav.Link>Electrónica</Nav.Link>
					</LinkContainer>
					<LinkContainer to='/mas'>
						<Nav.Link>Más</Nav.Link>
					</LinkContainer>
				</Container>
			</Navbar>
	);
};

export default HeaderCategorias;
