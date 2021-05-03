import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { login } from '../acciones/accionesUsuario';
import Mensaje from '../componentes/Mensaje';
import Loader from '../componentes/Loader';

const PantallaLogin = ({ history }) => {
	const dispatch = useDispatch();

	const [correo, setCorreo] = useState('');
	const [contrasena, setContrasena] = useState('');

	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { infoUsuario, loading, error } = usuarioLogin;

	useEffect(() => {
		if (infoUsuario) {
			history.push('/');
		}
	}, [infoUsuario]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(correo, contrasena));
	};

	return (
		<Container style={{height:'1000px'}}>
			{error && <Mensaje variant='danger'>Se ha producido un error.</Mensaje>}
			{loading ? (
				<Loader />
			) : (
				<Row className='justify-content-md-center py-5'>
					<Col xs={12} md={6}>
						<h2>Log In</h2>
						<Form onSubmit={submitHandler}>
							<Form.Group>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type='email'
									placeholder='Ingresa tu correo'
									value={correo}
									onChange={(e) => setCorreo(e.target.value)}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Ingresa tu contraseña'
									value={contrasena}
									onChange={(e) => setContrasena(e.target.value)}
								/>
							</Form.Group>

							<Button variant='primary' type='submit'>
								Iniciar sesión
							</Button>
						</Form>
					</Col>
				</Row>
			)}
		</Container>
	);
};

export default PantallaLogin;
