import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { login } from '../acciones/accionesUsuario';
import Mensaje from '../componentes/Mensaje';
import Loader from '../componentes/Loader';

const PantallaLogin = ({ history }) => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { infoUsuario, loading, error } = usuarioLogin;

	useEffect(() => {
		if (infoUsuario) {
			history.push('/user');
		}
	}, [infoUsuario]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<Container>
			{error && <Mensaje variant='danger'>Se ha producido un error.</Mensaje>}
			{loading ? (
				<Loader />
			) : (
				<Row className='justify-content-md-center mt-5'>
					<Col xs={12} md={6}>
						<h2>Log In</h2>
						<Form onSubmit={submitHandler}>
							<Form.Group>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Form.Group>

							<Button variant='primary' type='submit'>
								Log In
							</Button>
						</Form>
					</Col>
				</Row>
			)}
		</Container>
	);
};

export default PantallaLogin;
