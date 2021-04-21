import React from 'react';
import Jumbo from '../componentes/Jumbo';
import {Container, Row, Col} from 'react-bootstrap';

const PantallaInicio = () => {
    return (
        <Container className="pt-5">
                <Row>
                    <Col className="ci m-3 p-5"><h4>Los más vendidos</h4></Col>
                    <Col className="ci m-3 p-5"><h4>Nuevos productos</h4></Col>
                </Row> 
                <Row>
                    <Col className="ci m-3 p-5"><h4>Más productos</h4></Col>
                </Row> 
        </Container>
    );
}

export default PantallaInicio;
