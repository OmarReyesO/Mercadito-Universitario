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

	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [campus, setCampus] = useState('');
	const [noVendedor, setNoVendedor] = useState('');
	const [vendedor, setVendedor] = useState('');
	const [correo, setCorreo] = useState('');
	const [contrasena, setContrasena] = useState('');
	const [verificarContrasena, setVerificarContrasena] = useState('');
	const [errorContrasena, setErrorContrasena] = useState(false);

	const usuarioRegistrado = useSelector((state) => state.registrarUsuario);
	const { usuario, loading, error, exito } = usuarioRegistrado;

	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { infoUsuario } = usuarioLogin;

	useEffect(() => {
		if (exito && !loading) {
			dispatch(login(correo, contrasena));
			dispatch(reinicioRegistroUsuario());
			history.push('/');
		}

		if (infoUsuario) history.push('/');
	}, [exito, loading, infoUsuario]);

	const submitHandler = (e) => {
		e.preventDefault();
		const usuario = {
			nombre,
			apellido,
			correo,
			contrasena,
			campus,
			vendedor
		};

		if(contrasena !== verificarContrasena){
			setErrorContrasena(true);
		}else{
			setErrorContrasena(false);
			dispatch(registrarUsuario(usuario));
		}
		
	};

	return (
		<Container>
			{loading ? (
				<Loader />
			) : (
				<Row className='justify-content-md-center py-5'>
					<Col xs={12} md={6}>
					{error && <Mensaje variant='danger'>Se ha producido un error.</Mensaje>}
					{errorContrasena && <Mensaje variant='danger'>Las contraseñas no coinciden.</Mensaje>}
						<h2>Registrarse</h2>
						<Form onSubmit={submitHandler}	>
							<Row>
								<Col>
									<Form.Group>
										<Form.Label>Nombre(s)</Form.Label>
										<Form.Control
											required
											type='text'
											placeholder='Eg. Juan Pablo'
											value={nombre}
											onChange={(e) => setNombre(e.target.value)}
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group>
										<Form.Label>Apellido(s)</Form.Label>
										<Form.Control
											required
											type='text'
											placeholder='Eg. López Sánchez'
											value={apellido}
											onChange={(e) => setApellido(e.target.value)}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
								<Form.Group controlId="exampleForm.ControlSelect1">
									<Form.Label>Campus</Form.Label>
										<Form.Control as="select" required onChange={(e) => setCampus(e.target.value)}>
											<option value="">Selecciona una opción...</option>
											<option value="CU">CU</option>
											<option value="IADA"disabled>IADA</option>
											<option value="ICB" disabled>ICB</option>
											<option value="ICSA" disabled>ICSA</option>
											<option value="IIT" disabled>IIT</option>
										</Form.Control>
								</Form.Group>
								</Col>
							</Row>

							<Form.Group>
								<Form.Label>Correo</Form.Label>
								<Form.Control
									required
									type='email'
									placeholder='eg. al123456@alumnos.uacj.mx'
									value={correo}
									onChange={(e) => setCorreo(e.target.value)}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Contraseña</Form.Label>
								<Form.Control
									required
									type='password'
									placeholder='Contraseña'
									value={contrasena}
									onChange={(e) => setContrasena(e.target.value)}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Verificar contraseña</Form.Label>
								<Form.Control
									required
									type='password'
									placeholder='Contraseña'
									value={verificarContrasena}
									onChange={(e) => setVerificarContrasena(e.target.value)}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Check disabled={vendedor} required type="checkbox" label="Solo quiero comprar" checked={noVendedor} onChange={(e) => setNoVendedor(e.target.checked)}/>
							</Form.Group>
							<Form.Group>
								<Form.Check disabled={noVendedor} type="checkbox" label="Quiero comprar y vender" checked={vendedor} onChange={(e) => setVendedor(e.target.checked)}/>
							</Form.Group>

							<Button variant='primary' type='submit'>
								Registrarse!
							</Button>
						</Form>
					</Col>
				</Row>
			)}
		</Container>
	);
};

export default PantallaRegistro;
