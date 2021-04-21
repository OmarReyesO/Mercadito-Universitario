import React from 'react';
import logo from '../utils/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
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
			<Navbar bg='primary' variant='dark'>
				<Container>
					<LinkContainer to='/'>
						<img src={logo} height="50"/>
					</LinkContainer>
				</Container>
				<>
					<Nav className='mr-auto'>
						{!infoUsuario && (
							<>
								<LinkContainer to='/login'>
									<Nav.Link href='#home'>Iniciar Sesión</Nav.Link>
								</LinkContainer>
								<LinkContainer to='/register'>
									<Nav.Link href='#features'>Registrar</Nav.Link>
								</LinkContainer>
							</>
						)}
						
						{infoUsuario && (
							<Button onClick={logoutHandler} variant='primary'>
								Cerrar Sesión
							</Button>
						)}
					</Nav>
				</>
			</Navbar>
	);
};

export default Header;
