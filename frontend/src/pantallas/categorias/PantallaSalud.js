import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Container, Nav, Card} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

import {obtenerListaProductos} from '../../acciones/accionesProductos';


const PantallaComida = () => {
    const dispatch = useDispatch();

    const listaProductos = useSelector((state) => state.listaProductos)
    const {loading, productos, error} = listaProductos;

    useEffect(() => {
        dispatch(obtenerListaProductos("salud"));
    }, [dispatch])

    return (
        <div className="pt-5 mx-5" style={{height:'1000px'}}>
                <Row>
                    <LinkContainer to='/'>
                        <Nav.Link>Inicio / Salud y belleza</Nav.Link>
                    </LinkContainer>
                </Row>
                {loading === false && productos &&(
                    <>
                        <h1>Salud y belleza</h1>
                        <Row>
                        {productos.map((p, index) => (
                            <Col key={index} sm={12} md={3} className="my-3">
                                <Card className="product-card"  style={{ height:'9rem' }}>
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
        </div>
    );
}

export default PantallaComida;
