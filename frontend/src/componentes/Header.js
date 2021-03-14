import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../acciones/accionesUsuario';

const Header = () => {
	const dispatch = useDispatch();

	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { infoUsuario } = usuarioLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<>
			<Navbar bg='primary' variant='dark'>
				<LinkContainer to='/'>
					<Navbar.Brand>Mercadito Universitario</Navbar.Brand>
				</LinkContainer>

				<Nav className='mr-auto'>
					<LinkContainer to='/'>
						<Nav.Link href='#home'>Iniciar Sesión</Nav.Link>
					</LinkContainer>
					<LinkContainer to='/register'>
						<Nav.Link href='#features'>Registrar</Nav.Link>
					</LinkContainer>
					{infoUsuario && (
						<Button onClick={logoutHandler} variant='primary'>
							Cerrar Sesión
						</Button>
					)}
				</Nav>
			</Navbar>
		</>
	);
};

export default Header;
