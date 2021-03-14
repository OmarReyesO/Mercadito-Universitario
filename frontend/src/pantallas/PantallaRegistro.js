import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {
	registrarUsuario,
	login,
	reinicioRegistroUsuario,
} from '../acciones/accionesUsuario';
import Mensaje from '../componentes/Mensaje';
import Loader from '../componentes/Loader';

const PantallaRegistro = ({ history }) => {
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [country, setCountry] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const usuarioRegistrado = useSelector((state) => state.registrarUsuario);
	const { usuario, loading, error, exito } = usuarioRegistrado;

	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { infoUsuario } = usuarioLogin;

	useEffect(() => {
		if (exito && !loading) {
			console.log(usuario);
			dispatch(login(email, password));
			dispatch(reinicioRegistroUsuario());
			history.push('/user');
		}

		if (infoUsuario) history.push('/user');
	}, [exito, loading, infoUsuario]);

	const submitHandler = (e) => {
		e.preventDefault();
		const usuario = {
			name,
			lastName,
			country,
			phone,
			email,
			password,
		};
		dispatch(registrarUsuario(usuario));
	};

	return (
		<Container>
			{error && <Mensaje variant='danger'>Se ha producido un error.</Mensaje>}
			{loading ? (
				<Loader />
			) : (
				<Row className='justify-content-md-center mt-5'>
					<Col xs={12} md={6}>
						<h2>Register</h2>
						<Form onSubmit={submitHandler}>
							<Row>
								<Col>
									<Form.Group>
										<Form.Label>Name</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter name'
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group>
										<Form.Label>Last Name</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter last name'
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Group>
										<Form.Label>Country</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter country'
											value={country}
											onChange={(e) => setCountry(e.target.value)}
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group>
										<Form.Label>Phone</Form.Label>
										<Form.Control
											type='text'
											placeholder='Phone'
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
										/>
									</Form.Group>
								</Col>
							</Row>
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
								Register
							</Button>
						</Form>
					</Col>
				</Row>
			)}
		</Container>
	);
};

export default PantallaRegistro;
