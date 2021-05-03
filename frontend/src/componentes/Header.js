import React from 'react';
import logo from '../utils/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
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
			/*<Navbar collapseOnSelect expand="lg" bg='primary' variant='dark'>
				<Container>
					<LinkContainer to='/'>
						<img src={logo} height="50"/>
					</LinkContainer>
				</Container>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
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
					</Navbar.Collapse>
			</Navbar>*/
			
			<Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
				<Container>
					<LinkContainer to='/'>
						<img src={logo} height="50"/>
					</LinkContainer>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">

						<Nav className="mr-auto">
							
						</Nav>
						
						<Nav>
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
								<>
								<NavDropdown title="Mi cuenta" id="collasible-nav-dropdown">
									
									<NavDropdown.Item>
										<LinkContainer to='/mi-cuenta' style={{color:"#000000"}}>
											<Nav.Link>Mi cuenta</Nav.Link>
										</LinkContainer>
									</NavDropdown.Item>
									
									<NavDropdown.Item>
										<LinkContainer to='/mis-pedidos' style={{color:"#000000"}}>
											<Nav.Link>Mis pedidos</Nav.Link>
										</LinkContainer>
									</NavDropdown.Item>

									<NavDropdown.Item>
										<LinkContainer to='/mis-productos' style={{color:"#000000"}}>
											<Nav.Link>Mis productos</Nav.Link>
										</LinkContainer>
									</NavDropdown.Item>

									<NavDropdown.Divider />
									<NavDropdown.Item>
										<Button onClick={logoutHandler} variant='primary'>
										Cerrar Sesión
										</Button>
									</NavDropdown.Item>
								</NavDropdown>	
								<LinkContainer to='/carrito'>
									<Nav.Link><i className="mr-2 fas fa-shopping-cart"></i> Carrito  (0)</Nav.Link>
								</LinkContainer>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
	);
};

export default Header;
