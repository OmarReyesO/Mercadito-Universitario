import React, {useEffect} from 'react';
import { useSelector } from 'react-redux'
import { Row, Col, Container, Card, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const PantallaProductos = ({history}) => {

    const usuarioLogin = useSelector((state) => state.usuarioLogin);
    const  { infoUsuario } = usuarioLogin;

    useEffect(() => {
        if(!infoUsuario) history.push('/login');
    }, [infoUsuario])

    return (
        <Container className="pt-5" style={{height: '1000px'}}>
            {infoUsuario && (
               <>
                    <Row>
                        <h1>Mis productos</h1>
                    </Row>
                    <Row>
                        <LinkContainer to='/mis-productos/nuevo' className="float-right">
                            <Button variant="outline-primary"><i className="mr-3 fas fa-plus"></i>Añadir nuevo producto</Button>
                        </LinkContainer>
                    </Row>
                    
               </>
            )}  
        </Container>
    );
}

export default PantallaProductos;
