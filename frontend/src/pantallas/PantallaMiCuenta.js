import React, {useEffect} from 'react';
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Container, Card, Button, Nav} from 'react-bootstrap';

const PantallaMiCuenta = ({history}) => {

    const usuarioLogin = useSelector((state) => state.usuarioLogin);
    const  { infoUsuario } = usuarioLogin;

    useEffect(() => {
        if(!infoUsuario) history.push('/login');
    }, [infoUsuario])

    return (
        <div className="pt-5 mx-5" style={{height:'1000px'}}>
                {infoUsuario &&(
                    <>
                        <Container className="py-4">
                            <h1>Mi cuenta</h1>
                            <h4>{infoUsuario.nombre} {infoUsuario.apellido}</h4>
                            <p style={{fontFamily:'Roboto'}}>{infoUsuario.correo}</p>
                            <Row>
                                <Col md={4}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title>Editar cuenta</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Edita la información general de tu cuenta</Card.Subtitle>
                                            <Button className="float-right" variant="outline-primary">Ir</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={4}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title>Productos comprados</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Ve todos los pedidos de los productos que has comprado</Card.Subtitle>
                                            <LinkContainer to='/mis-pedidos' className="float-right">
                                                    <Button variant="outline-primary">Ir</Button>
                                                </LinkContainer>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            {infoUsuario.vendedor && (
                                <Row className="my-5">
                                    <Col md={4}>
                                        <Card style={{ width: '18rem', height: '10rem'}}>
                                            <Card.Body>
                                                <Card.Title>Mis productos</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Agrega y edita los productos que vendes</Card.Subtitle>
                                                <LinkContainer to='/mis-productos' className="float-right">
                                                    <Button variant="outline-primary">Ir</Button>
                                                </LinkContainer>
                                                
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4}>
                                        <Card style={{ width: '18rem', height: '10rem' }}>
                                            <Card.Body>
                                                <Card.Title>Órdenes</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Ve todas las órdenes de tus productos</Card.Subtitle>
                                                <LinkContainer to='/mis-ordenes' className="float-right">
                                                    <Button variant="outline-primary">Ir</Button>
                                                </LinkContainer>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            )}
                        </Container>
                    </>
                )}
        </div>
    );
}

export default PantallaMiCuenta;
