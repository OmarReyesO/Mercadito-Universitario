import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

const PantallaUsuario = ({ history }) => {
	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { infoUsuario } = usuarioLogin;

	useEffect(() => {
		if (!infoUsuario) history.push('/');
	}, [infoUsuario]);

	return (
		<Container>
			<Row className='justify-content-md-center mt-5'>
				<Col xs={12} md={6}>
					<h2>Datos Usuario</h2>
					{infoUsuario && (
						<Row>
							<Col>
								<h5>
									<strong>Name:</strong>
									{infoUsuario.name}
								</h5>
								<h5>
									<strong>Last name:</strong>
									{infoUsuario.lastName}
								</h5>
								<h5>
									<strong>Country:</strong>
									{infoUsuario.country}
								</h5>
								<h5>
									<strong>Phone:</strong>
									{infoUsuario.phone}
								</h5>
								<h5>
									<strong>Email:</strong>
									{infoUsuario.email}
								</h5>
							</Col>
						</Row>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default PantallaUsuario;
