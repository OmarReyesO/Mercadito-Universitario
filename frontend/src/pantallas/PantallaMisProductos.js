import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { Row, Col, Container, Card, Button, Modal} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {obtenerMisProductos} from '../acciones/accionesProductos'

import Loader from '../componentes/Loader';
import Mensaje from '../componentes/Mensaje';

const PantallaProductos = ({history}) => {
    const dispatch = useDispatch();

    const usuarioLogin = useSelector((state) => state.usuarioLogin);
    const { infoUsuario } = usuarioLogin;

    const listaMisProductos = useSelector((state) => state.listaMisProductos);
    const {loading, productos, error} = listaMisProductos;

    const [show, setShow] = useState(false);
    const [productoActivo, setProductoActivo] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if(!infoUsuario) history.push('/login');
        dispatch(obtenerMisProductos(infoUsuario._id));
    }, [dispatch, infoUsuario])

    const cardHandler = (p) =>{
        setProductoActivo(p);
        handleShow();
    }

    return (
        <Container className="pt-5" style={{height: '1000px'}}>
            {error && <Mensaje variant="danger">Error</Mensaje>}
            {loading ? (<Loader />) : (
               <>
                    <Row>
                        <Col>
                        <h1>Mis productos</h1>
                        <LinkContainer to='/mis-productos/nuevo' className="float-right">
                            <Button variant="outline-primary"><i className="mr-3 fas fa-plus"></i>Añadir nuevo producto</Button>
                        </LinkContainer>
                        </Col>
                    </Row>
                    {productos && (
                        <>
                            <Row>
                                {productos.map((p, index) => (
                                    <Col key={index} sm={12} md={3} className="my-3">
                                        <Card onClick={() => cardHandler(p)} className="product-card" style={{ height:'9rem' }}>
                                            <Row>
                                            
                                                <Col sm={12} md={8}>
                                                    
                                                        <Card.Body style={{height: '162px'}}>
                                                            <h6>{p.nombre}</h6>
                                                            <p style={{fontFamily:'Roboto', fontSize:'14px', height:'40px'}} className="mb-2 text-muted">{p.descripcion}</p>
                                                            <h6 className="mt-4">${p.precio}MXN</h6>
                                                        </Card.Body>
                                                </Col>
                                                <Col sm={0} md={4}>
                                                    <Card.Img fluid src="https://www.smallwoods.org.uk/assets/Uploads/Documents/ac72cd8e0a/product-default-img__FitMaxWzEwMDAsODAwXQ.jpg" />
                                                </Col>
                                            </Row>
                                        </Card>   
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )} 
               </>
            )}  
            <Modal show={show} onHide={handleClose} className="mt-5">
                <Modal.Header closeButton>
                    <Modal.Title>{productoActivo.nombre}</Modal.Title>
                </Modal.Header>

                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>

                    <Button variant="primary" onClick={handleClose}>
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default PantallaProductos;
